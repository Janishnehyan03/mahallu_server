// Import required modules
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const mahalluRoute = require("./routes/mahalluRoute");
const entryRoute = require("./routes/entryRoute");
const districtRoute = require("./routes/districtRoute");
const errorHandler = require("./utils/errorHandler");
const { typeDefs } = require("./graphql/typedefs");
const dotenv = require("dotenv");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { resolvers } = require("./graphql/resolvers");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Connect to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Your routes and application logic would go here
app.use("/api/user", userRoute);
app.use("/api/mahallu", mahalluRoute);
app.use("/api/district", districtRoute);
app.use("/api/entry", entryRoute);
app.use((req, res) => {
  res.status(404).json({
    error: `cannot find ${req.originalUrl} [${req.method}] on the server`,
  });
});
app.use((error, req, res, next) => {
  errorHandler(error, res);
});

async function startServer() {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

startServer().catch((error) => {
  console.error("Error starting server:", error);
});

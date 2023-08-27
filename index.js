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
const { ApolloServer } = require("apollo-server-express");
const { resolvers } = require("./graphql/resolvers");
dotenv.config();


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

const startServer = async () => {
  const app = express();

  app.use(bodyParser.json());
  app.use(cors());
  app.use(morgan("dev"));
  app.use(cookieParser());
  // Your existing routes
  app.use("/api/user", userRoute);
  app.use("/api/mahallu", mahalluRoute);
  app.use("/api/district", districtRoute);
  app.use("/api/entry", entryRoute);


  
  // Create an Apollo Server instance
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  // Start the Apollo Server
  await server.start();

  // Apply the Apollo Server middleware to the Express app
  server.applyMiddleware({ app });

  // 404 and error handlers
  app.use((req, res) => {
    res.status(404).json({
      error: `Cannot find ${req.originalUrl} [${req.method}] on the server`,
    });
  });
  app.use((error, req, res, next) => {
    errorHandler(error, res);
  });

  const port = 3000;
  app.listen(port, () => {
    console.log(`🚀  Server ready at http://localhost:${port}`);
  });
};

startServer().catch((error) => {
  console.error("Error starting server:", error);
});

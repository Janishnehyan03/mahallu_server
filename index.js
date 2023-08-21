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
const { graphqlHTTP } = require("express-graphql");
const schema = require("./graphql-schema/schema");
const dotenv=require('dotenv')

dotenv.config()
// Create an Express app
const app = express();


// Middleware setup
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Connect to MongoDB using Mongoose
mongoose
  .connect("mongodb://127.0.0.1/mahallu_app", {
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
app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    graphiql: true,
  })
);
app.use((req, res) => {
  res.status(404).json({
    error: `cannot find ${req.originalUrl} [${req.method}] on the server`,
  });
});
app.use((error, req, res, next) => {
  errorHandler(error, res);
});
// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

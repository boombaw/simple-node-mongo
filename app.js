const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const { MONGODB } = require("./database/conn");

app.use(bodyParser.json());
app.use(cors())
// import routes
const routes = require("./route")
app.use("/api", routes);

const port = process.env.PORT

mongoose
  .connect(MONGODB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected successfully");
    return app.listen(port);
  })
  .then(() => console.log("server listening on port " + port))
  .catch((err) => console.log(err.message));

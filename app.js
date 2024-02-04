const express = require("express");
require("dotenv").config(); 
const cors = require('cors');
const PORT = process.env.PORT || 3300;
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const coordinateRouter = require("./routes/coordinateRouter");

app.use(express.json());
app.use(express.static(
  path.join(__dirname,"../client/build")));
app.use(cors());

app.use((req, res, next) => {
    console.log(`${req.method} request to ${req.path}`)
    next();
});

/** database connectiobn starts */
mongoose
  .connect(process.env.DB_URL)
  .then((connection) => {
    console.log("DB connected ");
  })
  .catch((err) => {
    console.log(err);
  });

/** database connection ends */

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.use("/api/coordinate", coordinateRouter);
app.get("*", (req, res, next) => {
  res.sendFile(
    path.join(__dirname, "../client/build/index.html")
  );
  next();
});

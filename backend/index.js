const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route.js");
const jobRouter = require("./routes/job.route.js");
const passport = require("passport");
const roundRouter = require("./routes/round.route.js");

dotenv.config();
const app = express();

app.use(express.json());
require("./config/passport.js");
app.use(passport.initialize());

app.use("/api/v1", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/:jobId/rounds", roundRouter);

async function startServer() {
  mongoose
    .connect(process.env.MONGOOSE_URL)
    .then(() => {
      console.log("DB connected successfully");
      app.listen(process.env.PORT, function () {
        console.log("Server is listening on Port " + process.env.PORT);
      });
    })
    .catch((err) => {
      console.log("DB connection failed");
    });
}

startServer();

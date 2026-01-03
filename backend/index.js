const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route.js");
const jobRouter = require("./routes/job.route.js");
const passport = require("passport");
const roundRouter = require("./routes/round.route.js");
const analyticsRouter = require("./routes/userAnalytics.route.js");
const { generateAiContext } = require("./services/ai.service.js");

const app = express();

app.use(express.json());
require("./config/passport.js");
app.use(passport.initialize());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/jobs", jobRouter);
app.use("/api/v1/:jobId/rounds", roundRouter);
app.use("/api/v1/analytics", analyticsRouter);

function startServer() {
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

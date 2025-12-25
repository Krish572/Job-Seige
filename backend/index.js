const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require("./routes/user.route.js");
const passport = require("passport");

dotenv.config();
const app = express();

app.use(express.json());
require("./config/passport.js")
app.use(passport.initialize());

app.use("/api/v1", userRouter);

async function startServer(){
    mongoose.connect(process.env.MONGOOSE_URL)
    .then(() => {
        console.log("DB connected successfully");
        app.listen(process.env.PORT, function(){
            console.log("Server is listening on Port " + process.env.PORT);
        })
    })
    .catch((err) => {
        console.log("DB connection failed");
    }) 
}



startServer();

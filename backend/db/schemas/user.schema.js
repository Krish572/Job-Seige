const mongoose = require("mongoose");
const UserAnalytics = require("../models/userAnalytics.model.js");

const AdditionalInfoSchema = new mongoose.Schema({
  profileUrl: String,
  name: String,
  salaryMin: Number,
  salaryMax: Number,
  salaryCurrency: String,
  skills: [String],
});

const UserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    password: {
      type: String,
    },
    authProviders: {
      googleId: {
        type: String,
        unique: true,
        sparse: true,
      },
    },
    additionalInfo: AdditionalInfoSchema,
  },
  {
    timestamps: true,
  }
);

UserSchema.post("save", async function(user, next){
  try{
    await UserAnalytics.findOneAndUpdate(
      {user_id : user._id},
      {$setOnInsert: {user_id: user._id}},
      {upsert: true}
    )
    next();
  }catch(err){
    next(err);
  }
})

module.exports = UserSchema;

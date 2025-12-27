const mongoose = require("mongoose");

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

module.exports = UserSchema;

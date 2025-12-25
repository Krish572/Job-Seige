const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../db/models/user.model");
const signupValidationSchema = require("../validations/signup.validation.js");
const passport = require("passport");

const router = express.Router();

router.post("/signup", async function (req, res) {
  const { email, password } = req.body;
  const parsedData = await signupValidationSchema.safeParse(req.body);
  if (!parsedData.success) {
    const error = parsedData.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(422).json(error);
  }
  const passwordHash = await bcrypt.hash(password, 5);
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(404)
        .json({ message: "Email already exists, you can login" });
    }
    const user = await User.create({
      email,
      password: passwordHash,
    });
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Issue while signin up" });
  }
});

router.post("/signin", async function (req, res) {
  const { email, password } = req.body;
  const parsedData = await signupValidationSchema.safeParse(req.body);
  if (!parsedData.success) {
    const error = parsedData.error.issues.map((err) => ({
      field: err.path.join("."),
      message: err.message,
    }));
    return res.status(422).json(error);
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      return res.status(404).json({ message: "Invalid Email or Password" });
    }
    const token = await jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: "Error while signing up" });
  }
});

//Just for testing Google Auth from backend
router.get("/testing-google-auth", (req, res) => {
  res.send('<a href="http://localhost:3000/api/v1/auth/google">login with google</a>');
})

router.get("/auth/google", 
  passport.authenticate("google", {scope : ["profile", "email"], prompt: "consent"},)
);

router.get("/google/callback",
  passport.authenticate("google", { session: false }),
  async (req, res) => {
    const token = await jwt.sign({userId : req.user._id}, process.env.JWT_SECRET);
    return res.status(200).json({token, user: req.user});
  }
)

router.get("/home", (req, res) => {
  res.send("Welcome home!");
})

module.exports = router;

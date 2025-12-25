const express = require("express");

const router = express.Router();

router.get("/signup", function (req, res){
    res.send('<h1>Signup Route</h1>');
})

module.exports = router;
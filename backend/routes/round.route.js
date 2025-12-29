const express = require("express");
const { createRound, getRound, getRounds, deleteRound, updateRound } = require("../controllers/round.controller.js");

const router = express.Router({mergeParams: true});

router.post("/", createRound);
router.get("/", getRounds);
router.get("/:roundId", getRound);
router.delete("/:roundId", deleteRound);
router.put("/:roundId", updateRound);


module.exports = router;
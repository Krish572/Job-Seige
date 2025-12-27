const express = require("express");

const router = express.Router();

const { authMiddleware } = require("../middlewares/auth.middleware");

const {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus,
  updateJobNotes,
  getJobStats,
  getUpcomingInterviews,
} = require("../controllers/job.controller");

// console.log(createJob, getJobs);

// CREATE + GET ALL (filters inside controller)
router.post("/", createJob);
router.get("/", getJobs);

// DASHBOARD & SPECIAL NOTES
router.get("/stats", getJobStats);
router.get("/interviews/upcoming", getUpcomingInterviews);

// SINGLE JOB OPERATIONS
router.get("/:id", getJobById);
router.patch("/:id/status", updateJobStatus);
router.patch("/:id/notes", updateJobNotes);
router.patch("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;

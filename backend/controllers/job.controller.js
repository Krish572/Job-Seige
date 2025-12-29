const Job = require("../db/models/job.model");
const generateJobContextInBG = require("../services/generateJobContext.js");

// this is my user-id stored in my DB - hardcoded for testing in dev. - you can use your own
const DEV_USER_ID = "695277866917522075a7201b";

// create job
const createJob = async (req, res) => {
  try {
    const job = await Job.create({
      ...req.body,
      user_id: DEV_USER_ID,
      //   user_id: req.userId, // coming from middleware
    });
    generateJobContextInBG(job);
    return res.status(201).json(job);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to create job " + err + "",
    });
  }
};

// get all jobs
const getJobs = async (req, res) => {
  try {
    // const jobs = await Job.find({ user_id: DEV_USER_ID });
    // new mongoose.Types.ObjectId(DEV_USER_ID),

    const query = { user_id: DEV_USER_ID };

    //1. filter by status
    if (req.query.status) {
      query.current_status = req.query.status;
    }

    // 2. search by title or company
    if (req.query.search) {
      query.$or = [
        { title: { $regex: req.query.search, $options: "i" } },
        { company: { $regex: req.query.search, $options: "i" } },
      ];
    }

    // 3. pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // final db query
    const jobs = await Job.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    return res.status(200).json(jobs);
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch jobs",
    });
  }
};

// get job by id
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById({
      _id: req.params.id,
      //   user_id: DEV_USER_ID, // temp user
    });
    // console.log(job);

    if (!job) {
      res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({
      message: "Unable to fetch Job" + err + "",
    });
  }
};

const mongoose = require("mongoose");
// get jobS stats
const getJobStats = async (req, res) => {
  try {
    const stats = await Job.aggregate([
      {
        $match: {
          user_id: new mongoose.Types.ObjectId(DEV_USER_ID),
        },
      },
      {
        $group: {
          _id: "$current_status",
          count: { $sum: 1 },
        },
      },
    ]);

    // console.log("Aggregation result:", stats);

    const response = {
      total: 0,
    };

    stats.forEach((item) => {
      response[item._id] = item.count;
      response.total += item.count;
    });

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch stats",
      error: err.message,
    });
  }
};

// get jobs that are interview upcoming
const getUpcomingInterviews = async (req, res) => {
  const today = new Date();
  try {
    const jobs = await Job.find({
      user_id: DEV_USER_ID,
      interview_date: { $gte: today },
    }).sort({ interview_date: 1 });

    // console.log(jobs);

    if (!jobs) {
      res.status(400).json({ message: "no upcoming interviews" });
    }
    res.status(200).json(jobs);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to fetch upcoming interviews" + err + "" });
  }
};

// update the job
const updateJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndUpdate(
      {
        _id: req.params.id,
        user_id: DEV_USER_ID, // temp user
      },
      req.body,
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json(job);
  } catch (err) {
    res.status(500).json({
      message: "Unable to update Job" + err + "",
    });
  }
};

// update only job status
const updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const job = await Job.findByIdAndUpdate(
      { _id: req.params.id, user_id: DEV_USER_ID },
      { current_status: status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "failed to update status" });
  }
};

// update only notes
const updateJobNotes = async (req, res) => {
  try {
    const { notes } = req.body;
    if (!notes) {
      res.status(400).json({ message: "notes are required" });
    }

    const job = await Job.findByIdAndUpdate(
      { _id: req.params.id, user_id: DEV_USER_ID },
      { notes },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    return res.status(200).json(job);
  } catch (err) {
    res.status(500).json({ message: "failed to update status" });
  }
};

// delete job
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete({
      _id: req.params.id,
      user_id: DEV_USER_ID,
    });

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({ message: "Job deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete job" + err + "" });
  }
};

module.exports = {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  updateJobStatus,
  updateJobNotes,
  getJobStats,
  getUpcomingInterviews,
};

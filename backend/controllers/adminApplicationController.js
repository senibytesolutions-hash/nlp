import mongoose from "mongoose";
import Application from "../models/Application.js";

// @desc    List applications with search, status filter, and pagination
// @route   GET /api/admin/applications?search=&status=&page=&limit=
// @access  Private
export const getApplications = async (req, res, next) => {
  try {
    const { search = "", status = "all", feesStatus = "all", page = 1, limit = 10 } = req.query;

    const query = {};

    if (status !== "all") {
      query.status = status;
    }

    if (feesStatus !== "all") {
      query.feesStatus = feesStatus;
    }

    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      query.$or = [{ fullName: regex }, { email: regex }, { city: regex }, { barAssociation: regex }];
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.min(100, Math.max(1, parseInt(limit, 10) || 10));

    const [applications, total] = await Promise.all([
      Application.find(query)
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum),
      Application.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      data: applications,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages: Math.ceil(total / limitNum) || 1,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get dashboard counts
// @route   GET /api/admin/applications/stats
// @access  Private
export const getApplicationStats = async (req, res, next) => {
  try {
    const counts = await Application.aggregate([
      { $group: { _id: "$status", count: { $sum: 1 } } },
    ]);

    const stats = { total: 0, pending: 0, accepted: 0, rejected: 0 };
    counts.forEach(({ _id, count }) => {
      stats[_id] = count;
      stats.total += count;
    });

    res.status(200).json({ success: true, data: stats });
  } catch (error) {
    next(error);
  }
};

// @desc    Get a single application by id
// @route   GET /api/admin/applications/:id
// @access  Private
export const getApplicationById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid application id." });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an application's status (approve / reject / return to pending)
// @route   PATCH /api/admin/applications/:id/status
// @access  Private
export const updateApplicationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const allowed = ["pending", "accepted", "rejected"];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Status must be one of: ${allowed.join(", ")}.`,
      });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({
      success: true,
      message: `Application marked as ${status}.`,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Update an accepted application's membership fees status
// @route   PATCH /api/admin/applications/:id/fees-status
// @access  Private
export const updateApplicationFeesStatus = async (req, res, next) => {
  try {
    const { feesStatus } = req.body;
    const allowed = ["unpaid", "paid"];

    if (!allowed.includes(feesStatus)) {
      return res.status(400).json({
        success: false,
        message: `Fees status must be one of: ${allowed.join(", ")}.`,
      });
    }

    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    if (application.status !== "accepted") {
      return res.status(400).json({
        success: false,
        message: "Fees status can only be set for accepted applications.",
      });
    }

    application.feesStatus = feesStatus;
    await application.save();

    res.status(200).json({
      success: true,
      message: `Membership fees marked as ${feesStatus}.`,
      data: application,
    });
  } catch (error) {
    next(error);
  }
};
// @desc    Add an internal note to an application
// @route   POST /api/admin/applications/:id/notes
// @access  Private
export const addApplicationNote = async (req, res, next) => {
  try {
    const { text } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ success: false, message: "Note text is required." });
    }

    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { $push: { notes: { text: text.trim() } } },
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Note added.", data: application });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an application
// @route   DELETE /api/admin/applications/:id
// @access  Private
export const deleteApplication = async (req, res, next) => {
  try {
    const application = await Application.findByIdAndDelete(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: "Application not found." });
    }

    res.status(200).json({ success: true, message: "Application deleted." });
  } catch (error) {
    next(error);
  }
};

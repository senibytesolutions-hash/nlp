import Application from "../models/Application.js";

// @desc    Submit a new membership application
// @route   POST /api/applications
// @access  Public
export const createApplication = async (req, res, next) => {
  try {
    const application = await Application.create(req.body);

    res.status(201).json({
      success: true,
      message: "Your application has been received. We will be in touch soon.",
      data: {
        id: application._id,
        submittedAt: application.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

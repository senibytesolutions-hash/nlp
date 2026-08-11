import ContactMessage from "../models/ContactMessage.js";

// @desc    Submit a new contact message
// @route   POST /api/contact
// @access  Public
export const createContactMessage = async (req, res, next) => {
  try {
    const contactMessage = await ContactMessage.create(req.body);

    res.status(201).json({
      success: true,
      message: "Thank you for reaching out. We will respond shortly.",
      data: {
        id: contactMessage._id,
        submittedAt: contactMessage.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

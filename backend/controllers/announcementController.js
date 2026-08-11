import Announcement from "../models/Announcement.js";

// @desc    Get active announcements (public, used by the Home page)
// @route   GET /api/announcements/active
// @access  Public
export const getActiveAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find({ active: true }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all announcements (admin management view)
// @route   GET /api/admin/announcements
// @access  Private
export const getAllAnnouncements = async (req, res, next) => {
  try {
    const announcements = await Announcement.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: announcements });
  } catch (error) {
    next(error);
  }
};

// @desc    Create an announcement
// @route   POST /api/admin/announcements
// @access  Private
export const createAnnouncement = async (req, res, next) => {
  try {
    const { title, description, ctaText, ctaLink, active } = req.body;

    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required.",
      });
    }

    const announcement = await Announcement.create({
      title: title.trim(),
      description: description.trim(),
      ctaText: ctaText?.trim() || "",
      ctaLink: ctaLink?.trim() || "",
      active: active ?? true,
    });

    res.status(201).json({ success: true, message: "Announcement created.", data: announcement });
  } catch (error) {
    next(error);
  }
};

// @desc    Update an announcement
// @route   PUT /api/admin/announcements/:id
// @access  Private
export const updateAnnouncement = async (req, res, next) => {
  try {
    const { title, description, ctaText, ctaLink, active } = req.body;

    const announcement = await Announcement.findByIdAndUpdate(
      req.params.id,
      {
        ...(title !== undefined && { title: title.trim() }),
        ...(description !== undefined && { description: description.trim() }),
        ...(ctaText !== undefined && { ctaText: ctaText.trim() }),
        ...(ctaLink !== undefined && { ctaLink: ctaLink.trim() }),
        ...(active !== undefined && { active }),
      },
      { new: true, runValidators: true }
    );

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found." });
    }

    res.status(200).json({ success: true, message: "Announcement updated.", data: announcement });
  } catch (error) {
    next(error);
  }
};

// @desc    Toggle an announcement's active status
// @route   PATCH /api/admin/announcements/:id/toggle
// @access  Private
export const toggleAnnouncementActive = async (req, res, next) => {
  try {
    const announcement = await Announcement.findById(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found." });
    }

    announcement.active = !announcement.active;
    await announcement.save();

    res.status(200).json({
      success: true,
      message: `Announcement is now ${announcement.active ? "active" : "inactive"}.`,
      data: announcement,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete an announcement
// @route   DELETE /api/admin/announcements/:id
// @access  Private
export const deleteAnnouncement = async (req, res, next) => {
  try {
    const announcement = await Announcement.findByIdAndDelete(req.params.id);

    if (!announcement) {
      return res.status(404).json({ success: false, message: "Announcement not found." });
    }

    res.status(200).json({ success: true, message: "Announcement deleted." });
  } catch (error) {
    next(error);
  }
};

import { body } from "express-validator";

export const applicationValidationRules = [
  body("fullName").trim().notEmpty().withMessage("Full name is required").isLength({ max: 120 }),
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("phone").trim().notEmpty().withMessage("Phone number is required").isLength({ max: 30 }),
  body("age")
    .notEmpty()
    .withMessage("Age is required")
    .isInt({ min: 18, max: 100 })
    .withMessage("Age must be between 18 and 100"),
  body("city").trim().notEmpty().withMessage("City is required").isLength({ max: 100 }),
  body("barAssociation").trim().notEmpty().withMessage("Bar association is required"),
  body("professionalDetails").trim().notEmpty().withMessage("Professional details are required"),
  body("experience").trim().notEmpty().withMessage("Experience is required"),
  body("motivation").trim().notEmpty().withMessage("Motivation is required"),
  body("otherOrganization").optional().isBoolean().toBoolean(),
  body("organizationDetails").optional({ checkFalsy: true }).trim().isLength({ max: 1000 }),
  body("achievements").optional({ checkFalsy: true }).trim().isLength({ max: 2000 }),
  body("politicalGovernmentRelation").optional().isBoolean().toBoolean(),
];

export const contactValidationRules = [
  body("name").trim().notEmpty().withMessage("Name is required").isLength({ max: 120 }),
  body("email").trim().isEmail().withMessage("A valid email is required").normalizeEmail(),
  body("subject").trim().notEmpty().withMessage("Subject is required").isLength({ max: 200 }),
  body("message").trim().notEmpty().withMessage("Message is required").isLength({ max: 3000 }),
];

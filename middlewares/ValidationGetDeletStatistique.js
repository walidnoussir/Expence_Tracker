import { param, query, validationResult } from "express-validator";
import mongoose from "mongoose";

export const validationGetId = [
  param("id")
    .notEmpty()
    .withMessage("ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid MongoDB ID format"),
];

export const validateMonth = [
  query("month")
    .notEmpty()
    .withMessage("month is required")
    .isInt({ min: 1, max: 12 })
    .withMessage("month must be between 1 and 12"),

  query("year").notEmpty().withMessage("year is required"),
];

export const validationError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }
  next();
};

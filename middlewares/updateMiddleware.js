import { body, validationResult } from "express-validator";

export const validateTransactionBody = [
  body("title")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),

  body("category")
    .notEmpty()
    .withMessage("title is required")
    .isString()
    .withMessage("title must be a string"),

  body("type")
    .notEmpty()
    .withMessage("title is required")
    .isIn(["income", "expense"])
    .withMessage("type must be either 'income' or 'expense'"),
];

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next();
}

import { body, validationResult } from "express-validator";

export const transactionValidationRules = () => [
  body("title").notEmpty().withMessage("Le titre est obligatoire"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Le montant doit être supérieur à 0"),
  body("type")
    .isIn(["income", "expense"])
    .withMessage("Le type doit être income ou expense"),
  body("category").custom((value, { req }) => {
    if (req.body.type === "expense" && !value) {
      throw new Error("La catégorie est obligatoire pour une dépense");
    }
    return true;
  }),
  body("date").isISO8601().toDate().withMessage("Date invalide"),
];

export const validateTransaction = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
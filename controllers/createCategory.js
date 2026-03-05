import Category from "../models/Category.js";

export const createCategory = async (req, res) => {
  try {
    const category = new Category(req.body);
    const savedCategory = await category.save();

    res.status(201).json({ message: "category created", savedCategory });
  } catch (error) {
    console.log("Error on createCategory", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

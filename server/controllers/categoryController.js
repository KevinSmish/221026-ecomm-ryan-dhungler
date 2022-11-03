import { validationResult } from "express-validator";
import slugify from "slugify";
import ApiError from "../exceptions/apiError.js";
import Category from "../models/category.js";
import Product from "../models/product.js";

export const create = async (req, res, next) => {
  try {
    // 1. all fields required validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
    }

    // 2. destructure name from req.body
    const { name } = req.body;
    // 3. Create slug field
    const slug = slugify(name);

    // 4. Check if the category already exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return next(
        ApiError.BadRequest(
          `Категория '${name}' уже существует`,
          errors.array()
        )
      );
    }

    // 5. register new category
    const category = await new Category({
      name,
      slug,
    }).save();

    // 6. send response
    res.json({ category });
  } catch (err) {
    console.log(err);
    return next(ApiError.BadRequest(err.message));
  }
};

export const update = async (req, res, next) => {
  try {
    // 1. all fields required validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return next(ApiError.BadRequest("Ошибка при валидации", errors.array()));
    }

    // 2. destructure name from req.body
    const { name } = req.body;
    // 3. Create slug field
    const slug = slugify(name);
    // 4. Find category by Id and update
    const { categoryId } = req.params;
    const category = await Category.findByIdAndUpdate(
      categoryId,
      { name, slug },
      { new: true }
    );
    // 5. send response
    res.json(category);
  } catch (err) {
    console.log(err);
    return next(ApiError.BadRequest(err.message));
  }
};

export const read = async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await Category.findOne({ slug });
    res.json(category);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const all = await Category.find({});
    res.json(all);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const remove = async (req, res) => {
  try {
    const categoryId = req.params.categoryId;
    const removed = await Category.findByIdAndDelete(categoryId);
    res.json(removed);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const productsByCategory = async (req, res) => {
  try {
    const slug = req.params.slug;
    const category = await Category.findOne({ slug });
    const products = await Product.find({ category }).populate("category");

    res.json({
      category,
      products,
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

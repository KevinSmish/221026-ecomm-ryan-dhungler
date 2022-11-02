import { validationResult } from "express-validator";
import slugify from "slugify";
import ApiError from "../exceptions/apiError.js";
import Category from "../models/category.js";

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
    next(err);
  }
};

import dotenv from "dotenv";
import fs from "fs";
import slugify from "slugify";
// import { validationResult } from "express-validator";

import Product from "../models/product.js";
import Order from "../models/order.js";

dotenv.config();
const setError = (res, error) => res.json({ error });

export const create = async (req, res) => {
  try {
    // console.log("req.body:", req.body);
    // console.log("req.fields:", req.fields);
    // console.log("req.files:", req.files);

    // 1. all fields required validation
    if (!req.fields.name?.trim()) return setError(res, "Name is required");

    if (!req.fields.description?.trim())
      return setError(res, "Description is required");

    if (!req.fields.price?.trim()) return setError(res, "Price is required");

    if (!req.fields.category?.trim())
      return setError(res, "Category is required");

    if (!req.fields.quantity?.trim())
      return setError(res, "Quantity is required");

    if (!req.fields.shipping?.trim())
      return setError(res, "Shipping is required");

    const { name } = req.fields;
    // create product
    const product = new Product({ ...req.fields, slug: slugify(name) });

    if (req.files.photo) {
      // return res.json({ error: "Photo is required" });
      const { photo } = req.files;

      if (photo.size > 1000000)
        return setError(res, "Image should be less than 1mb in size");

      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    const saved_product = await product.save();
    res.json(saved_product);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const list = async (req, res) => {
  try {
    const products = await Product.find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const read = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const photo = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).select("photo");
    if (product.photo.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.send(product.photo.data);
    }
  } catch (err) {
    console.log(err);
  }
};

export const remove = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByIdAndDelete(productId).select("-photo");
    res.json(product);
  } catch (err) {
    console.log(err);
  }
};

export const update = async (req, res) => {
  try {
    // 1. all fields required validation
    if (!req.fields.name?.trim()) return setError(res, "Name is required");

    if (!req.fields.description?.trim())
      return setError(res, "Description is required");

    if (!req.fields.price?.trim()) return setError(res, "Price is required");

    if (!req.fields.category?.trim())
      return setError(res, "Category is required");

    if (!req.fields.quantity?.trim())
      return setError(res, "Quantity is required");

    if (!req.fields.shipping?.trim())
      return setError(res, "Shipping is required");

    if (req.files.photo && req.files.photo.size > 1000000)
      return setError(res, "Image should be less than 1mb in size");

    // console.log(req.fields);
    // console.log(req.files);
    const { name } = req.fields;
    const { photo } = req.files;

    // update product
    const productId = req.params.productId;
    const product = await Product.findByIdAndUpdate(
      productId,
      { ...req.fields, slug: slugify(name) },
      { new: true }
    );

    if (photo) {
      product.photo.data = fs.readFileSync(photo.path);
      product.photo.contentType = photo.type;
    }

    const savedProduct = await product.save();
    return res.json(savedProduct);
  } catch (err) {
    console.log(err);
    return res.status(400).json(err.message);
  }
};

export const filteredProducts = async (req, res) => {
  try {
    const { categories, prices } = req.body;

    let args = {};
    if (categories.length > 0) args.category = categories;
    if (prices.length) args.price = { $gte: prices[0], $lte: prices[1] };
    // console.log("args => ", args);

    const products = await Product.find(args).select("-photo");
    // console.log("filtered products query => ", products.length);
    console.log(products);

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsCount = async (req, res) => {
  try {
    const total = await Product.find({}).estimatedDocumentCount();
    res.json(total);
  } catch (err) {
    console.log(err);
  }
};

export const listProducts = async (req, res) => {
  try {
    const perPage = 6;
    const page = req.params.page ? req.params.page : 1;

    const products = await Product.find({})
      .select("-photo")
      .skip((page - 1) * perPage)
      .limit(perPage)
      .sort({ createdAt: -1 });

    res.json(products);
  } catch (err) {
    console.log(err);
  }
};

export const productsSearch = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await Product.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    }).select("-photo");

    res.json(results);
  } catch (err) {
    console.log(err);
  }
};

export const relatedProducts = async (req, res) => {
  try {
    const { productId, categoryId } = req.params;
    const related = await Product.find({
      category: categoryId,
      _id: { $ne: productId },
    })
      .select("-photo")
      .populate("category")
      .limit(3);

    res.json(related);
  } catch (err) {
    console.log(err);
  }
};

export const getToken = async (req, res) => {
  try {
    const paymentToken = Math.round(Math.random() * 1000);
    res.send({ paymentToken });
  } catch (err) {
    console.log(err);
  }
};

export const processPayment = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    const amount = cart.reduce((sum, current) => sum + current.price, 0);
    console.log("amount => ", amount);

    //create order
    const order = new Order({
      products: cart,
      payment: true,
      amount,
      buyer: req.user._id,
    }).save();

    // decrement quantity
    decrementQuantity(cart);

    res.json({ ok: true, amount });
  } catch (err) {
    console.log(err);
  }
};

const decrementQuantity = async (cart) => {
  try {
    // build mongodb query
    const bulkOps = cart.map((item) => {
      return {
        updateOne: {
          filter: { _id: item._id },
          update: { $inc: { quantity: -0, sold: +1 } },
        },
      };
    });

    const updated = await Product.bulkWrite(bulkOps, {});
    // console.log("blk updated", updated);
  } catch (err) {
    console.log(err);
  }
};

export const orderStatus = async (req, res) => {
  console.log(req.body);
};

/*
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_KEY);

export const orderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    ).populate("buyer", "email name");
    // send email

    // prepare email
    const emailData = {
      from: process.env.EMAIL_FROM,
      to: order.buyer.email,
      subject: "Order status",
      html: `
        <h1>Hi ${order.buyer.name}, Your order's status is: <span style="color:red;">${order.status}</span></h1>
        <p>Visit <a href="${process.env.CLIENT_URL}/dashboard/user/orders">your dashboard</a> for more details</p>
      `,
    };

    try {
      await sgMail.send(emailData);
    } catch (err) {
      console.log(err);
    }

    res.json(order);
  } catch (err) {
    console.log(err);
  }
};

*/

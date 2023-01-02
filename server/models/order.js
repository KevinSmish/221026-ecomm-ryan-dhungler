import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema(
  {
    products: [{ type: ObjectId, ref: "Product" }],
    payment: { type: Boolean },
    amount: {
      type: Number,
      trim: true,
      required: true,
    },
    buyer: { type: ObjectId, ref: "User" },
    status: {
      type: String,
      default: "Not processed",
      enum: [
        "Not processed",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);

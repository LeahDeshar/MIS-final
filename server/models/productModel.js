import mongoose from "mongoose";

//REVIEW MODELS
const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
      // required: [true, "comment is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: [true, "user id is required"],
    },
    // product: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Products",
    //   required: [true, "product id is required"],
    // },
  },
  { timestamps: true }
);
// PRODUCT MODELS
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "product name is required"],
    },
    description: {
      type: String,
      required: [true, "produvct description is required"],
    },
    price: {
      type: Number,
      required: [true, "product price is required"],
    },
    quantity: {
      type: Number,
      required: [true, "product stock required"],
    },

    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      // type: String
    },
    images: [
      {
        public_id: String,
        url: String,
      },
    ],
    farmer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      default: 0,
    },
    numReviews: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const productModel = mongoose.model("Products", productSchema);
export default productModel;

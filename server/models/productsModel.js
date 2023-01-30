const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    productDescription: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const productModel = new model("product", productSchema);
module.exports = productModel;

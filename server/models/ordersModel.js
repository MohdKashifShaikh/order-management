const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    orderDescription: {
      type: String,
      required: true,
    },
    countsOfProduct: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = new model("order", orderSchema);
module.exports = orderModel;

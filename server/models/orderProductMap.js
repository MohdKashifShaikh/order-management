const { Schema, model, default: mongoose } = require("mongoose");

const orderProductMapSchema = new Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "order",
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "product",
    },
  },
  {
    timestamps: true,
  }
);

const orderProductModel = new model("orderProductMap", orderProductMapSchema);
module.exports = orderProductModel;

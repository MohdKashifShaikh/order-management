const orderModel = require("../models/ordersModel");
const productModel = require("../models/productsModel");
const orderProductModel = require("../models/orderProductMap");

exports.getOrderBySearch = async (req, res) => {
  // console.log(typeof req.params.id);
  const arr = await orderModel.findOne({ _id: req.params.id });
  res.status(200).json({ msg: "Success", data: arr });
};
// --------------ORDER--------
exports.addOrder = async (req, res) => {
  // const { data } = req.body;
  const order = new orderModel({
    orderDescription: req.body.orderName,
    countsOfProduct: req.body.len,
  });
  await order.save();
  res.send("ADDED SUccess!!!");
};

exports.getOrders = async (req, res) => {
  const arr = await orderModel.find();
  res.status(200).json({ msg: "Success", data: arr });
};

exports.editOrder = async (req, res) => {
  const findOrder = await orderModel.findOne({ _id: req.params.id });

  if (!findOrder) {
    res.status(500).json({ msg: "Didn't find any matched item!" });
    return;
  }
  const result = await orderModel.updateOne(
    { _id: req.params.id },
    {
      $set: {
        orderDescription: req.body.orderName,
        countsOfProduct: req.body.len,
      },
    }
  );
  res.status(200).json({
    message: "Updated Successfully!",
    // data: result,
  });
};

exports.deleteOrder = async (req, res) => {
  const findOrder = await orderModel.findOne({ _id: req.params.id });
  await findOrder.delete();
  res.status(200).json({ msg: "Deleted SUccess!" });
};

// --------------PRODUCT--------
exports.getProduct = async (req, res) => {
  const data = await productModel.find();
  console.log(data);
  res.status(200).json({ msg: "success", data: data });
  // console.log("Fetched Success!");
  // console.log(data);
};

// exports.addProduct = async (req, res) => {
//   const data = new productModel({
//     // productName: "Bike",
//     // productDescription: "This is Bike",
//   });
//   await data.save();
//   console.log("Product ADDED Success!!!");
//   res.send("ADDED SUccess!!!!");
// };

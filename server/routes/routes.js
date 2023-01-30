const express = require("express");
const router = express.Router();

const {
  getOrderBySearch,
  getOrders,
  addOrder,
  editOrder,
  deleteOrder,
  getProduct,
  addProduct,
  orderProductMap,
} = require("../controllers/orderController");

router.get("/order", getOrders);
router.get("/order/:id", getOrderBySearch);
router.post("/orders", addOrder);
router.put("/orders/:id", editOrder);
router.delete("/orders/:id", deleteOrder);

router.get("/get-products", getProduct);
// router.post("/add-product", addProduct);

// router.post("/order-product", orderProductMap);

module.exports = router;

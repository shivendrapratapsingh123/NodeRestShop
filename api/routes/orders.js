const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const Order = require("../models/orderModel");
 const Product = require("../models/productModel");
 const checkAuth = require("../middleware/check-auth");
 const OrdersController = require("../controllers/ordersController");
router.get("/",checkAuth,OrdersController.orders_get_all);

router.post("/",checkAuth,OrdersController.orders_create_order);

router.get("/:orderId",checkAuth,OrdersController.orders_get_perticular);

router.delete("/:orderId",checkAuth,OrdersController.orders_delete_perticular);

module.exports = router;
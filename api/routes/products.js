const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/check-auth");
const ProductsController = require("../controllers/productsController");
const upload = require("../files/imageUpload");


router.get("/",ProductsController.products_get_all);

router.post("/",checkAuth,upload.single("productImage"),ProductsController.products_create_product);

router.get("/:productId",ProductsController.products_get_perticular);

router.patch("/:productId",checkAuth, ProductsController.products_modify_perticular);

router.delete("/:productId",checkAuth,ProductsController.products_delete_perticular);

module.exports = router;
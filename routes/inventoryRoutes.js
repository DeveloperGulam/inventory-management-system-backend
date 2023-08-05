const express = require("express");
const router = express.Router();
const inventoryController = require("../controllers/inventoryController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/", verifyToken, inventoryController.getAllInventory);
router.post("/", verifyToken, inventoryController.createInventory);
router.patch("/:id", verifyToken, inventoryController.updateInventory);
router.delete("/:id", verifyToken, inventoryController.deleteInventory);

module.exports = router;
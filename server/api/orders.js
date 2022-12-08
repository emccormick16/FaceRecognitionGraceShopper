const express = require("express");
const router = express.Router();
const { Order, User, Book, CartItem } = require("../db");

// GET /api/orders/:orderId
// Get all
router.get("/:orderId", async (req, res, next) => {
  const orderId = req.params.orderId;
  try {
    const order = await Order.findByPk(orderId, {
      include: [User, CartItem],
    });
    res.send(order);
  } catch (error) {
    next(error);
  }
});

// GET /api/order/users/:users
router.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;
});

module.exports = router;

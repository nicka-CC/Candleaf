import express from 'express';
import {PrismaClient} from "@prisma/client";
import {authCheckMiddleware} from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/add/:candleId", authCheckMiddleware, async (req, res) => {
  const {candleId} = req.params;
  const userId = req.user.id;
  try {
    let userCart = await prisma.userCart.findFirst({
      where: {userId: userId, statusPay: false},
    });
    if (!userCart) {
      userCart = await prisma.userCart.create({
        data: {
          userId: userId,
          statusPay: false,
        },
      });
    }
    const candle = await prisma.candle.findUnique({
      where: {id: Number(candleId)},
    });
    if (!candle) {
      return res.status(404).json({error: "Candle not found"});
    }
    const candleOnCart = await prisma.candleOnCart.create({
      data: {
        userCartId: userCart.id,
        candleId: Number(candleId),
      },
    });
    res.status(201).json(candleOnCart);
  } catch (error) {
    console.error("Error adding candle to cart:", error);
    res.status(500).json({error: "Internal server error."});
  }
});
router.get("/get", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;
  try {
    const userCart = await prisma.userCart.findFirst({
      where: {userId: userId, statusPay: false},
      include: {
        candles: {
          include: {
            candle: true,
          },
        },
      },
    });
    if (!userCart) {
      return res.status(404).json({error: "Cart not found."});
    }
    res.json(userCart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({error: "Internal server error."});
  }
});
router.delete("/delete/:Id", authCheckMiddleware, async (req, res) => {
  const {Id} = req.params;
  const userId = req.user.id;

  try {
    const userCart = await prisma.userCart.findFirst({
      where: {userId: userId, statusPay: false},
    });

    if (!userCart) {
      return res.status(404).json({error: "Active cart not found for user"});
    }

    const candleOnCart = await prisma.candleOnCart.findFirst({
      where: {
        userCartId: userCart.id,
        id: Number(Id),
      },
    });

    if (!candleOnCart) {
      return res.status(404).json({error: "Candle not found in cart"});
    }

    const deletedCandleOnCart = await prisma.candleOnCart.delete({
      where: {id: candleOnCart.id},
    });

    res.json(deletedCandleOnCart);
  } catch (error) {
    console.error("Error deleting candle from cart:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
router.patch("/update/payed", authCheckMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const userCart = await prisma.userCart.findFirst({
      where: {userId: userId},
    });

    if (!userCart) {
      return res.status(404).json({error: "Active cart not found for user"});
    }

    const updatedCart = await prisma.userCart.update({
      where: {id: userCart.id},
      data: {statusPay: !userCart.statusPay},
    });
    res.json(updatedCart);
  } catch (error) {
    console.error("Error updating cart status:", error);
    res.status(500).json({error: "Internal Server Error"});
  }
});
export default router;
import express from 'express';
import {PrismaClient} from "@prisma/client";
import {authCheckMiddleware} from "../middleware/authMiddleware.js";

const prisma = new PrismaClient();
const router = express.Router();

router.patch("/update-user-name", authCheckMiddleware, async (req, res) => {
  const {number, newName, checkPassword} = req.body;

  if (!number || !newName || !checkPassword) {
    return res
      .status(400)
      .json({error: "Email and newUsername are required."});
  }
  try {
    const user = await prisma.user.findUnique({
      where: {number: number},
    });
    if (!user) {
      return res.status(404).json({error: "User not found."});
    }
    const passwordMatch = await bcrypt.compare(checkPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({error: "Password is incorrect."});
    }
    const updatedUser = await prisma.user.update({
      where: {number: number},
      data: {name: newName},
    });
    console.log("Updated user:", updatedUser);
    res.json({ok: true, message: "Username updated successfully."});
  } catch (error) {
    console.error("Error updating username:", error);
    res.status(500).json({error: "Internal server error."});
  }
});
import bcrypt from "bcryptjs";

router.patch("/update-user-password", authCheckMiddleware, async (req, res) => {
  const {number, newPassword, checkNewPassword, checkOldPassword} = req.body;

  if (!number || !newPassword || !checkOldPassword || !checkNewPassword) {
    return res
      .status(400)
      .json({error: "Number, newPassword and checkOldPassword are required."});
  }
  try {
    const user = await prisma.user.findUnique({
      where: {number: number},
    });
    if (!user) {
      return res.status(404).json({error: "User not found."});
    }
    const passwordMatch = await bcrypt.compare(checkOldPassword, user.password);
    if (!passwordMatch) {
      return res.status(400).json({error: "Old password is incorrect."});
    }
    if (newPassword !== checkNewPassword) {
      return res.status(400).json({error: "you must input new password two times."});
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 13);
    const updatedUser = await prisma.user.update({
      where: {number: number},
      data: {password: hashedNewPassword},
    });

    console.log("Updated user:", updatedUser);
    res.json({ok: true, message: "Password updated successfully."});
  } catch (error) {
    console.error("Error updating password:", error);
    res.status(500).json({error: "Internal server error."});
  }
});
router.patch("/update-user-number", authCheckMiddleware, async (req, res) => {
  const {number, newNumber, checkPassword} = req.body;
  if (!number || !newNumber || !checkPassword) {
    return res
      .status(400)
      .json({error: "Number, newPassword and checkOldPassword are required."});
  }
  try {
    const user = await prisma.user.findUnique({
      where: {number: number},
    });
    if (!user) {
      return res.status(404).json({error: "User not found."});
    }
    const passwordMatch = await bcrypt.compare(checkPassword, user.password);

    if (!passwordMatch) {
      return res.status(400).json({error: "Password is incorrect."});
    }
    const updatedUser = await prisma.user.update({
      where: {number: number},
      data: {number: newNumber},
    });
    console.log("Updated user:", updatedUser);
    res.json({ok: true, message: "Number updated successfully."});
  } catch (error) {
    console.error("Error updating number:", error);
    res.status(500).json({error: "Internal server error."});
  }
})
export default router;
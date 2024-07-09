import express from "express";
import { PrismaClient } from "@prisma/client";
import { authCheckMiddleware } from "../middleware/authMiddleware.js";
import multer from "multer";

const prisma = new PrismaClient();
const router = express.Router();

router.post("/post", authCheckMiddleware, async (req, res) => {
  const { image, name, price, wax, fragrance, burningTime, dimension, weight } = req.body;


  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });


    if (user && user.moderate) {

      const newRecord = await prisma.candle.create({
        data: { image, name, price, wax, fragrance, burningTime, dimension, weight },
      });
      res.status(201).json(newRecord);
    } else {

      res.status(403).json({ error: "Forbidden: User does not have moderation rights" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
router.get("/get", async(req, res)=>{
  try{
    const candles = await prisma.candle.findMany()
    res.json(candles)
  }catch(error){
    res.status(500).json({ error: "Internal Server Error" });
  }
})
router.get("/get/:id", async (req, res)=> {
  const {id} = req.params
  try{
    const candle = await prisma.candle.findUnique({where: {id: Number(id)}})
    if (candle) {
      res.json(candle);
    } else {
      res.status(404).json({ error: "Candle not found" });
    }
  }catch(error){
    res.status(500).json({ error: "Internal Server Error" });
  }
})

router.delete("/delete/:id", authCheckMiddleware, async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const user = await prisma.user.findUnique({
      where: {id: userId}
    })
    if (user && user.moderate) {
      const deletedRecord = await prisma.candle.delete({
        where: {id: Number(id)},
      });
      res.json(deletedRecord);
    }else{
      res.status(403).json({ error: "Forbidden: User does not have moderation rights" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/patch/:id", authCheckMiddleware, async (req, res) => {
  const { name, price, wax, fragrance, burningTime, dimension, weight } = req.body;

  const {id} = req.params;
  const userId = req.user.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });


    if (user && user.moderate) {
      const candle = await prisma.candle.findUnique({
        where: { id: Number(id) },
      });
      if(candle){
        const changedCandle = await prisma.candle.update({
          where: { id: Number(id) },
          data: {name, price, wax, fragrance, burningTime, dimension, weight },
        });
        res.status(201).json(changedCandle);
      }else{
        res.status(404).json({error: "Candle not found!"})
      }

    } else {

      res.status(403).json({ error: "Forbidden: User does not have moderation rights" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const uploadFiles = multer({ dest: "./uploads/" });

// Роутер для загрузки изображения свечи по ID
router.post("/upload-candle-image/:id", uploadFiles.single("image"), async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    try {
      const candle = await prisma.candle.findUnique({
        where: { id: Number(id) },
      });

      if (candle) {
        const updatedCandle = await prisma.candle.update({
          where: { id: Number(id) },
          data: {
            image: req.file.filename || "",
          },
        });

        res.json({ ok: true, updatedCandle });
      } else {
        res.status(404).json({ error: "Candle not found" });
      }
    } catch (error) {
      console.error("Error updating candle:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  } else {
    res.status(400).json({ error: "No file provided" });
  }
});
export default router;
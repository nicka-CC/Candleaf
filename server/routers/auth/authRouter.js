import express from 'express';
import {PrismaClient} from "@prisma/client"
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import dotenv from 'dotenv';

 dotenv.config();

const prisma = new PrismaClient();
const router = express.Router();

// router.use((req, res, next) => {
//   console.log('DATABASE_URL:', process.env.DATABASE_URL);
//   next();
// });
router.post("/reg", async (req, res) => {
  const {number, name, password} = req.body;
  try{
    let alredayCreatedUser = await prisma.user.findUnique({
      where: {number: number}
    })
    if (alredayCreatedUser){
      return res.status(409).json({
        ok: false,
        message: "Profile with this number already exists",
      })
    }
    let hashed_password = await bcryptjs.hash(password, 13)
    let user = await prisma.user.create({
      data:{number, name, password: hashed_password}
    })
    res.json({ok: true, result: user})

  } catch(error){
    res.status(500).json({ok: false, result: undefined, errMsg: error})
  } finally {
    prisma.$disconnect()
  }
})

router.post("/login", async (req, res) => {
  const { number, password } = req.body;

  try {
    let candidate = await prisma.user.findUnique({
      where: { number: number },
    });

    if (!candidate) {
      return res.status(200).json({ ok: false, message: "Invalid credentials" });
    }

    const compare_pwd = await bcryptjs.compare(password, candidate.password);

    if (!compare_pwd) {
      return res.status(200).json({ ok: false, message: "Invalid credentials" });
    }

    const _user = { id: candidate.id, number: candidate.number, name: candidate.name, moderate: candidate.moderate };

    const token = jwt.sign(_user, "MY_SECRET_KEY", { expiresIn: "1d" });

    return res.json({ ok: true, user: _user, token });
  } catch (error) {
    return res.status(500).json({ ok: false, errMsg: error.message });
  } finally {
    prisma.$disconnect();
  }
});

export default router;

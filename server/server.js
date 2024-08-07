import express from "express";
import authRouter from "./routers/auth/authRouter.js";
import cors from "cors";
import candleRouter from "./routers/candle/candleRouter.js";
import userRouter from "./routers/user/userRouter.js";
import cartRouter from "./routers/cart/cartRouter.js";
import testimonialsRouter from "./routers/testimonials/testimonialsRouter.js";
const app = express();

const PORT = 3555;
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static('uploads'))
app.use("/auth/", authRouter);
app.use("/candle", candleRouter);
app.use("/user", userRouter);
app.use("/cart", cartRouter);
app.use("/testimonials", testimonialsRouter)

app.listen(PORT, () => {
  console.log(`server started, port ${PORT}`);
});
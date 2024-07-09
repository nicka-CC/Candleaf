import express from "express";
import authRouter from "./routers/auth/authRouter.js";
import cors from "cors";
import candleRouter from "./routers/candle/candleRouter.js";
const app = express();

const PORT = 3555;
app.use(cors());
app.use(express.json());
app.use("/auth/", authRouter);
app.use("/candle", candleRouter);

app.listen(PORT, () => {
  console.log(`server started, port ${PORT}`);
});
//TODO make user requastions
//TODO PersonTestimonials requestions
//TODO make cart requestions
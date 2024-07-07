import express from "express";
// import testRouter from "./routes/testRouter/testRouter.js";
import cors from "cors";
const app = express();

const PORT = 3555;
app.use(cors());
app.use(express.json());

// app.use("/test/", testRouter);

app.listen(PORT, () => {
  console.log(`server started, port ${PORT}`);
});

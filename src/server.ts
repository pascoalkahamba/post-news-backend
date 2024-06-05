import express from "express";
import { userRoutes } from "./routes/user.routes";
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

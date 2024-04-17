import express from "express";
import { userRoutes } from "./routes/user.routes";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

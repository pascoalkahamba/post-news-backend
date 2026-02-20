import express from "express";
import { userRoutes } from "./routes/user.routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";
import { verificationCodeRoutes } from "./routes/verificationCode.routes";
import { categoryRoutes } from "./routes/category.routes";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));
const port = process.env.PORT ?? 3001;

//sudo systemctl is-enabled mysql - para verificar se o servidor do mysql esta activo.

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);
app.use("/verificationCode", verificationCodeRoutes);
app.use("/category", categoryRoutes);

app.listen(port, () => {
  console.log("server running!");
});

export default app;

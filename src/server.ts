import express from "express";
import { userRoutes } from "./routes/user.routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

app.options("*", cors(corsOptions));
const port = process.env.PORT;

// function isHappy(num: number): boolean {
//   const numsS = num.toString().split("");

//   let result = 0;
//   const mapNums = new Map();
//   if (num < 10) {
//     return false;
//   }

//   for (let i = 0; i < numsS.length; i++) {
//     const currNum = numsS[i];
//     const currNumPlusOne = numsS[i + 1];
//     if (!numsS.includes(currNumPlusOne)) {
//       break;
//     }
//     result += Number(currNum) ** 2 + Number(currNumPlusOne) ** 2;

//     if (result === 1) {
//       return true;
//     }
//   }

//   console.log("result ", result);

//   return false;
// }
// console.log("happy number ", isHappy(100));
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

export default app;

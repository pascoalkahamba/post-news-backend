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

// function majorityElement(nums: number[]): number {
//   const mapElement = new Map();
//   let result = 0;
//   let majorityKey = nums.length / 2;
//   let maxTimes = 0;
//   let maxExist = 0;

//   for (let count = 0; count < nums.length; count++) {
//     const currentNum = nums[count];
//     if (mapElement.has(currentNum)) {
//       mapElement.set(currentNum, maxTimes++);
//       maxExist += mapElement.get(currentNum);
//     } else {
//       mapElement.set(
//         currentNum,
//         (maxTimes = Math.abs(maxTimes - maxExist + 1))
//       );
//     }

//     if (maxExist > majorityKey) {
//       result = currentNum;
//     }
//   }

//   return result;
// }

// console.log(majorityElement([1, 0, 2, 1, 0, 0, 0, 5, 5, 1]));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

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

// function majorityElement(nums: number[]) {
//   const mapElement = new Map();
//   const majorityEle = nums.length / 2;
//   // let maxTimes = 0;
//   let maxIndex = 0;
//   let result = 0;

//   for (let count = 0; count < nums.length; count++) {
//     const currentNum = nums[count];
//     const currentIndex = count;
//     if (mapElement.has(currentNum)) {
//       maxIndex += mapElement.get(currentNum) + currentIndex;
//       // mapElement.set(currentNum, maxIndex);
//     } else {
//       mapElement.set(currentNum, currentIndex);
//       // maxIndex = 0;
//     }

//     if (maxIndex > majorityEle || maxIndex === 0) {
//       result = currentNum;
//     }
//   }

//   return result;
// }
// console.log(majorityElement([6, 6, 6, 6, 7]));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

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
//   let candidate = 0;
//   let count = 0;

//   for (let i = 0; i < nums.length; i++) {
//     const currentNum = nums[i];

//     if (count === 0) {
//       candidate = currentNum;
//     }

//     count += currentNum === candidate ? 1 : -1;
//   }

//   return candidate;
// }

// console.log(
//   "majorityElem",
//   majorityElement([3, 3, 4, 11, 4, 3, 11, 2, 12, 11, 12, 11])
// );
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

export default app;

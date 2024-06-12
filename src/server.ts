import express from "express";
import { userRoutes } from "./routes/user.routes";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
app.use(cors());

const port = process.env.PORT;

// function romanToInt(s: string): number {
//   const romanIntegerMap: { [key: string]: number } = {
//     I: 1,
//     V: 5,
//     X: 10,
//     L: 50,
//     C: 100,
//     D: 500,
//     M: 1000,
//   };

//   const letterS = s.split("");
//   const romanIntegerMapKey = Object.keys(romanIntegerMap);
//   let result = 0;

//   for (let i = 0; i < letterS.length; i++) {
//     const cur = letterS[i];
//     const indexCur = romanIntegerMapKey.indexOf(cur);
//     const indexCurPlusOne = romanIntegerMapKey.indexOf(letterS[i + 1]);

//     const checkTest =
//       indexCurPlusOne - indexCur === 1 || indexCurPlusOne - indexCur === 2;

//     if (checkTest) {
//       console.log(indexCurPlusOne - indexCur);

//       result +=
//         romanIntegerMap[
//           romanIntegerMapKey[indexCur + (indexCurPlusOne - indexCur)]
//         ] - romanIntegerMap[romanIntegerMapKey[indexCur]];
//       i++;
//       continue;
//     }

//     result += romanIntegerMap[cur];
//   }

//   return result;
// }

// console.log(romanToInt("IV"));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

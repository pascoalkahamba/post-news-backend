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

function getSum(n: number): number {
  const arrayNum = `${n}`.split("");

  const squareSum = arrayNum.reduce((acc, num) => acc + (+num) ** 2, 0);

  return squareSum;
}

function isHappy(n: number): boolean {
  const vissited: { [key: number]: boolean } = { [n]: true };

  let sum = getSum(n);

  while (sum !== 1) {
    sum = getSum(sum);

    if (vissited[sum]) {
      return false;
    }

    vissited[sum] = true;
  }

  return true;
}

function isIsomorphic(s: string, t: string): boolean {
  const letters = new Set();
  const letters2 = new Set();
  let count01 = 0;
  let count02 = 0;

  if (s.length !== t.length) {
    return false;
  }

  for (let i = 0; i <= s.length; i++) {
    const currLetter = s[i];
    if (letters.has(currLetter)) {
      console.log("letters", letters);
      count01++;
    }
    letters.add(currLetter);
  }

  for (let c = 0; c <= t.length; c++) {
    const currLetter = t[c];
    if (letters2.has(currLetter)) {
      console.log("letters2", letters2);
      count02++;
    }
    letters2.add(currLetter);
  }

  if (
    (count01 >= 1 && count02 >= 1) ||
    (s.length >= 1 && t.length >= 1 && s === t)
  ) {
    return true;
  }

  return false;
}

console.log("isIsomorphic ", isIsomorphic("es", "es"));

// console.log("happy number ", isHappy(192));

app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/user", userRoutes);

app.listen(port, () => {
  console.log("server running!");
});

export default app;

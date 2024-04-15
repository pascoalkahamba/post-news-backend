import express from "express";

const app = express();

const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
  console.log("server running!");
});

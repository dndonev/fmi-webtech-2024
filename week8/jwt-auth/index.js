const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(express.json());

app.post("/register", (req, res) => {
  const username = req.body.username;
  const user = { name: username };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  console.log("accessToken: ", accessToken);

  res.json({ accessToken }).send();
});

app.get("/private", verifyTokenMiddleware, (req, res) => {
  const post = {
    title: "New post",
    iat: new Date().getTime(),
  };

  const myUser = req.user;

  res.json(myUser).status(200).send();
});

app.listen(3001, () => console.log("listening"));

function verifyTokenMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;
  // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiZG9icmluMTIzIiwiaWF0IjoxNjgyMzQ2NzU1fQ.tklflL3Jh2d3kq6sGs4UvTsDVzR9KD7X43gngApDb-o
  const token = authHeader && authHeader.split(" ").pop();
  if (!token) {
    return res.sendStatus(401);
  }

  const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, {
    algorithm: "HS256",
  });
  if (!user) {
    return res.sendStatus(403);
  }

  req.user = user;
  next();
}

const express = require("express");
const cookieParser = require("cookie-parser");
const uuid = require("uuid");

const sessionIds = [];

const app = express();

app.use(cookieParser());
app.use(express.json());

app.post("/private", (req, res) => {
  const userId = req.cookies.sessionId;

  if (sessionIds.find((id) => id === userId)) {
    return res.status(200).send("We have access!");
  } else {
    return res.sendStatus(403);
  }
});

app.post("/logout", (req, res) => {
  const userId = req.cookies.sessionId;

  if (userId && sessionIds.find((x) => x === userId)) {
    sessionIds.splice(sessionIds.indexOf(userId), 1);
    return res.status(200).send("Logged out");
  }

  return res.sendStatus(403);
});

app.post("/login", (req, res) => {
  const userId = uuid.v4(); // Generate a random session id
  sessionIds.push(userId);
  res.setHeader("Set-Cookie", `sessionId=${userId}`);
  res.sendStatus(200);
});

app.listen(3001, () => console.log("listening"));

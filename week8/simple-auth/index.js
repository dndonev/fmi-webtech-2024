const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

const users = [];

app.use(express.json());

app.post("/login", (req, res) => {
  const user = users.find((u) => u.name === req.body.username); // Authentication

  if (!user) {
    return res.sendStatus(404);
  }

  if (bcrypt.compareSync(req.body.password, user.password)) {
    return res.sendStatus(200);
  } else {
    res.sendStatus(403);
  }
});

app.post("/register", (req, res) => {
  if (
    !req.body ||
    !Object.getOwnPropertyNames(req.body).length ||
    req.body.name === "" ||
    req.body.password === ""
  ) {
    return res.status(400).send("Name or password are invalid"); // Bad request for errors
  }

  const salt = bcrypt.genSaltSync();
  const hashedPassword = bcrypt.hashSync(req.body.password, salt);

  const user = { name: req.body.username, password: hashedPassword };

  users.push(user);
  res.sendStatus(201);
});

app.listen(3001, () => console.log("listening"));

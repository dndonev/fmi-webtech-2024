const cookieParser = require("cookie-parser");
const express = require("express");
const session = require("express-session");
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
  })
);

app.post("/register", (req, res) => {
  const { user } = req.body;
  if (!user) {
    return res.sendStatus(400);
  }
  req.session.user = user;
  res.send("You have registered successfully!");
});

app.get("/private", (req, res) => {
  if (!req.session || !req.session?.user) {
    return res.sendStatus(401);
  }
  res.send("private route accessed");
});

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.send("logged out");
});

app.listen(3001, () => {
  console.log("Listening on 3001");
});

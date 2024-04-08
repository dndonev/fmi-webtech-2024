const express = require("express");
const cors = require("cors");
const PORT = 3000;
const app = express();

app.use(cors());

const users = [
  {
    id: 1,
    username: "admin",
    lastName: "admin",
  },
  {
    id: 2,
    username: "admin2",
    lastName: "admin2",
  },
  {
    id: 3,
    username: "admin3",
    lastName: "admin3",
  },
];

app.get("/api/users", (req, res) => {
  res.json(users);
});

app.listen(PORT, () => console.log("Server is running on port 3000"));

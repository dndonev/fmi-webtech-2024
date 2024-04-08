const express = require('express'); // import express module
const app = express(); // create express app instance
const { join } = require('path');

const port = 3000; // define port number to run the server on it
const cwd = process.cwd(); // get current working directory

console.log('-------CWD----', cwd);
// Users/ddonev/asdfasd/a/sdf/asd/fa/sdf/
// Users\\ddonev''asdfa
const indexHtml = join(cwd, 'public', 'index.html'); // get the path of index.html file
const public = join(cwd, 'public'); // get the path of public folder≥≤≤

console.log('My html', indexHtml);
let todos = ['Buy milk', 'Buy eggs', 'Buy bread']; // DB - Todos table

app.use(express.json()); // middleware to parse json body
app.use(express.static(public)); // middleware to serve static files

app.get('/', (req, res) => {
  // create an endpoint which returns 'Hello World!' as response
  res.sendFile(indexHtml);
});

app.get('/api/todos', (req, res) => {
  // create an endpoint which returns all customers as json object
  res.json(todos);
});

app.post('/api/todos/add', (req, res) => {
  const todo = req.body?.itemName;

  console.log('REQUEST BODY', req.body);
  if (!todo) {
    return res.sendStatus(400);
  }

  todos.push(todo);

  res.json(todos);
});

app.post('/api/todos/delete', (req, res) => {
  const todo = req.body?.itemName;

  if (!todo) {
    return res.sendStatus(400);
  }

  todos = todos.filter((x) => x !== todo);

  res.json(todos);
});
// start the server on the defined port number
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

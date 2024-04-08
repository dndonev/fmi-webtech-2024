// This function is attached to the li element when it is created
const appendListItems = (todos) => {
  console.log('APPPENDING ITEMS');
  document.querySelector('ul').innerHTML = '';
  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.textContent = todo;

    li.onclick = (event) => onListItemClick(event); // add event listener to the li element

    document.querySelector('ul').appendChild(li);
  });
};

const deleteTodoItem = (todo) => {
  fetch('http://localhost:3000/api/todos/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemName: todo }),
  })
    .then((res) => res.json()) // parse the response
    .then((todos) => appendListItems(todos)); // update the list;
};

const addTodoItem = () => {
  const todo = document.querySelector('input').value;
  fetch('http://localhost:3000/api/todos/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ itemName: todo }),
  })
    .then((res) => res.json())
    .then((todos) => appendListItems(todos))
    .catch((err) => console.log(err));
};

const onListItemClick = (e) => {
  const todo = e.target.textContent; // get the elment's text content
  deleteTodoItem(todo);
};

const onButtonClick = () => {
  const input = document.querySelector('input');
  const todo = input.value;
  input.value = '';
  deleteTodoItem(todo);
};

const getTodoItems = async () => {
  console.log('BEFORE ES5 fetch');
  fetch('http://localhost:3000/api/todos') // send a request to the server
    .then((res) => res.json())
    .then((todos) => {
      appendListItems(todos);
      console.log('After ES5 fetch');
    })
    .catch((err) => console.log(err));
  console.log('BEFORE ES5 fetch');

  try {
    console.log('BEFORE ES6 fetch');

    const response = await fetch('http://localhost:3000/api/todos');
    console.log('After ES6 fetch');

    const todos = await response.json();

    appendListItems(todos);
    console.log('After ES6 fetch');
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  getTodoItems();
});

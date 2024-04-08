const getCountriesByText = (inputText) => {
  fetch("http://localhost:3000/api/users")
    .then((res) => res.json())
    .then((users) => {
      users.forEach((user) => {
        const li = document.createElement("li");
        li.textContent = `${user.username} ${user.lastName}`;
        document.querySelector("ul").appendChild(li);
      });
    });
};

const onUserInput = () => {

  // 1. get the value from the input
  // 2. send the request === getCountriesByText(userInput)
  // 3. filter the response
  // 4. visualise the filtered countries
}

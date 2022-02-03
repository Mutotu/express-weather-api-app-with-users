// to save in local storage
// localStorage.setItem('key', value)

// const { response } = require("express");

// to get from local storage
//localStorage.getItem('key')

// to clear local storage
//localStorage.clear()

document
  .querySelector(".signup-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const name = document.querySelector("#signup-name").value;
    const email = document.querySelector("#signup-email").value;
    const password = document.querySelector("#signup-password").value;
    // console.log(email);
    // console.log(password);
    try {
      const response = await axios.post("http://localhost:3007/user", {
        name: name,
        email: email,
        password: password,
      });
      // console.log(response);

      //   const userId = response.data.user.id;
      //   localStorage.setItem("userId", userId);
    } catch (error) {
      console.log(error);
      alert("email is already taken");
    }
  });

document.querySelector(".login-form").addEventListener("submit", async (ev) => {
  ev.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;

  try {
    const response = await axios.post("http://localhost:3007/user/login/", {
      email: email,
      password: password,
    });

    // console.log(response);
  } catch (err) {
    console.log("error");
  }
});

const express = require("express");
const app = express();
const axios = require("axios");
const rowdy = require("rowdy-logger");
const routesReport = rowdy.begin(app);
const path = require("path");
const cors = require("cors");
app.use(express.json());
app.use(require("cors")());

const models = require("./models");
// const { response } = require("express");
// const { response } = require("express");

const findUser = async (req, res) => {
  try {
    const user = await models.user.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user.password === req.body.password) res.send("Login success");
  } catch (err) {
    res.send(err.message);
  }
};
app.post("/user/login/", findUser);
const createUser = async (req, res) => {
  try {
    const user = await models.user.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    res.send(user);
  } catch (err) {
    res.json({ message: "Invalid" });
  }
};

app.post("/user", createUser);
///weather backend
const oneCity = async (req, res) => {
  try {
    const city = "oakland";
    await axios
      .get(
        `api.openweathermap.org/data/2.5/weather?q=${city}&appid=24cdfdb8d976a7ea6b394fd766cfbc8d`
      )
      .then((response) => {
        console.log(response);
      });

    res.send("findCity");
  } catch (err) {
    res.send(err.message);
  }
};
console.log(oneCity);
// app.get("/city/", oneCity);
//`api.openweathermap.org/data/2.5/weather?q=${city}&appid=24cdfdb8d976a7ea6b394fd766cfbc8d`

const saveLoc = async (req, res) => {
  try {
    return await models.user.findOrCreate({
      where: {
        id: req.body.id,
      },
      include: models.location,
    });
  } catch (er) {
    res.send(er.message);
  }
};

const deleteLocation = async () => {
  try {
    const location = await models.location.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.send("Deleted");
  } catch (err) {
    res.send(err.message);
  }
};

app.post("/users/location", saveLoc);
app.delete("/users/", deleteLocation);

const PORT = process.env.port || 3007;
app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
  routesReport.print();
});

// const https = require("https");
// const url =
//   "api.openweathermap.org/data/2.5/weather?q=oakland&appid=24cdfdb8d976a7ea6b394fd766cfbc8d";
// https
//   .get(url, (res) => {
//     let data = "";
//     res.on("data", (chunk) => {
//       data += chunk;
//     });
//     res.on("end", () => {
//       data = JSON.parse(data);
//       console.log(data);
//     });
//   })
//   .on("error", (err) => {
//     console.log(err.message);
//   });

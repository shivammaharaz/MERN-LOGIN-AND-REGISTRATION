// initial import  and setup
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

const app = express();

const port = process.env.PORT || 5000;
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());
// ***********************************************************



// db connection using mongoose
mongoose.connect(
  "mongodb://localhost:27017/DemoData",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("db connected");
  }
);


// schema for db
const TestSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

// mongoose model

const user = model("test", TestSchema);

// db connection ends

// ***********************************************************



// homepage or get request
app.get("/", (req, resp) => {
  resp.send("hello");
});
// ************************************************************


// login method


app.post("/login", (req, resp) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };
  user.findOne({ email: data.email }, (err, user) => {
    if (user) {
      if (user.password === data.password) {
        resp.send({ message: "login successful", user: user });
      } else {
        resp.send({ message: "password didn't match" });
      }
    } else {
      resp.send("user not registered");
    }
  });
});

// ***********************************************************


// registration method
app.post("/register", async (req, resp) => {
  console.log(req.body);
  const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  };
  user.findOne({ email: data.email }, (err, users) => {
    if (users) {
      resp.send({ message: "user already registered" });
    } else {
      const User = new user(data);

      User.save((err) => {
        if (err) {
          resp.send(err);
        } else {
          resp.send({ message: "Successfully Registered" });
        }
      });
    }
  });

  // resp.send('register')
});
// ***************************************************************




app.listen(port, () => {
  console.log(`Listening on port >> ${port}`);
});

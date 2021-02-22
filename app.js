const mongoose = require('mongoose');
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
// parses JSON to frontend
const bodyParser = require('body-parser');
const User = require('./models/User')
const passport = require('passport');


// creates new express server
const express = require("express");
const app = express();

// setsup middleware for body parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// importing the key
const db = require('./config/keys').mongoURI;

// connect to mongo using mongoose
mongoose
.connect(db, { useNewUrlParser: true })
.then(() => console.log("Connected to MongoDB successfully"))
.catch(err => console.log(err));


app.use(passport.initialize());
require('./config/passport')(passport);

app.use("/api/users", users);
app.use("/api/tweets", tweets);
// run on localhost:5000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));


app.get("/", (req, res) => {
  // const user = new User({
  //   handle: "koko",
  //   email: "hihi@gmail",
  //   password: "123123"
  // })
  // user.save()
  res.send("Hello Worldsfs")
});
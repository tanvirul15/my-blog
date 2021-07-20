const express = require("express");
const app = express();
require("dotenv").config();
// const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const authRoute = require("./root/auth");
const users = require("./root/users");
const posts = require("./root/posts");
const catagories = require("./root/catagories");
const bodyParser = require("body-parser");
var multer = require("multer");
const path = require("path");

app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
const upload = multer({ storage: storage });
app.use(bodyParser.json());

// const client = new MongoClient(process.env.MONGO_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(console.log("Connected.."));

app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image Uploaded..!");
});
app.use("/api/auth", authRoute);
app.use("/api/user", users);
app.use("/api/post", posts);
app.use("/api/catagory", catagories);

app.use("/", (req, res) => {
  res.send("Your Server is working...");
});

// client.connect((err) => {
//   // const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

app.listen("5000", (req, res) => {
  console.log("Server is runing...");
});

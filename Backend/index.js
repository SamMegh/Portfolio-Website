const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const port = 8080;

// storage for multer to store image
const storage = multer.diskStorage({
    destination: function (req, file, cb){
    return cb(null, "./project_images");//in future login condition was written at here if the user is loggin then request further transfer othrewise not
  },
  filename: function (req, file, cb) {
   return cb(null, `${Date.now()} - ${file.originalname}`);
  }
});
const upload = multer({storage })
  // connection check with mongodb
main()
  .then((result) => {
    console.log("conecction suss");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// schema for tabe
const projectschema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 25,
    required: [true, "name required"],
  },
  img: {
    type: String,
    required: [true, "name required"],
  },
  discription: {
    type: String,
    required: [true, "name required"],
  },
});
// model of mongoos
const Project=mongoose.model("Project", projectschema);

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); //for except qurry from get request

// all path to use
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "styless")));
app.use(express.static(path.join(__dirname, "javascript")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use("/Frontend", express.static(path.join(__dirname, "..", "Frontend")));



// handling main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "Frontend", "index.html"));
});

// handling new Project requests
app.post("/projects/new", upload.single('img'),(req, res) => {
  let { name, img, discription } = req.body;
  const data = {
    name,
    img,
    discription
  }
 console.log(data);
});

app.get("/projects", (req, res) => {
  res.render("projects.ejs");
});

// handling contact requests
app.post("/contactus", (req, res) => {
  let { name, mobile_no, email, message } = req.body;
  contact.push({ name, mobile_no, email, message });
});
app.get("/contacts", (req, res) => {
  res.render("contact.ejs", { contact, i });
});
app.listen(port, () => {
  console.log("server started");
});

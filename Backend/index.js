const { match } = require("assert");
const { name } = require("ejs");
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const { type } = require("os");
const path = require("path");
const port = 8080;

const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: false })); //for except qurry from get request

// all path to use
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "styless")));
app.use(express.static(path.join(__dirname, "javascript")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use("/project_images", express.static(path.join(__dirname, "..", "project_images")));
app.use("/client", express.static(path.join(__dirname, "..", "client")));


// connection check with mongodb
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/portfolio_website");
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
    required: [true, "image required"],
  },
  discription: {
    type: String,
    required: [true, "discription required"],
  },
});
const contactschema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxLength: 20,
    match: /^[a-zA-Z ]+$/
  },
  mobile_no: {
    type: Number,
    required: true,
    maxLength: 20,
    match: /^[0-9]{10}$/
  },
  email: {
    type: String,
    required: true,
    maxLength: 50,
    match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  },
  message: {
    type: String,
    required: true
  },
  createon: {
    day: {
      type: String,
      default: () => new Date().toISOString().split("T")[0],
    },
    time: {
      type: String,
      default: () => new Date().toTimeString().split(" ")[0],
    }
  }

});
// model of mongoos
const Project = mongoose.model("Project", projectschema);
const ContactUs = mongoose.model("ContactU", contactschema);

// handling main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

app.get("/projects", (req, res) => {
  async function exicute() {
    let allproject = await Project.collection.find().toArray();
    await res.render("projects.ejs", { allproject });

  }
  exicute();
});

// handling contact requests

app.post("/contactus", async (req, res) => {
  try {
    const { name, mobile_no, email, message } = req.body;
    const date = new Date();
    let day = date.toDateString().split(" ").slice(0, 4).join("-");
    let time = date.toDateString().split(" ").slice(4, 5).join("-");
    const data = {
      name,
      mobile_no,
      email,
      message,
    };

    // Validate and Save in MongoDB
    const contact = await ContactUs.create(data);
    res.status(201).json({ success: true, data: contact });
  } 
  catch (err) {
    res.status(400).json({ success: false, error: err.message });
  }
});
app.get("/contact", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "contact.html"));
});

app.listen(port, () => {
  console.log("server started");
});

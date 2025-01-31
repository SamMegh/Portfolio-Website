const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
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
main()
  .then((result) => {
    console.log("conecction suss");
  })
  .catch((err) => {
    console.log(err);
  });

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
    required: [true, "name required"],
  },
  discription: {
    type: String,
    required: [true, "name required"],
  },
});



// model of mongoos
const Project=mongoose.model("Project", projectschema);



// handling main page
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});



app.get("/projects", (req, res) => {
  async function exicute(){
   let allproject=await Project.collection.find().toArray();
    await res.render("projects.ejs",{allproject} );
    
  }
  exicute();
});

// handling contact requests
app.post("/contactus", (req, res) => {
  let { name, mobile_no, email, message } = req.body;
  contact.push({ name, mobile_no, email, message });
});
// app.get("/contacts", (req, res) => {
//   res.render("contact.ejs", { contact, i });
// });

app.get("/contact",(req,res)=>{
  res.sendFile(path.join(__dirname, "..", "client", "contact.html"));
});

app.listen(port, () => {
  console.log("server started");
});

const express = require('express');
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
port= 8081;
const app= express();
app.set("view engine", "ejs");

app.set(path.join(__dirname, "views"));
app.use("/images",express.static(path.join(__dirname, "images")));


// storage for multer to store image
const storage = multer.diskStorage({
    destination: function (req, file, cb){
    return cb(null, "./project_images");//in future login condition was written at here if the user is loggin then request further transfer othrewise not
  },
  filename: function (req, file, cb) {
    let filname=`${Date.now()}-${file.originalname}`;
   return cb(null,filname );
  }
});
const upload = multer({storage })
  // connection check with mongodb
main().then((result) =>console.log("conecction suss"))
.catch((err) =>console.log(err));

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
const Project=mongoose.model("Project", projectschema);
const ContactUs = mongoose.model("ContactU", contactschema);


// handling new Project requests
app.post("/projects/new", upload.single('img'),(req, res) => {
    let { name, discription } = req.body;
    img=`/${req.file.path}`;
    img=img.replace(/\\/g, "/");
    const data = {
      name,
      img,
      discription
    }
   Project.collection.insertOne(data).catch(err=>console.log(err));
});  


app.get("/",(req,res)=>{
    res.render('index.ejs')
});
app.get("/project",(req,res)=>{
    res.render('projects.ejs')
});
app.get("/view/contact",(req,res)=>{
  ContactUs.find().then((result)=>{
    res.render('contact.ejs',{result});
  });
  
    
});


app.listen(port,()=>{
    console.log("server started");
});
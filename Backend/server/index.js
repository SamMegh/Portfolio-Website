const express = require('express');
const port = 8080;


const app = express();
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true })) //for except qurry from get request



// all path to use 
const path = require("path");
app.set("views", path.join(__dirname, '..', "views"));
app.use(express.static(path.join(__dirname, '..', "styless")));
app.use(express.static(path.join(__dirname, '..', "javascript")));
app.use('/images', express.static(path.join(__dirname, '..', '..', "images")));
app.use('/Frontend',express.static(path.join(__dirname, "..", "..", "Frontend")));


let projects = [
    {
        name: "1st project",
        img: "PhonePe.png",
        discription: "fist project created by sam."
    },
    {
        name: "2nd project",
        img: "PhonePe.png",
        discription: "fist project created by sam."
    },
    {
        name: "3rd project",
        img: "PhonePe.png",
        discription: "fist project created by sam."
    },
    {
        name: "4th project",
        img: "PhonePe.png",
        discription: "fist project created by sam."
    },
];
let contact = [

    {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    }, {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    }, {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    }, {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    }, {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    }, {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    }, {
        name: "1st",
        mobile_no: "1234567890",
        email: "234sdfg@fghghj.fghv",
        message: "asdfertyuxcvbnm,sdty"
    },
];

let i = 0; //share with contact information


// handling main page 
app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "..", "..", "Frontend", "index.html"));
});


// handling Project requests 
app.post("/projects", (req, res) => {
    let { name, img, discription } = req.body;
    projects.push({ name, img, discription });

})
app.get("/projects", (req, res) => {
    res.render('projects.ejs', { projects });

});


// handling contact requests 
app.post("/contactus", (req, res) => {
    let { name, mobile_no, email, message } = req.body;
    contact.push({ name, mobile_no, email, message });
});
app.get("/contacts", (req, res) => {
    res.render('contact.ejs', { contact, i });
});
app.listen(port, () => {
    console.log("server started");
})



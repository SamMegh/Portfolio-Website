const { name } = require('ejs');
const express = require('express');
const port = 8080;
const path = require("path");
const app = express();
app.use(express.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, '..', "views"));
app.use(express.static(path.join(__dirname, '..', "styless")));
app.use(express.static(path.join(__dirname, '..', "javascript")));
app.use('/images', express.static(path.join(__dirname, '..', '..', "img")));
app.use('/Frontend', express.static(path.join(__dirname, '..', '..', "Frontend")));

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
let i = 0;

app.post("/projects", (req, res) => {
    let { name, img, discription } = req.body;
    projects.push({ name, img, discription });

})
app.get("/projects", (req, res) => {
    res.render('projects.ejs', { projects });

});
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



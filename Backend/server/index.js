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

app.post("/post", (req, res) => {
    let { name, img, discription } = req.body;
    projects.push({ name, img, discription })
    res.redirect()

})
app.get("/projects", (req, res) => {
    res.render('projects.ejs', { projects });

});
app.listen(port, () => {
    console.log("server started");
})



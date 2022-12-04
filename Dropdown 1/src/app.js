
const express = require('express');
const path = require('path');
// require("./db/conn");
// const User = require("./models/usermessage");
const hbs = require("hbs");//
// const {registerPrtials} = require("hbs");/
const async = require('hbs/lib/async');

const app = express();
const port = process.env.PORT || 9000 ;



// public static path/
const static_path = (path.join(__dirname, "../public"));
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");


app.set('views engine','hbs');
// app.use(express.urlencoded({extended:false}))
app.use(express.static( static_path ));
app.set('views engine','hbs');
app.set('views', template_path);
hbs.registerPartials(partials_path);




// routing/
app.get("", (req , res) => {
    res.render("index.hbs")
})
app.get("/home", (req , res) => {
    res.send("Welcome to Home page")
})

app.get("/about", (req , res) => {
    res.render("about.hbs")
})

app.get("/contact", (req , res) => {
    res.render("contact.hbs")
})
app.get("/gallery", (req , res) => {
    res.render("gallery.hbs")
})
app.get("/online", (req , res) => {
    res.render("online.hbs")
})

// app.post("/contact", async(req, res) =>{
//     try{
//         res.send(req.body);
//     }catch(error) {
//         res.status(500).send(error);
// //     }
// })

app.listen(port , () => {
    console.log(`listening to the port at ${port}`)
})
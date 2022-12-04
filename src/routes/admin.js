const express = require("express");
const path = require("path");
const mongoose = require('mongoose');
const res = require("express/lib/response");
const async = require("hbs/lib/async");
const multer = require("multer");
const routes = express.Router();
const flipkart = require("../models/index");
const nav = require("../models/nav");
const slider = require("../models/slider");
const CartModel = require("../models/cart");
const user = require("../models/user");
const details = require("../models/details");

routes.get("/addnav", (req, res) => {
  res.render("addnav");
});

routes.get("/addform", async (req, res) => {
  const photo = await nav.find();
  res.render("addform", {
    photo: photo,
  });
});

// routes.get("/viewer",async (req, res)=>{
//   const view = await user.find()
//    res.render("/viewer",{
//      view:view
//    })
//  })
 

routes.get("/seen", async (req, res) => {
  const view = await user.find()
  res.render("seen",  {
    view: view,
  })
});

routes.get("/customer",async(req,res)=>{
 const information = await details.find ()
  res.render("customer",{
information: information
  })
})

// routes.get("/blank", (req, res)=>{
//     res.render('blank')
// })

routes.get("/service", async (req, res) => {
  const list = await flipkart.find();
  res.render("service", {
    list: list,
  });
});

routes.get("/list", async (req, res) => {
  const list = await flipkart.find();
  res.render("list", {
    list: list,
  });
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/image"));
  },
  filename: function (req, file, cb) {
    const uniquesuffix = Date.now() + "-" + Math.round(Math.random() * 1e8);
    cb(null, uniquesuffix + file.originalname);
  },
});

const upload = multer({ storage: storage });

// category find hogi
routes.get("/categories", async (req,res) => {
  const cat = await nav.find();
   res.render("categories",{
     cat: cat,
   })
});


// category delete hogi
routes.get("/categories/delete/:id",async (req,res) => {
   const remove = await nav.findByIdAndDelete(req.params.id)
    res.redirect ("/categories") 
});
// category ma image create hogi isa
routes.post("/create", upload.any(), async (req, res) => {
  // console.log("Saasdaassd1")
  req.body.imageUrl = "/image/" + req.files[0].filename;
  console.log(await nav.create(req.body));
  res.redirect("addnav");
});
// product delete hoga

routes.get("/product/delete/:id", async (req,res) => {
  const remove = await flipkart.findByIdAndDelete(req.params.id);
  res.redirect("service");
});


// isa product ayga update ka liya form ma
routes.get("/product/Update/:id", async (req, res) => {
  const matter = await flipkart.findOne({ _id: req.params.id });
 const photo = await nav.find()
  res.render("update", {
    matter: matter,
    photo: photo
  });
});


// isa form update hoga
routes.post("/product/edit/:id", async (req, res) => {
  const done = await flipkart.findByIdAndUpdate(req.params.id, req.body);
  //  console.log(done)
  res.redirect("/service");
});

// product ki image create hogi
routes.post("/addproduct", upload.any(), async (req, res) => {
  // console.log(req.files)
  req.body.imageUrl = "/image/" + req.files[0].filename;
  console.log(await flipkart.create(req.body));
  res.redirect("addform");
});


// slider ki image  create hogi
routes.post("/update/slider", upload.any(), async (req, res) => {
  req.body.imageUrl = "/image/" + req.files[0].filename;
  console.log(await slider.create(req.body));
  res.redirect("/slider");
});


// slider find hoga
routes.get("/sliderimage", async (req,res)=>{
  const image = await slider.find();
  res.render('sliderimage',{
    image: image
  })
})

// slider delete hoga
routes.get("/slider/delete/:id", async (req,res)=>{
 const destroy = await slider.findByIdAndDelete(req.params.id)

 res.redirect('/sliderimage')
})


module.exports = routes;

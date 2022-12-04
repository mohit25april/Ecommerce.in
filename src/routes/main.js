const express = require("express");
const mongoose = require("mongoose");
const routes = express.Router();
const flipkart = require("../models/index.js");
const register = require("../models/user");
const nav = require("../models/nav");
const details = require("../models/details.js");
const app = express();
const detail = require("../models/details");
const slider = require("../models/slider");
const UserModel = require("../models/user");
const ProductModel = require("../models/index");
const CartModel = require("../models/cart");
const bcrypt = require("bcryptjs");

function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.redirect("/login");
  }
  next();
}

routes.get("/", authMiddleware, async (req, res) => {
  const list = await flipkart.find();
  const photo = await nav.find();
  const create = await slider.find().lean();
  // console.log(req.user, res.locals.user);
  create.forEach((bo, index) => {
    create[index].active = "";
  });
  create[0].active = "active";

  res.view("index", {
    list: list,
    photo: photo,
    create: create,
  });
});

routes.get("/category/:category", async (req, res) => {
  const products = await ProductModel.find({ category: req.params.category });
  // console.log(products);
  res.view("mobile", { list: products });
});

routes.get("/offer", (req, res) => {
  res.render("offer");
});

routes.get("/register", (req, res) => {
  res.render("register");
});

routes.get("/login", (req, res) => {
  if (res.locals.user) res.redirect("/");
  res.view("login");
});

routes.get("/cart", authMiddleware, async (req, res) => {

  
const cartDetails = await CartModel.aggregate([
  {
    $match: {
      userId: mongoose.Types.ObjectId(req.session.user._id),
    },
  },
  {
    $lookup: {
      from: "flipkarts",
      localField: "productId",
      foreignField: "_id",
      as: "productDetails",
    },
  },
  {
    $lookup: {
      from: "registers",
      localField: "userId",
      foreignField: "_id",
      as: "userDetails",
    },
  },
  {
    $addFields:{
      userDetails: { $arrayElemAt: [ "$userDetails", 0 ] },
      productDetails:{$arrayElemAt: [ "$productDetails", 0 ] }
    }
  }
])

/*[
 {
  "_id": "637090bc627ddabfdf022e95",
  "productId": "63504483cbe0dc0b2cce6303",
  "userId": "6367b56a5e1a9f329507aca7",
  "__v": 0,
  "createdAt": "2022-11-13T06:37:48.715Z",
  "quantity": 1,
  "updatedAt": "2022-11-13T06:37:56.593Z",
  "productDetails": {
   "_id": "63504483cbe0dc0b2cce6303",
   "imageUrl": "/image/product-27.png",
   "name": "Smart Watch",
   "brand": "LG",
   "price": "8999",
   "description": "Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)",
   "category": "Electronic",
   "__v": 0
  }
 },
 {
  "_id": "63709107627ddabfdf022ef1",
  "productId": "63504483cbe0dc0b2cce62f7",
  "userId": "6367b56a5e1a9f329507aca7",
  "__v": 0,
  "createdAt": "2022-11-13T06:39:03.226Z",
  "quantity": 3,
  "updatedAt": "2022-11-13T06:44:08.007Z",
  "productDetails": {
   "_id": "63504483cbe0dc0b2cce62f7",
   "imageUrl": "/image/product-15.png",
   "name": "Purple, Ink Cartrid",
   "brand": "  Samsang",
   "price": "9",
   "description": "Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)",
   "category": "Beauty",
   "__v": 0
  }
 }
]*/

console.log(JSON.stringify(cartDetails,null,1));

  res.render("cart",{cartDetails});
});

routes.get("/admin", authMiddleware, (req, res, next) => {
  res.render("adminindex");
});
// routes.get("/cart/:_id", async (req, res) => {
//   const cartdetail = await flipkart.find();
//   // ({_id:req.params._id}).lean()
//   res.render("cart", cartdetail);
// });

routes.get("/pass", (req, res) => {
  res.render("pass");
});

routes.get("/error", (req, res) => {
  res.render("error");
});

routes.get("/conform", (req, res) => {
  res.render("conform");
});

routes.get("/table", (req, res) => {
  res.render("table");
});

routes.get("/slider", (req, res) => {
  res.render("slider");
});

app.use((req, res, next) => {
  res.status(404).render("404");
});

// app.use(function(req, res, next) {
//   res.status(404).send("sorry");
// })

// product ki sari detail aygi click  karna par
routes.get("/flipkartdetail/:_id", async (req, res) => {
  const productdetail = await flipkart.findOne({ _id: req.params._id }).lean();
  // console.log(productdetail)
  res.render("product.hbs", productdetail);
});

// customer ki details creae hogi

routes.post("/process-details", async (req, res) => {
  // console.log("details submitted");
  try {
    const address = await details.create(req.body);
    res.redirect("conform");
  } catch (e) {
    console.log(e);
    res.redirect("404");
  }
});

// regiser create hoga

// routes.post ("/register" , async(req, res)=>{

//     //  console.log(req.body)//
//     try{
//   const list =  await register.create(req.body)
// //   console.log(list)

//   res.redirect("login")
//     } catch (e){
//         console.log(e)
//         res.redirect("/")
//     }

// })

// user create/

routes.post("/register", function (req, res) {
  var name = req.body.name;
  var age = req.body.age;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;

  // req.checkBody('name', 'Name is required').notEmpty();
  // req.checkBody('email', 'email is required').notEmpty();
  // req.checkBody('username', 'Username is required').notEmpty();
  // req.checkBody('password', 'Password is required').notEmpty();
  // req.checkBody('conform ppassword', 'Conform Password is required').notEmpty();

  // var errors = req.validationErrors();

  //         if (errors) {
  //       res.render('register', {
  //            errors:errors
  // })
  //   }
  {
    UserModel.findOne({ username: username }, function (err, user) {
      if (err) console.log(err);

      if (user) {
        req.flash("danger", "Username exists choose another");
        res.redirect("/users/register");
      } else {
        var user = new UserModel({
          name: name,
          email: email,
          age: age,
          username: username,
          password: password,
          admin: 0,
        });
        bcrypt.genSalt(10, function (err, salt) {
          bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) console.log(err);

            user.password = hash;

            user.save(function (err) {
              if (err) {
                console.log(err);
              } else {
                req.flash("success", "you are now registered");
                res.redirect("/login");
              }
            });
          });
        });
      }
    });
  }
});

// login hoga

routes.post("/login", function (req, res, next) {
  req.session.regenerate(function (err) {
    if (err) next(err);

    UserModel.findOne({ email: req.body.email }, async function (err, user) {
      //  isMatch= await bcrypt.compare( password: req.body.password)

      if (err) console.log(err);

      if (user) {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res.redirect("/login");
        }
        //passowrd need to check
        req.session.user = user;
        req.session.save(function (err) {
          if (err) return next(err);
          res.redirect("/");
        });
      } else {
        res.redirect("/login");
      }
    });
  });
});

routes.get("/logout", function (req, res, next) {
  if (req.session) {
    // delete session object
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.redirect("/login");
      }
    });
  }
});

routes.post("/addCart", authMiddleware, async (req, res) => {
  console.log(req.body);
  console.log(req.session.user);

  await CartModel.updateOne(
    { ...req.body, userId: req.session.user._id },
    { $inc: { quantity: 1 } },
    { upsert: true }
  );
  res.send("Success");
});

module.exports = routes;

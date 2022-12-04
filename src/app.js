require("dotenv").config();
const express = require("express");
const app = express();
const hbs = require("hbs");
const path = require("path");
const mongoose = require("mongoose");
const multer = require("multer");
const bodyParser = require("body-parser");
const session = require("express-session");
const expressValidator = require("express-validator");
const console = require("console");
const routes = require("./routes/admin.js");
const admin = require("./routes/main.js");
const config = require("./routes/config");
const flipkart = require("../src/models/index");
const nav = require("./models/nav.js");
const slider = require("./models/slider");
const passport = require("passport");
// const passport = require("./routes/passport.js")
mongoose.set('debug',true);
app.use(express.static("public"));

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// express session middleware/

app.use(
  session({
    secret: "keyboardcat",
    resave: false,
    // saveUninitialized: true,
    // cookie: { secure: true }
  })
);

function addUserToView(req, res, next) {
  console.log("aasdsad",req.session)
  res.view = function (viewName, data) {
    
    data = data ? { ...data, user: req.session?.user||null } : { user: req.session?.user||null };
    console.log("DATA",data);
    res.render(viewName,data);
  };

  next();
}

app.use(addUserToView);

//   express validator middleware/

// app.use(expressValidator({
//     errorFormatter: function(param, msg, value) {
//         var namespace = param.split('.')
//       , root = namespace.shift()
//        , formParam = root;

//       while(namespace.length) {
//     formParam += '[' + namespace.shift() + ']';

//       }

//      return {
//     param : formParam,
//     msg : msg,
//     value : value
// };
//     }
// }));

// file require
require("./routes/passport")(passport);

// passport middleware/
// app.use(passport.initialize());
// app.use(passport.session());

app.get("*", function (req, res, next) {
  console.log(res.locals.user, req.user);
  res.locals.cart = req.session.cart;
  res.locals.user = req.user || null;
  next();
});

// app.get("*", function (req, res, next) {
//   res.locals.cart = req.session.cart;
//   next();
// });

// / express mressage middleware/
app.use(require("connect-flash")());
app.use(function (req, res, next) {
  res.locals.messages = require("express-messages")(req, res);
  next();
});

app.set("view engine", "hbs");
app.set("views", "views");
hbs.registerPartials("views/partials");

app.use("", routes);
app.use("", admin);



mongoose.connect("mongodb://localhost/finalsite", () => {
  console.log("db connected");
});

app.listen(config.port, () => {
  console.log(`Server running at port ${config.port}`);
});

// flipkart.create([

// {
//         imageUrl:'/image/product-15.png',
//         name:    'Ear Birds',
//         brand:  '  Boat',
//         price:  '1999',
//         category:'Electronic',
//          description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//         },

//         {
//         imageUrl:'/image/product-16.png',
//          name:    'Smart Watch',
//          brand:  'LG',
//          price:  '8999',
//          category:'Electronic',
//          description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//          },

//         {
//             imageUrl:'/image/product-17.png',
//              name:    'Smart Watch',
//              brand:  'LG',
//              price:  '8999',
//              category:'Electronic',
//              description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//              },

//         {
//             imageUrl:'/image/product-18.png',
//              name:    'Smart Watch',
//              brand:  'LG',
//              price:  '8999',
//              category:'Electronic',
//              description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//              },

//     {
//           imageUrl:'/image/product-19.png',
//            name:    'Smart Watch',
//           brand:  'LG',
//           price:  '8999',
//           category:'Electronic',
//            description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//         },

//             {
//             imageUrl:'/image/product-20.png',
//             name:    'Smart Watch',
//               brand:  'LG',
//              price:  '8999',
//              category:'Electronic',
//               description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//              },

//                      {
//        imageUrl:'/image/product-21.png',
//              name:    'Smart Watch',
//              brand:  'LG',
//               price:  '8999',
//                category:'Electronic',
//                 description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//                },

//             {
//               imageUrl:'/image/product-22.png',
//                name:    'Smart Watch',
//                 brand:  'LG',
//                 price:  '8999',
//               category:'Electronic',
//                description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//             },

//            {
//                 imageUrl:'/image/product-23.png',
//                 name:    'Smart Watch',
//                brand:  'LG',
//                price:  '8999',
//                category:'Electronic',
//              description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//            },

//            {
//              imageUrl:'/image/product-24.png',
//             name:    'Smart Watch',
//              brand:  'LG',
//               price:  '8999',
//               category:'Electronic',
//                  description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//            },
//           {
//                     imageUrl:'/image/product-25.png',
//                      name:    'Smart Watch',
//                       brand:  'LG',
//                        price:  '8999',
//                       category:'Electronic',
//                      description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//                    },

//               {
//                       imageUrl:'/image/product-26.png',
//                       name:    'Smart Watch',
//                      brand:  'LG',
//                      price:  '8999',
//                     category:'Electronic',
//                     description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//                                   },

//                        {
//                   imageUrl:'/image/product-27.png',
//                      name:    'Smart Watch',
//                     brand:  'LG',
//                      price:  '8999',
//                      category:'Electronic',
//                     description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//                                                  },

//                {
//                          imageUrl:'/image/product-15.png',
//                          name:    'Smart Watch',
//                        brand:  'LG',
//                       price:  '8999',
//                   category:'Electronic',
//                     description:'Infinix INBook X2 Plus Core i5 11th Gen - (8 GB/512 GB SSD/Windows 11 Home) XL25 Thin and Light Laptop  (15.6 Inch, Blue, 1.58 Kg)'

//                                                      },

// ])

// nav.create([

//     {
//         imageUrl:"/image/product-10.png",
//         Url: "/category/offer",
//         label:"offer"
//     },

//     {
//         imageUrl:"/image/product-2.png",
//         Url: "/category/electronic",
//         label:"electronic"
//     },

//     {
//         imageUrl:"/image/product-3.png",
//         Url: "/category/appliance",
//         label:"applialne"
//     },

//   {
//         imageUrl:"/image/product-1.png",
//         Url: "/category/mobile",
//         label:"mobile"
//     },

//     {
//         imageUrl:"/image/product-5.png",
//         Url: "/category/beauty",
//         label:"beauty"
//     },

//     {
//         imageUrl:"/image/product-6.png",
//         Url: "/category/furniture",
//         label:"furniture"
//     },

//     {
//         imageUrl:"/image/product-7.png",
//         Url: "/category/fk",
//         label:"FK&Orginials"
//     },
//     {
//         imageUrl:"/image/product-8.png",
//         Url:"/category/Flight",
//         label:"Flight&Hotels"
//     },

//     {
//         imageUrl:"/image/product-5.png",
//         Url: "/category/fashion",
//         label:"fashion"
//     },

//     {
//         imageUrl:"/image/product-9.png",
//         Url: "/category/grocery",
//         label:"grocery"
//     }

// ])

// slider.create([
//     {
//         imageUrl:"/image/product-11.png"
//     },
//     {
//         imageUrl:"/image/product-30.png"
//     },
//     {
//         imageUrl:"/image/product-32.png"
//     }
// ])

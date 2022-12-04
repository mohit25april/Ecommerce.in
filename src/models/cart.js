const mongoose = require("mongoose");
const { Schema } = mongoose;
const cartSchema = mongoose.Schema(
  {
    productId: Schema.Types.ObjectId,
    userId: Schema.Types.ObjectId,
    quantity: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
const model = mongoose.model("cart", cartSchema);
module.exports = model;

//  model.create({
//      productId:"63504483cbe0dc0b2cce62f7",
//      userId:"63538b33065a9f3b807caece",
//      quantity:1,
//  }).then(console.log)

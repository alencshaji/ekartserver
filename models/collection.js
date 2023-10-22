// Import mongoose
const mongoose = require('mongoose');

// Define schema-fields and values of the admin model (structure)
const adminSchema = new mongoose.Schema({
    uname: String,
    psw: String,
});
const admin = mongoose.model("admin", adminSchema);

// Define schema-fields and values of the product model (structure)
const productSchema = new mongoose.Schema({
    pname: String,
    category: String,
    price:Number,
    image:String

});
const product = mongoose.model("product", productSchema);

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    psw:String
})
const user = mongoose.model("user", userSchema);


const cartSchema = new mongoose.Schema({
    userId:String,
    pId:String,
    pname:String,
    category:String,
    price:String,
    image:String,
    quantity:Number,
    totalPrice:Number,
})
const cart = mongoose.model("cart",cartSchema)


const wishlistSchema= new mongoose.Schema({
    userId:String,
    pId:String,
    pname:String,
    category:String,
    price:String,
    image:String,
})
const wishlist = mongoose.model("wishlist",wishlistSchema)

// Export the admin and product models
module.exports = { admin, product,user,cart,wishlist };

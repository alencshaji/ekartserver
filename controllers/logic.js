const { admin, product, user, cart, wishlist } = require('../models/collection')

const login = (req, res) => {
    const { uname, psw } = req.body
    admin.findOne({ uname, psw }).then(ad => {
        if (ad) {
            res.status(200).json({
                message: "Login succesfully",
                status: true,
                statusCode: 200,
            })
        } else {
            res.status(404).json({
                message: "Incorrect data",
                status: false,
                statusCode: 404
            })
        }
    })
}
const addProduct = (req, res) => {
    const { pname, category, price, image } = req.body
    const newProduct = new product({
        pname, category, price, image
    })
    newProduct.save()
    res.status(200).json({
        message: "new product added",
        status: true,
        statusCode: 200
    })
}
const getProducts = (req, res) => {
    product.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }
    })
}

const getProduct = (req, res) => {
    const { id } = req.params
    product.findOne({ _id: id }).then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        } else {
            res.status(404).json({
                message: "No data",
                status: false,
                statusCode: 404
            })
        }
    })
}


const editProduct = (req, res) => {
    const { id } = req.params
    const { pname, category, price, image } = req.body
    product.findOne({ _id: id }).then(pdata => {
        if (pdata) {
            pdata.pname = pname
            pdata.category = category
            pdata.price = price
            pdata.image = image

            pdata.save()
            res.status(200).json({
                message: "product updated",
                status: true,
                statusCode: 200
            })

        }
    })
}
const deleteProduct = (req, res) => {
    const { id } = req.params
    product.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "product deleted",
            status: true,
            statusCode: 200
        })
    })
}
const getUsers = (req, res) => {
    user.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200
            })
        }
    })
}
const userSignup = (req, res) => {
    const { username, email, psw } = req.body
    user.findOne({ email }).then(ur => {
        if (ur) {
            res.status(404).json({
                message: "Already a member",
                status: false,
                statusCode: 404
            })
        } else {
            let newUser = new user({
                username, email, psw
            })
            newUser.save()
            res.status(201).json({
                message: "Registred Succesfully",
                status: true,
                statusCode: 201
            })
        }
    })
}

const userLogin = async (req, res) => {
    const { email, psw } = req.body;

    try {
        const ur = await user.findOne({ email });

        if (ur) {
            // Compare the provided password with the stored password
            if (ur.psw === psw) {
                res.status(200).json({
                    message: "Login successfully",
                    status: true,
                    statusCode: 200,
                    _id: ur._id
                });
            } else {
                res.status(404).json({
                    message: "Incorrect password",
                    status: false,
                    statusCode: 404
                });
            }
        } else {
            res.status(404).json({
                message: "User not found",
                status: false,
                statusCode: 404
            });
        }
    } catch (error) {
        console.error('Error in userLogin:', error);
        res.status(500).json({
            message: "Internal server error",
            status: false,
            statusCode: 500
        });
    }
};


const addCart = (req, res) => {
    const { userId, pId } = req.body
    cart.findOne({ userId, pId }).then(data => {
        if (data) {
            data.quantity += 1
            data.totalPrice = data.quantity * data.price
            data.save()
            res.status(200).json({
                message: "Prodct added to cart",
                status: true,
                statusCode: 200,
            })

        } else {
            product.findOne({ _id: pId }).then(pdct => {
                if (pdct) {
                    newCart = new cart({
                        userId,
                        pId,
                        pname: pdct.pname,
                        category: pdct.category,
                        price: pdct.price,
                        image: pdct.image,
                        quantity: 1,
                        totalPrice: pdct.price
                    })
                    newCart.save()
                    res.status(200).json({
                        message: "Prodct added to cart",
                        status: true,
                        statusCode: 200,
                    })
                }
            })
        }
    })

}

const cartCount = (req, res) => {
    const { userId } = req.params
    cart.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products.length,
                status: true,
                statusCode: 200,

            })
        }
    })
}

const cartItem = (req, res) => {
    const { userId } = req.params
    cart.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                status: true,
                statusCode: 200,
            })
        }
    })

}
const wishListItem = (req, res) => {
    const { userId } = req.params
    wishlist.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                status: true,
                statusCode: 200,
            })
        }
    })

}
const qtyAdd = (req,res)=>{
    const {_id} =req.params
    cart.findOne({_id}).then(data=>{
        if(data){
            data.quantity += 1
            data.save()
            res.status(200).json({
                message: data.quantity,
                status: true,
                statusCode: 200,
            })

        }
    })
}
const qtyDecrease = (req,res)=>{
    const {_id} =req.params
    cart.findOne({_id}).then(data=>{
        if(data){
            if(data.quantity>1){
                data.quantity -= 1
                data.save()
                res.status(200).json({
                    message: data.quantity,
                    status: true,
                    statusCode: 200,
                })
            }else{
                res.status(404).json({
                    message: "Removed from cart",
                    status: true,
                    statusCode: 404,
                })
            }
            

        }
    })
}
const removecart=(req,res)=>{
    const {_id} = req.params
    cart.deleteOne({_id}).then(data=>{
        res.status(200).json({
            message: "removed from cart",
            status: true,
            statusCode: 200,
        })
    })
}


const wishlistAdd = (req, res) => {
    const { userId, pId } = req.body
    wishlist.findOne({ userId, pId }).then(data => {
        if (data) {
            res.status(400).json({
                message: "Prodct added already",
                status: true,
                statusCode: 200,
            })

        } else {
            product.findOne({ _id: pId }).then(pdct => {
                if (pdct) {
                    newWishlist = new wishlist({
                        userId,
                        pId,
                        pname: pdct.pname,
                        category: pdct.category,
                        price: pdct.price,
                        image: pdct.image,
                    })
                    newWishlist.save()
                    res.status(200).json({
                        message: "Prodct added",
                        status: true,
                        statusCode: 200,
                    })
                }
            })
        }
    })

}
const removewishlistItem=(req,res)=>{
    const {_id} = req.params
    wishlist.deleteOne({_id}).then(data=>{
        res.status(200).json({
            message: "removed from wishlist",
            status: true,
            statusCode: 200,
        })
    })
}
const deleteUser=(req,res)=>{
    const {_id} = req.params
    user.deleteOne({_id}).then(data=>{
        cart.deleteMany({userId:_id}).then(data=>{
            wishlist.deleteMany({userId:_id}).then(data=>{
                res.status(200).json({
                    message: "Deleted User",
                    status: true,
                    statusCode: 200,
                })
            })
        })
       
    })
}




module.exports = {
    login, addProduct, getProducts,
    editProduct, deleteProduct, getProduct,
    userSignup, cartCount, userLogin, addCart, cartItem,
    qtyAdd,qtyDecrease,removecart,wishlistAdd,wishListItem,removewishlistItem,
    getUsers,deleteUser
}
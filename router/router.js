const {login,addProduct, getProducts, editProduct,
    cartCount, deleteProduct, getProduct,userSignup,
    userLogin,addCart,cartItem,qtyAdd,qtyDecrease,removecart,wishlistAdd,
    wishListItem,removewishlistItem,getUsers,deleteUser} = require ('../controllers/logic')

const express = require('express')
const { wishlist } = require('../models/collection')
const router = new express.Router()

router.post('/admin/login',login)
router.post('/admin/addProduct',addProduct)
router.get('/admin/getProduct',getProducts)
router.get('/admin/getOneProduct/:id',getProduct)
router.put('/admin/editProduct/:id',editProduct)
router.delete('/admin/deleteProduct/:id',deleteProduct)
router.post('/new-user',userSignup)
router.post('/user-login',userLogin)
router.post('/addtocart',addCart)
router.post('/addtowishlist',wishlistAdd)
router.get('/addtocart/count/:userId',cartCount)
router.get('/cart/cartitems/:userId',cartItem)
router.get('/wishlistitems/:userId',wishListItem)
router.get('/cart/cartqtyadd/:_id',qtyAdd)
router.get('/cart/cartqtydec/:_id',qtyDecrease)
router.delete('/cart/removecart/:_id',removecart)
router.delete('/wishlistitemremove/:_id',removewishlistItem)
router.get('/admin/userMng',getUsers)
router.delete('/user/delete/:_id',deleteUser)






module.exports=router
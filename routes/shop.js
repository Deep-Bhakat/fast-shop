const express=require('express');
const router=express.Router();
//const path=require('path');

const shopController=require('../controllers/shop');
const isAuth=require('../middleware/is-auth');

//const adminData=require('./admin');
// router.get('/',(req,res,next)=>{
//     //   console.log("in another middle ware");
//   //  console.log(adminData.product);

//   const products=adminData.product;
//        //in the last middleware u need to send a response

//       //handlebars cannot run any logic
//        res.render('shop',{prods:products,docTitle:'Shop',hasProducts:products.length>0,
//       activeShop:'true',
//       path:'/',
//       pageTitle:'Shop'});

//    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
//    });
   
//using controllers

router.get('/',shopController.getIndex);
router.get('/products',shopController.getProducts);
router.get('/products/:id',shopController.getProductDetails);

router.post('/cart',isAuth,shopController.postCart);

router.get('/cart',isAuth,shopController.getCart);

router.post('/cart-delete-item',isAuth,shopController.postCartDeleteProduct);
//router.post('/create-order', isAuth,shopController.postOrder);

router.get('/orders',isAuth,shopController.getOrders);

router.get('/orders/:orderId',isAuth,shopController.getInvoice);

router.get('/checkout',isAuth,shopController.getCheckout);

router.get('/checkout/success',isAuth,shopController.getCheckoutSuccess);
router.get('/checkout/cancel',isAuth,shopController.getCheckout);

   module.exports=router;
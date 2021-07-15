const express=require('express');

const router=express.Router();
const path=require('path');
const adminController=require('../controllers/admin');
const isAuth=require('../middleware/is-auth');
//validation
const { check }=require('express-validator/check');


// router.get('/add-product',(req,res,next)=>{
// //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
// res.render('add-product',{activeProduct:'true',pageTitle:"Add Product",productCss:true,path:'/admin/add-product'});

// });


// router.post('/add-product',(req,res,next)=>{
//     product.push({title: req.body.title});
//    // console.log(res.body);
    
//     res.redirect('/');
// });

//using controllers
router.get('/add-product',isAuth,adminController.getAddProduct);
router.get('/edit-product/:proId',isAuth,adminController.getEditProduct);
router.post('/edit-product',[
    check('title').isAlphanumeric('en-US', {ignore: ' '})
    .withMessage('Title Should Not Contain Special Characters!')
    .isLength({min:3})
    .withMessage('Title Should Not Be Atleast 3 Characters Long!')
    .trim(),
   // check('imageUrl').isURL().withMessage('Image Url Should Be a Url!'),
    check('description').isLength({min:8,max:300})
    .withMessage('Description Should Be Alteast 8 Characters Long and Maximum 400 Characters Long!')
    .trim(),
    check('price').isFloat().withMessage('Price Should Be A Decimal Value!'),
    ],isAuth,adminController.postEditProduct);

router.post('/add-product',[
    check('title').isAlphanumeric('en-US', {ignore: ' '})
    .withMessage('Title Should Not Contain Special Characters!')
    .isLength({min:3})
    .withMessage('Title Should Not Be Atleast 3 Characters Long!')
    .trim(),
    // check('imageUrl').isURL().withMessage('Image Url Should Be a Url!'),
    check('description').isLength({min:8,max:300})
    .withMessage('Description Should Be Alteast 8 Characters Long and Maximum 400 Characters Long!')
    .trim(),
    check('price').isFloat().withMessage('Price Should Be A Decimal Value!'),
    ],
isAuth,adminController.postAddProduct);
router.get('/products',isAuth,adminController.getProducts);
// router.post('/delete-product',isAuth,adminController.postDeleteProduct);
//for async requests 
router.delete('/product/:productId',isAuth,adminController.deleteProduct);

// exports.routes=router;
// exports.product=product; 
module.exports=router;


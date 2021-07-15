
//  const Products = require('../models/product');

// exports.getAddProduct=(req,res,next)=>{
//     //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
//     res.render('admin/add-product',{
//       edit:false,activeProduct:'true',pageTitle:"Add Product",productCss:true,path:'/admin/add-product'});

//     };
//   //const product=[];

//   exports.getEditProduct=(req,res,next)=>{
//     //res.sendFile(path.join(__dirname,'../','views','add-product.html'));

//     const proId=req.params.proId;
//     const editMode=req.query.edit;
//     if(!editMode)
//       return res.redirect('/');

//       //using mysql
//     // Products.findById(proId,product=>{
//     //   if(!product){
//     //     return res.redirect('/');
//     //   }
//     //   res.render('admin/edit-product',{
//     //     activeProduct:'true',
//     //     product:product,
//     //     pageTitle:"Edit Product",
//     //     productCss:true,
//     //     edit:editMode,
//     //     path:'/admin/edit-product'});

//     // });
//     //using sequelize
//     req.user.getProducts({where:{
//       id:proId
//     }})
//   //  Products.findByPk(proId)
//     .then(products =>{
//       const product=products[0];
//       if(!product){
//            return res.redirect('/');
//       }
//       res.render('admin/edit-product',{
//             activeProduct:'true',
//             product:product,
//             pageTitle:"Edit Product",
//             productCss:true,
//             edit:editMode,
//             path:'/admin/edit-product'});

//     })
//     .catch(err => console.log(err));



//     };
//     exports.postEditProduct=(req,res,next)=>{
//       const proid=req.body.proId;
//       const title=req.body.title;
//       const imageUrl=req.body.imageUrl;
//       const desc=req.body.description;
//       const price=req.body.price;

//       //using mysql
//       //const updatedProduct=new Product(proid,title,imageUrl,desc,price);
//       //updatedProduct.save();
//       //res.redirect('/admin/products');

//       //using sequelize
//       Products.findByPk(proid)
//       .then(product =>{
//         product.title=title;
//         product.imageUrl=imageUrl;
//         product.description=desc;
//         product.price=price;
//         return product.save();
//       })
//       .then(result =>{
//       res.redirect('/admin/products'); 
//       })
//       .catch(err => console.log(err));

//     };


//  exports.postAddProduct=(req,res,next)=>{
//       //  product.push({title: req.body.title});
//        // console.log(res.body);
//        const title=req.body.title;
//        const imageUrl=req.body.imageUrl;
//        const price=req.body.price;
//        const description=req.body.description;
//   // using mysql
//       //  const pro=new Product(null,title,imageUrl,description,price);
//       //  pro.save()
//       //  .then(()=>{
//     //      res.redirect('/');

//      //   })
//      //   .catch(err => console.log(err));

//     //using sequelize
//     req.user.createProduct({
//       title:title,
//       description: description,
//       price:price,
//       imageUrl:imageUrl,
//     })

//     .then(result =>{
//       res.redirect('/');
//     })
//     .catch(err => console.log(err));

//     };

//     exports.getProducts=(req,res,next)=>{
//         //  product.push({title: req.body.title});
//          // console.log(res.body);

//          //using mysql
//         //  Product.fetchAll((products)=>{
//         //     res.render('admin/products',{prods:products,
//         //     hasProducts:products.length>0,
//         //     path:'/admin/products',
//         //     pageTitle:'Admin Products'});
//         //   });

// //using sequelize
// req.user.getProducts()
// //Products.findAll()
// .then(products=>{
//   res.render('admin/products',{prods:products,
//     hasProducts:products.length>0,
//     path:'/admin/products',
//     pageTitle:'Admin Products'});

// })
// .catch(err => console.log(err));


//         };

//         exports.postDeleteProduct=(req,res,next)=>{
//           const proId=req.body.proId;
//          //using mysql
//           // Product.deleteById(proId);
//          // res.redirect('/admin/products');

//          // using sequelize
//          Products.findByPk(proId)
//          .then(product =>{
//            return product.destroy();
//          })
//          .then(result =>{
//          res.redirect('/admin/products'); 
//          })
//          .catch(err => console.log(err));
//            };

//using mongodb-------------------------------------------------------
// const Products = require('../models/product');
// const mongoDb=require('mongodb');
// const ObjectId=mongoDb.ObjectId;

// exports.getAddProduct = (req, res, next) => {
//   //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
//   res.render('admin/add-product', {
//     edit: false, activeProduct: 'true', pageTitle: "Add Product", productCss: true, path: '/admin/add-product'
//   });

// };


// exports.postAddProduct = (req, res, next) => {
//   const title = req.body.title;
//   const imageUrl = req.body.imageUrl;
//   const price = req.body.price;
//   const description = req.body.description;
//   const userId=req.user._id;
//   const product = new Products(title, price, description, imageUrl,null,userId);
  
//   product
//     .save()
//     .then(result => {
//       res.redirect('/admin/products');
//     })
//     .catch(err => console.log(err));
// };

// exports.getProducts = (req, res, next) => {

//   Products.fetchAll()
//     .then(products => {
//       res.render('admin/products', {
//         prods: products,
//         hasProducts: products.length > 0,
//         path: '/admin/products',
//         pageTitle: 'Admin Products'
//       });

//     })
//     .catch(err => console.log(err));


// };

//   exports.getEditProduct=(req,res,next)=>{

//     const proId=req.params.proId;
//     const editMode=req.query.edit;
//     if(!editMode)
//       return res.redirect('/');

     
//     Products.findById(proId)
//     .then(product =>{
//       if(!product){
//            return res.redirect('/');
//       }
//       res.render('admin/edit-product',{
//             activeProduct:'true',
//             product:product,
//             pageTitle:"Edit Product",
//             productCss:true,
//             edit:editMode,
//             path:'/admin/edit-product'});

//     })
//     .catch(err => console.log(err));



//     };
//     exports.postEditProduct=(req,res,next)=>{
//       const proid=req.body.proId;
//       const title=req.body.title;
//       const imageUrl=req.body.imageUrl;
//       const desc=req.body.description;
//       const price=req.body.price;

    
//         const product = new Products(title,price,desc,imageUrl,proid);
//       product.save()  
//       .then(result =>{
//       res.redirect('/admin/products'); 
//       })
//       .catch(err => console.log(err));

//     };

//     exports.postDeleteProduct=(req,res,next)=>{
//                 const proId=req.body.proId;
              
//                Products.deleteById(proId)              
//                .then(() =>{
//                res.redirect('/admin/products'); 
//                })
//                .catch(err => console.log(err));
//                  };
      

//using mongoose
const Products = require('../models/product');
//for validating
const { validationResult }=require('express-validator/check');
//for deleting files
const fileHelper=require('../util/file');
//items per page
const ITEMS_PER_PAGE=10;
exports.getAddProduct = (req, res, next) => {
  //res.sendFile(path.join(__dirname,'../','views','add-product.html'));
  
  //route protection
  if(!req.session.isLoggedIn){
    return res.redirect('/login');
  }
  res.render('admin/add-product', {
    edit: false, activeProduct: 'true', pageTitle: "Add Product",
     productCss: true, path: '/admin/add-product',
     errorMessage:null,
     oldData:{
       title:'',
     //  imageUrl:'',
       description:'',
       price:''
     },
     validationErrors:[]
  });

};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  //const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const userId=req.user._id;
  const image = req.file;
  const errors=validationResult(req);

  //console.log(image);
  if(!image){
    return res.status(422).render('admin/add-product', {
      edit: false, 
      activeProduct: 'true', 
      pageTitle: "Add Product",
       productCss: true, 
       path: '/admin/add-product',
       errorMessage:'Attached File Is Not An Image',
       oldData:{
         title:title,
         //imageUrl:imageUrl,
         description:description,
         price:price
       },
       validationErrors:[]
    }); 
  }


    if(!errors.isEmpty()){
      return res.status(422).render('admin/add-product', {
        edit: false, 
        activeProduct: 'true', 
        pageTitle: "Add Product",
         productCss: true, 
         path: '/admin/add-product',
         errorMessage:errors.array()[0].msg,
         oldData:{
           title:title,
          // imageUrl:imageUrl,
           description:description,
           price:price
         },
         validationErrors:errors.array()
      });
    }
    
    const imageUrl= image.path;

  const product = new Products({
    title:title,
    price:price,
    description:description,
    imageUrl:imageUrl,
    userId:userId
    //userId:req.user //mongoose only takes the _id

  });
  
  product
    .save()
    .then(result => {
      res.redirect('/admin/products');
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
//authorization

const page=+req.query.page || 1;
  let totalItems;
  Products.find({userId:req.user._id})
    .countDocuments()
    .then(numProducts=>{
      totalItems=numProducts;
      return Products.find({userId:req.user._id})
      //to skip items for pagination
        .skip((page-1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })  
    .then(products => {
      res.render('admin/products', {
        prods: products,
        hasProducts: products.length > 0,
        path: '/admin/products',
        pageTitle: 'Admin Products',
        currentPage:page,
        hasNextPage: ITEMS_PER_PAGE * page < totalItems,
        hasPreviousPage: page > 1,
        nextPage: page + 1,
        previousPage: page - 1,
        lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE)

      });
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
//  Products.find({userId:req.user._id})
  // this only gives the said data
 // .select('title price')
  //this fetches the user data from user model
  //.populate('userId')
    //.then(products => {
    //  res.render('admin/products', {
      //   prods: products,
      //   hasProducts: products.length > 0,
      //   path: '/admin/products',
      //   pageTitle: 'Admin Products',
      // });

  //  })

   

};

  exports.getEditProduct=(req,res,next)=>{

    const proId=req.params.proId;
    const editMode=req.query.edit;
    if(!editMode)
      return res.redirect('/');

     
    Products.findById(proId)
    .then(product =>{
      if(!product){
           return res.redirect('/');
      }
      res.render('admin/edit-product',{
            activeProduct:'true',
            pageTitle:"Edit Product",
            productCss:true,
            edit:editMode,
            errorMessage:null,
            oldData:{
              title:product.title,
              imageUrl:product.imageUrl,
              description:product.description,
              price:product.price,
              id:product._id
            },
            validationErrors:[],
            path:'/admin/edit-product'});

    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });


    };
    exports.postEditProduct=(req,res,next)=>{
      const proid=req.body.proId;
      const title=req.body.title;
      //const imageUrl=req.body.imageUrl;
      const desc=req.body.description;
      const price=req.body.price;
      const imageUrl=req.file;

      const errors=validationResult(req);
       
    if(!errors.isEmpty()){
      return res.status(422).render('admin/edit-product', {
        edit: false, 
        activeProduct: 'true', 
        pageTitle: "Edit Product",
         productCss: true, 
         path: '/admin/edit-product',
         errorMessage:errors.array()[0].msg,
         oldData:{
           title:title,
           //imageUrl:imageUrl,
           description:desc,
           price:price,
           id:proid

         },
         validationErrors:errors.array()
      });
    }

     Products.findById(proid).then(product=>{
      if(product.userId.toString() !==req.user._id.toString()){
        return res.redirect('/');
      }
      product.title=title;
      product.price=price;
      product.description=desc;
      if(imageUrl){
        fileHelper.deleteFile(product.imageUrl);
        product.imageUrl=imageUrl.path;

      }
      return product.save()
      .then(result =>{
        res.redirect('/admin/products'); 
        }); 
     })       
     .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode=500;
      return next(error);
    });
    };

    // exports.postDeleteProduct=(req,res,next)=>{
    //             const proId=req.body.proId;
             
    //             Products.findById(proId)
    //             .then(product =>{
    //               if(!product){
    //                 return next(new Error('No Product Found!'));
    //               }
    //               fileHelper.deleteFile(product.imageUrl);
    //             return Products.deleteOne({_id:proId,userId:req.user._id})  

    //             })
    //              //  Products.findByIdAndRemove(proId)              
    //            .then(() =>{
    //               res.redirect('/admin/products'); 
    //               })
    //               .catch(err => {
    //                console.log(err);
    //                const error = new Error(err);
    //                error.httpStatusCode=500;
    //                return next(error);
    //              });
                
    //                          };
      
    exports.deleteProduct=(req,res,next)=>{
      const proId=req.params.productId;
   
      Products.findById(proId)
      .then(product =>{
        if(!product){
          return next(new Error('No Product Found!'));
        }
        fileHelper.deleteFile(product.imageUrl);
      return Products.deleteOne({_id:proId,userId:req.user._id})  

      })
       //  Products.findByIdAndRemove(proId)              
     .then(() =>{
       //for async requests
        res.status(200).json({
          message: 'Success!'
        });
        //res.redirect('/admin/products'); 
        })
        .catch(err => {
          res.status(500).json({message : "Delete Failed!"});
       });
      
                   };

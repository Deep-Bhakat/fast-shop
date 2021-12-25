// const Product=require('../models/product');
// const Cart=require('../models/cart');

// exports.getProducts=(req,res,next)=>{
//     //   console.log("in another middle ware");
//   //  console.log(adminData.product);

// //   const products=adminData.product;
//        //in the last middleware u need to send a response

//       //handlebars cannot run any logic

//       //normally with local storage
//   // const pro=Product.fetchAll();

//   //      res.render('shop',{prods:pro,docTitle:'Shop',hasProducts:pro.length>0,
//   //     activeShop:'true',
//   //     path:'/',
//   //     pageTitle:'Shop'});

// //with mysql
// // Product.fetchAll()
// // .then(([rows,fetchData]) => {
// //   res.render('shop/product-list',{prods:rows,
// //     hasProducts:rows.length>0,
// //     activeShop:'true',
// //     path:'/products',
// //     pageTitle:'Shop'});

// // })
// // .catch(err => console.log(err));
//     //using sequelize

//     Product.findAll()
//     .then(products=>{
//       res.render('shop/index',{prods:products,
//          hasProducts:products.length>0,
//             activeShop:'true',
//             path:'/',
//             pageTitle:'Shop'});

//     })
//     .catch(err => console.log(err));


//    // res.sendFile(path.join(__dirname,'../','views','shop.html'));
//    };
//    exports.getProductDetails=(req,res,next)=>{
//     const proId=req.params.id;  
//     //using mysql
//     // Product.findById(proId)
//     // .then(([rows])=>{
//     //   //we use rows[0] because rows in an array of object but our view expects only object
//     //  // console.log(rows);
//     //   res.render('shop/product-detail',{
//     //     product:rows[0],
//     //     path:'/products',
//     //     pageTitle:rows[0].title});

//     // })
//     // .catch(err => console.log(err));

//     //using sequelize

//     // Product.findAll({
//     //   where : {id:proId}
//     // })
//     // .then(products=>{
//     //   res.render('shop/product-detail',{
//     //      product:products[0],
//     //              path:'/products',
//     //         pageTitle:products[0].title});

//     // })
//     // .catch(err => console.log(err));

//     //OR
//  Product.findByPk(proId)
//     .then(product=>{
//       res.render('shop/product-detail',{
//         product:product,
//         path:'/products',
//         pageTitle:product.title});

//     })
//     .catch(err => console.log(err));

// };
//    exports.getIndex=(req,res,next)=>{
//      //using mysql
//     // Product.fetchAll()
//     // .then(([rows,fieldData])=>{
//     //   res.render('shop/index',{prods:rows,
//     //     hasProducts:rows.length>0,
//     //     activeShop:'true',
//     //     path:'/',
//     //     pageTitle:'Shop'});
//     // })
//     // .catch(err => console.log(err)); 

//     //using sequelize

//     Product.findAll()
//     .then(products=>{
//       res.render('shop/index',{prods:products,
//          hasProducts:products.length>0,
//             activeShop:'true',
//             path:'/',
//             pageTitle:'Shop'});

//     })
//     .catch(err => console.log(err));

//    };


//    exports.getCart=(req,res,next)=>{

//     //  Cart.getCart(cart=>{
//     //    Product.fetchAll(products=>{
//     //      const cartProds=[];
//     //      for(prod of products){
//     //        const cartProductData=cart.products.find(prods=>prods.id===prod.id);
//     //        if(cartProductData){
//     //         cartProds.push({productData:prod,qty:cartProductData.qty});
//     //        }
//     //      }

//     //     res.render('shop/cart',{
//     //       products:cartProds,
//     //       path:'/cart',
//     //       pageTitle:'Your Cart'});

//     //    });

//     //  });

//       //using sequelize
//       req.user.getCart()
//       .then(cart =>{
//         return cart.getProducts()
//         .then(products =>{
//         res.render('shop/cart',{
//           products:products,
//           path:'/cart',
//           pageTitle:'Your Cart'});
//         })
//         .catch(err => console.log(err));
//       })
//       .catch(err => console.log(err));

//    };

//    exports.postCart=(req,res,next)=>{
//      const proId=req.body.productId;
//       let fetchedCart;
//       let newQ=1;

//      //  Product.findById(proId,(product)=>{
//     //    Cart.addProduct(proId,product.price);

//       // });

//       //using sequelize
//       req.user.getCart()
//       .then(cart =>{
//         fetchedCart=cart;
//         return cart.getProducts({where :{id:proId}});
//       })
//       .then(products =>{
//         let product;
//         if(products.length>0){
//           product=products[0];          
//         }
//         if(product){
//           const oldQ=product.cartItem.quantity;
//           newQ=oldQ+1;
//           return product;
//         }
//         return Product.findByPk(proId);
//       }).then(product =>{
//         return fetchedCart.
//         addProduct(product,
//           {through : {quantity : newQ}
//         });
//       })
//       .then(() =>{
//         res.redirect('/cart');
//       })
//       .catch(err =>console.log(err));

// };
//   exports.postCartDeleteProduct= (req,res,next)=>{
//     const prodId=req.body.proId;
//    // Product.findById(prodId,product=>{
//   //    Cart.deleteProduct(prodId,product.price); 
//      //res.redirect('/cart');
//   //  });
//     req.user.getCart()
//     .then((cart)=>{
//       return cart.getProducts({where:{id:prodId}})
//     })
//     .then((products)=>{
//       const product=products[0];
//      return product.cartItem.destroy();
//     })
//     .then(result =>{
//         res.redirect('/cart');

//     })
//     .catch(err => console.log(err));

//   };

//   exports.postOrder=(req,res,next)=>{
//     let fetchedCart;
//     req.user.getCart()
//     .then(cart=>{
//       fetchedCart=cart;
//       return cart.getProducts();
//     })
//     .then(products =>{
//         return req.user.createOrder()
//         .then(order =>{
//           return order.addProducts(
//             products.map(product=>{
//             product.orderItem={quantity: product.cartItem.quantity};
//             return product;
//           })
//           );
//         })
//         .catch(err => console.log(err));
//       })
//       .then(result =>{
//         return fetchedCart.setProducts(null);
//       })
//       .then(result =>{
//         res.redirect('/orders');
//       })
//     .catch(err => console.log(err));
// };



//    exports.getOrders=(req,res,next)=>{
//      req.user.getOrders({include:['products']})
//      .then(orders =>{
//      //  console.log(orders);
//       res.render('shop/orders',{
//         path:'/orders',
//         pageTitle:'Your Orders',
//       orders:orders});

//      })
//      .catch(err => console.log(err));

// };
//    exports.getCheckout=(req,res,next)=>{
//         res.render('shop/checkout',{
//         path:'/checkout',
//         pageTitle:'Checkout'});

//    };


// //using mongodb
// const Product=require('../models/product');
// const Cart=require('../models/cart');


// exports.getProducts=(req,res,next)=>{
// Product.fetchAll()
// .then(products =>{
//   res.render('shop/product-list',{
//     prods:products,
//     pageTitle:"All Products",
//     path:'/products'
//   });
// })
// .catch(err => console.log(err));

// };

// exports.getIndex=(req,res,next)=>{
//   Product.fetchAll()
//   .then(products =>{
//     res.render('shop/index',{
//       prods:products,
//       pageTitle:"Shop",
//       path:'/'
//     });
//   })
//   .catch(err => console.log(err));

//   };

//   exports.getProductDetails=(req,res,next)=>{
//     const proId=req.params.id;

//     Product.findById(proId)
//     .then(product =>{
//       res.render('shop/product-detail',{
//             product:product,
//             path:'/products',
//             pageTitle:product.title});

//       }).catch(err => console.log(err));
//   };

//   exports.postCart=(req,res,next)=>{
//          const proId=req.body.productId;
//          Product.findById(proId)
//          .then(product =>{
//            return req.user.addToCart(product);
//          })
//          .then(result =>{
//            console.log(result);
//            res.redirect('/cart');
//          })
//          .catch(err => console.log(err));


//     };


//    exports.getCart=(req,res,next)=>{

//       req.user.getCart()
//         .then(products =>{
//         res.render('shop/cart',{
//           products:products,
//           path:'/cart',
//           pageTitle:'Your Cart'});
//         })
//         .catch(err => console.log(err));

//    };

//   exports.postCartDeleteProduct= (req,res,next)=>{
//     const prodId=req.body.proId;

//     req.user.deleteItemFromCart(prodId) 
//     .then(result =>{
//         res.redirect('/cart');
//     })
//     .catch(err => console.log(err));

//   };


//   exports.postOrder=(req,res,next)=>{
//     req.user.addOrder()    
//       .then(result =>{
//         res.redirect('/orders');
//       })
//     .catch(err => console.log(err));
// };

// exports.getOrders=(req,res,next)=>{
//        req.user.getOrders()
//        .then(orders =>{
//         res.render('shop/orders',{
//           path:'/orders',
//           pageTitle:'Your Orders',
//         orders:orders});

//        })
//        .catch(err => console.log(err));

//   };

//for mongoose

const Product = require('../models/product');
const Order = require('../models/order');
const fs = require('fs');
const path = require('path');
//for payment
// const stripe=require('stripe')('sk_test_51JAyAnSBe2ieYIb74MehclbNQuXZJ9g2vzRaGppzgR4RMNan0qX2VBJQFCf0yYpIJnpP6k3dOELzPqNdJIizp8F700H5M89NFn');
const stripe=require('stripe')('sk_test_51JAyAnSBe2ieYIb74MehclbNQuXZJ9g2vzRaGppzgR4RMNan0qX2VBJQFCf0yYpIJnpP6k3dOELzPqNdJIizp8F700H5M89NFn');

//items per page
const ITEMS_PER_PAGE=8;
//for generating pdf
const PDFDocument = require('pdfkit')
exports.getProducts = (req, res, next) => {
  const page=+req.query.page || 1;
  let totalItems;
    Product.find()
    .countDocuments()
    .then(numProducts=>{
      totalItems=numProducts;
      return Product.find()
      //to skip items for pagination
        .skip((page-1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })  
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: "Shop",
        path: '/',
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
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getIndex = (req, res, next) => {

  const page=+req.query.page || 1;
  let totalItems;
    Product.find()
    .countDocuments()
    .then(numProducts=>{
      totalItems=numProducts;
      return Product.find()
      //to skip items for pagination
        .skip((page-1) * ITEMS_PER_PAGE)
        .limit(ITEMS_PER_PAGE);
    })  
    .then(products => {
      res.render('shop/index', {
        prods: products,
        pageTitle: "Shop",
        path: '/',
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
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProductDetails = (req, res, next) => {
  const proId = req.params.id;
  // findById accepts a string and converts it to objectId
  Product.findById(proId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        path: '/products',
        pageTitle: product.title,
        isLoggedIn: req.session.isLoggedIn
      });

    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCart = (req, res, next) => {
  const proId = req.body.productId;
  Product.findById(proId)
    .then(product => {
      return req.user.addToCart(product);
    })
    .then(result => {
      console.log(result);
      res.redirect('/cart');
    })

    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

};


exports.getCart = (req, res, next) => {

  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      res.render('shop/cart', {
        products: user.cart.items,
        path: '/cart',
        pageTitle: 'Your Cart',
        isLoggedIn: req.session.isLoggedIn
      });
    })

    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.proId;

  req.user.deleteFromCart(prodId)
    .then(result => {
      res.redirect('/cart');
    })

    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getCheckout=(req,res,next) =>{
  let products;
  let total=0;
   req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
       products=user.cart.items;
       total=0;
      products.forEach(p =>{
        total+= p.quantity * p.productId.price;
      });

      return stripe.checkout.sessions.create({
        payment_method_types:['card'],
        line_items:products.map(p=>{
          return {
            name:p.productId.title,
            description:p.productId.description,
            amount:p.productId.price * 100,
            currency: 'inr',
            quantity: p.quantity
          };
        }),
        success_url:req.protocol + '://' + req.get('host') + '/checkout/success' ,
        cancel_url:req.protocol + '://' + req.get('host') + '/checkout/cancel' ,
      });
    })
    .then(session =>{      
      res.render('shop/checkout', {
        products: products,
        path: '/checkout',
        pageTitle: 'CheckOut',
        totalSum:total,
        sessionId:session.id
      });
    })
    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
  };

  exports.getCheckoutSuccess = (req, res, next) => {

    req.user.populate('cart.items.productId')
      .execPopulate()
      .then(user => {
        const products = user.cart.items.map(i => {
          return { quantity: i.quantity, product: { ...i.productId._doc } };
        });
        const order = new Order({
          user: {
            name: req.user.name,
            email: req.user.email,
            userId: req.user
          },
          products: products
  
        });
        return order.save();
      }).then(result => {
        return req.user.clearCart();
      })
      .then(results2 => {
        res.redirect('/orders');
  
      })
  
      .catch(err => {
        console.log(err);
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  
  };
  

exports.postOrder = (req, res, next) => {

  req.user.populate('cart.items.productId')
    .execPopulate()
    .then(user => {
      const products = user.cart.items.map(i => {
        return { quantity: i.quantity, product: { ...i.productId._doc } };
      });
      const order = new Order({
        user: {
          name: req.user.name,
          email: req.user.email,
          userId: req.user
        },
        products: products

      });
      return order.save();
    }).then(result => {
      return req.user.clearCart();
    })
    .then(results2 => {
      res.redirect('/orders');

    })

    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });

};

exports.getOrders = (req, res, next) => {
  Order.find({ "user.userId": req.user._id })
    .then(orders => {
      res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders',
        orders: orders,
        isLoggedIn: req.session.isLoggedIn
      });
    })

    .catch(err => {
      console.log(err);
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getInvoice = (req, res, next) => {
  const orderId = req.params.orderId;

  Order.findById(orderId)
    .then(order => {
      if (!order) {
        return next(new Error('No Order Found!'));
      }
      if (order.user.userId.toString() !== req.user._id.toString()) {
        return next(new Error('Unauthorized!'));
      }

      const invoiceName = 'invoice-' + orderId + '.pdf';
      const invoicePath = path.join('data', 'invoices', invoiceName);
      //for creating pdf
      const pdfDoc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="' + invoiceName + '"');

      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      pdfDoc.pipe(res);

      // pdfDoc.text('Hello World');
      //for logo
      const logoPath = path.join('logo', 'logo.jpg');
      pdfDoc.image(logoPath, {
        fit: [50, 50],
        align: 'left',
        valign: 'top'
      });
      pdfDoc.fontSize(26).text('Invoice', {
        underline: true,
        align: 'center'
      });
      pdfDoc.text('---------------------------');
      let totalPrice=0;
      
      order.products.forEach(prod => {
        totalPrice+=prod.quantity*prod.product.price;
        pdfDoc.fontSize(16).text(prod.product.title 
          + ' - ' + 
          prod.quantity 
          + ' x ' 
          + 'Rs' +
           prod.product.price);
      });
      pdfDoc.text('---------------------------');

      pdfDoc.fontSize(20).text('Total Price: Rs'+totalPrice);
      pdfDoc.end();

      //readFile will read the whole file first
      //so if the file is too big it will take too much time
      //and memory may overflow
      //so you need to stream the file data
      // fs.readFile(invoicePath, (err,data)=>{
      //   if(err){
      //     return next(err);
      //   }
      //   res.setHeader('Content-Type','application/pdf');
      //   res.setHeader('Content-Disposition','attachment; filename="' + invoiceName + '"');
      //   res.send(data);
      // });

      //for streaming
      //const file= fs.createReadStream(invoicePath);
      //   res.setHeader('Content-Type','application/pdf');
      //   res.setHeader('Content-Disposition','attachment; filename="' + invoiceName + '"');
      //    file.pipe(res); 
    })
    .catch(err => next(err));

};
// const fs=require("fs");
// const path=require("path");
// const p=path.join(
//     path.dirname(
//         process.mainModule.filename),
//         'data',
//         'cart.json');

// module.exports= class Cart{
//     static addProduct(id,price){
//         //fetch the previous cart
//         fs.readFile(p,(err,fileContent)=>{
//             let cart={products:[],totalPrice:0};
// if(!err){
//     cart=JSON.parse(fileContent);
// }



//         // analyze the product
//         const existingIndex=cart.products.findIndex(prod=>prod.id=== id);
//         const existing=cart.products[existingIndex];
//         let updated;
//         if(existing){
//             updated={...existing};
//             updated.qty=updated.qty+1;
//             cart.products=[...cart.products];
//             cart.products[existingIndex]=updated;

//                     // add new product

//         }else{
//             updated={
//                 id:id,qty:1
//             };
//             cart.products=[...cart.products,updated];

//         }
//         cart.totalPrice=cart.totalPrice+ +price;
//         fs.writeFile(p,JSON.stringify(cart),err=>{
//             console.log(err);
//         });
//     });

//     }
//     static deleteProduct(id,price){
//         fs.readFile(p,(err,fileContent)=>{
//             if(err){
//                 return;
//             }
//             const updatedCart={...JSON.parse(fileContent)};
//            const product=updatedCart.products.find(p=>p.id===id);
//             if(!product){
//                 return;
//             }
//            const proQty=product.qty;
//            updatedCart.products=updatedCart.products.filter(p=>p.id!==id);
//            updatedCart.totalPrice= updatedCart.totalPrice- (price*proQty);
//            fs.writeFile(p,JSON.stringify(updatedCart),err=>{
//             console.log(err);
//         });
//         });
//     }

//     static getCart(cb){
//         fs.readFile(p,(err,fileContent)=>{
//             const cart=JSON.parse(fileContent);
//             if(err){
//                 cb(null);
//             }else{
//                 cb(cart);

//             }
//         });
//     }

// };

// using sequelize
// const Sequelize=require('sequelize');
// const sequelize=require('../util/database');

// const Cart=sequelize.define('cart',{
//     id: {
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
// });

// module.exports=Cart;


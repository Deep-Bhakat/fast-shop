// // const Sequelize=require('sequelize');

// // const sequelize=require('../util/database');

// // const User=sequelize.define('users',{
// //     id:{
// //         type:Sequelize.INTEGER,
// //         autoIncrement:true,
// //         allowNull:false,
// //         primaryKey:true
// //     },
// //     name:{
// //         type:Sequelize.STRING,
// //         allowNull:false
// //     },    
// //     email:{
// //         type:Sequelize.STRING,
// //         allowNull:false
// //     },
// // });

// // module.exports=User;

// const getDb=require('../util/database').getDb;
// const mongoDb=require('mongodb');

// class User{
//     constructor(username,email,cart,id){
//         this.name=username;
//         this.email=email;
//         this.cart=cart;
//         this._id=id;
//     }

//     save(){
//         const db=getDb();
//         return db.collection('users').insertOne(this)
//         .then(result =>{
//             console.log(result);
//         })
//         .catch(err => console.log(err));
//     }
//     addToCart(product){
//         const db=getDb();
//         //To update
//        const cartProductIndex= this.cart.items.findIndex(cp =>{
//            return cp.productId.toString() ===product._id.toString();
//       });
//       let newQ=1;
//       const updatedCartItems=[...this.cart.items];

//       if(cartProductIndex>=0){
//           newQ=this.cart.items[cartProductIndex].quantity+1;
//         updatedCartItems[cartProductIndex].quantity=newQ;
//         }else{
//             updatedCartItems.push({productId:new mongoDb.ObjectId(product._id),quantity:newQ});
  
//         }
//         //To add Product
//         const updatedCart={items : updatedCartItems};
//        return db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//         {$set :{cart:updatedCart}});
//     }

//     getCart(){
//         const db=getDb();
//         const productIds=this.cart.items.map(i =>{
//             return i.productId;
//         })
//         return db.collection('products')
//         .find({_id:{$in:productIds}})
//         .toArray()
//         .then(products =>{
//             //If all products in the cart no longer exist
//             if(products.length==0){
//                 db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//                 {$set :{cart:{items:[]}}});
//             //if some products in the cart no longer exist
//             }else if(products.length<productIds.length){
//                 const updatedItems=[];
//                 this.cart.items.forEach(item =>{
//                     const updateP= products.forEach(element => {
//                        if(element._id.toString() === item.productId.toString()){
//                         updatedItems.push(element);
//                        }
//                     });
                    
//                 });
//                 console.log('Updated Items');
//                 console.log(updatedItems);
//                 db.collection('users').updateOne({_id:new mongoDb.ObjectId(this._id)},
//                 {$set :{cart:{items:updatedItems}}});            
//             }
//             return products.map(p =>{
//                 return {
//                     ...p,
//                     quantity: this.cart.items.find(i =>{
//                         return i.productId.toString() === p._id.toString();
//                     }).quantity
//                 };
//             });
//         });
//     }

//     deleteItemFromCart(productId){
//         const updatedCartItems=this.cart.items.filter(item =>{
//             return item._id.toString() !== productId.toString();
//         });
//         const db=getDb();
//         return db
//         .collection('users')
//         .updateOne(
//         {_id:new mongoDb.ObjectId(this._id)},
//          {$set :{cart:{items:updatedCartItems}}}
//          );
//     }

//     addOrder(){
//         const db=getDb();
//         return this.getCart().then(products=>{
//             const order={
//                 items: products,
//                 user:{
//                     _id:new mongoDb.ObjectId(this._id),
//                     name:this.name,
//                 }
//             };
//             return db.collection('orders')
//             .insertOne(order);
//          })          
//         .then(result =>{
//             this.cart={items:[]};
//             return db
//             .collection('users')
//             .updateOne(
//             {_id:new mongoDb.ObjectId(this._id)},
//              {$set :{cart:{items:[]}}}
//              );
//         });
//     }

//     getOrders(){
//         const db=getDb();
//         return db.collection('orders')
//         .find({'user._id':new mongoDb.ObjectId(this._id)})
//         .toArray();
//     }

//     static findById(userId){
//         const db=getDb();
//         return db.collection('users')
//         .findOne({_id:new mongoDb.ObjectId(userId)});
        
//     }
// }

// module.exports=User;

const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const userSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    resetToken:String,
    resetTokenExpiration:Date,
    cart:{
        items:[
            {
            productId:
            {   type:Schema.Types.ObjectId,
                required:true,
                ref:'Product'
            },
            quantity:
            {type:Number,
                required:true}
            }
        ]        
    }
});

//to add methods
userSchema.methods.addToCart= function(product){
        //To update
       const cartProductIndex= this.cart.items.findIndex(cp =>{
           return cp.productId.toString() ===product._id.toString();
      });
      let newQ=1;
      const updatedCartItems=[...this.cart.items];

      if(cartProductIndex>=0){
          newQ=this.cart.items[cartProductIndex].quantity+1;
        updatedCartItems[cartProductIndex].quantity=newQ;
        }else{
            updatedCartItems.push({
                productId:product._id,
                quantity:newQ
            });
  
        }
        //To add Product
        const updatedCart={
            items : updatedCartItems
        };
        this.cart=updatedCart;
       return this.save();
};

userSchema.methods.deleteFromCart=function(productId){
    const updatedCartItems=this.cart.items.filter(item =>{
                    return item.productId.toString() !== productId.toString();
                });
            this.cart.items=updatedCartItems;
            return this.save();
};

userSchema.methods.clearCart=function(){
    this.cart={items:[]};
    return this.save();
}

module.exports=mongoose.model("User",userSchema);
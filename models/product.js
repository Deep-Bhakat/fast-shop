//static helps call the function without class object


//with local storing
// const products=[];
// module.exports=class Product{
//     constructor(t){
//         this.title=t;
//     }

//     save(){
//         products.push(this);
//     }

//     static fetchAll(){
//         return products;
//     }
// };

//with file storage

// const path=require('path');
// const fs=require('fs');
// const Cart=require('./cart');

// const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');

// const getProductsFromFile=cb=>{fs.readFile(p,(err,fileContent)=>{
//         if(err){
//             cb([]);
//         }else{
//             cb(JSON.parse(fileContent));
//         }
// });
// };

// module.exports=class Products{
//     constructor(id,title,imageUrl,description,price){
//         this.id=id;
//         this.title=title;
//         this.imageUrl=imageUrl;
//         this.description=description;
//         this.price=price;

//     }

//     save(){
//         const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');
//         getProductsFromFile(products=>{           
//             if(this.id){
//                 console.log('id:',this.id);
//                 const existingIndex=products.findIndex(prod=> prod.id===this.id);
//                 const updated=[...products];
//                 updated[existingIndex]=this;
//                 fs.writeFile(p,JSON.stringify(updated),(err)=>{
//                     console.log(err);
//                 });
//             }else{
//                 this.id=Math.random().toString();
            
//                 products.push(this);
//     fs.writeFile(p,JSON.stringify(products),(err)=>{
//         console.log(err);
//     });
    
//             }

         
//         });
        
//     }

//     static fetchAll(cb){
//         const p=path.join(path.dirname(process.mainModule.filename),'data','products.json');

//         fs.readFile(p,(err,fileContent)=>{
//                 if(err){
//                     cb([]);
//                 }else{
//                     cb(JSON.parse(fileContent));
//                 }
//         });
//     }

//     static findById(id,cb){
//         getProductsFromFile(products=>{
//             const product=products.find(p=> p.id===id);
//             cb(product);
//         });
//     }

//     static deleteById(id){
//         getProductsFromFile(products=>{
//             const product=products.find(p=>p.id===id);
//             const updatedProducts=products.filter(p=> p.id!==id);
//             fs.writeFile(p, JSON.stringify(updatedProducts),err=>{
//                 if(!err){
//                     Cart.deleteProduct(id,product.price);
//                 }
//             });
//         });
//     }

// };

// WITH MYSQL


// const db=require('../util/database');
// const Cart=require('./cart');


// module.exports=class Products{
//     constructor(id,title,imageUrl,description,price){
//         this.id=id;
//         this.title=title;
//         this.imageUrl=imageUrl;
//         this.description=description;
//         this.price=price;

//     }

//     save(){
//        return db.execute('INSERT INTO products (title,price,description,imageUrl) VALUES (?,?,?,?)',
//         [this.title,this.price,this.description,this.imageUrl]
//         );
//     }

//     static fetchAll(){
//           return  db.execute('SELECT * FROM products');
//     }

//     static findById(id){
//         return  db.execute('SELECT * FROM products WHERE id=?',[id]);

//     }

//     static deleteById(id){
//     }

// };


// WITH SEQUELIZE
// const Sequelize=require('sequelize');

// const sequelize=require('../util/database');

// const Product=sequelize.define('product',{
//     id: {
//         type : Sequelize.INTEGER,
//         autoIncrement : true,
//         allowNull : false,
//         primaryKey : true
//     },
//     title :{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     price :{
//         type: Sequelize.DOUBLE,
//         allowNull:false
//     },
//     description :{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
//     imageUrl :{
//         type: Sequelize.STRING,
//         allowNull:false
//     },
// });

// module.exports=Product;

// //for mongodb
// const mongoDb=require('mongoDb');
// const getDb=require('../util/database').getDb;
// class Product{
//     constructor(title,price,description,imageUrl,id,userId){
//         this.title=title;
//         this.description=description;
//         this.price=price;
//         this.imageUrl=imageUrl;
//         this.userId=userId;
        
//             this._id= id ? new mongoDb.ObjectId(id): null;
        
//     }

//     save(){
//         const db=getDb();
//             let dbOp;
//         if(this._id){
//             //Update the product
//                 dbOp=db.collection('products')
//                 .updateOne({_id:this._id}, {$set:this});
//         }else{
//             //insert
//             dbOp=  db.collection('products')
//              .insertOne(this);
            
//         }
//         return dbOp.then(result =>{
//             console.log(result);
//         })
//         .catch(err => console.log(err));
    
//        }

//     static fetchAll(){
//         const db=getDb();

//         return db.collection('products')
//         .find().toArray()
//         .then(products =>{
//             return products;
//         })
//         .catch(err => console.log(err));
//         //find doesnt return a promise but a cursor which is a object which allows to go through a document step by step
//     }
//     static findById(proid){
//         const db=getDb();
//         return db.collection('products')
//       //id will not work like this because in mongoDb collection it is stored like ObjectId
//      //   .find({_id:proid})
//      .find({_id:mongoDb.ObjectId(proid)})
//         .next()
//         .then(product =>{
//             return product;
//         })
//         .catch(err => console.log(err));
//     }

//     static deleteById(proid){
//         const db=getDb();
//         return db.collection('products')
//         .deleteOne({_id:new mongoDb.ObjectId(proid)})
//         .then(result=>{
//             console.log('Deleted');
//         })
//         .catch(err => console.log(err));
//     }

// }

// module.exports=Product;

//for mongoose
const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const productSchema=new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type: Number,
        required:true
    },    
    description:{
        type: String,
        required:true
    },    
    imageUrl:{
        type: String,
        //required:true
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

module.exports=mongoose.model("Product",productSchema);
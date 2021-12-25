
// using mysql
// const mysql=require('mysql2');

// const pool=mysql.createPool({
//     host:'localhost',
//     user:'root',
//     database:'nodejs',
//     password:'root'
// });

// module.exports=pool.promise();

// using sequelize
// const Sequelize=require('sequelize');

// const sequelize=new Sequelize('nodejs','root','root',
// {dialect: 'mysql',host: 'localhost'});

// module.exports=sequelize;


//using mongodb

// const mongodb= require("mongodb");
// const MongoClient=mongodb.MongoClient;
// let _db;

// const mongoConnect = (cb) =>{

//     MongoClient.connect("mongodb+srv://user:OSuxCfgpG2b5U47d@cluster0.hnbr0.mongodb.net/shop?retryWrites=true&w=majority")
//     .then(client =>{
//         _db=client.db();
//         console.log("Connected");
//         cb(client);
//     })
//     .catch(err =>{
//         console.log(err);
//         throw err;
//     });
// };

// const getDb =()=>{
//     if(_db){
//         return _db;
//     }
//     throw "No database Found";
// };
// exports.getDb=getDb;
// exports.mongoConnect=mongoConnect;
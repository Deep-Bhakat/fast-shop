//const http=require('http');
//for securing in production
const helmet=require('helmet');
const bodyParser = require('body-parser');
const express=require('express');
//as handlebars in not autoinstalled in express
//const Ehandlebars=require('express-handlebars');

const app=express();
// //for sequelize
// const sequelize=require('./util/database');
// const Product=require('./models/product');
// const User=require('./models/user');
 
// const Cart=require('./models/cart');
// const CartItem=require('./models/cart-item');
// const Order=require('./models/order');
// const OrderItem=require('./models/order-item');

//pug templates
//app.set('view engine','pug');

//handlebars -- defaultLayout should be false otherwise it will search main.handlebars
//app.engine('handlebars',Ehandlebars({layoutsDir:'views/layouts/' ,defaultLayout: 'main-layout',extname: 'handlebars' }));
//app.set('view engine','handlebars');

app.set('view engine','ejs');
app.set('views','views');
const path=require('path');
/*app.use((req,res,next)=>{
    console.log("in the middle ware");

    //u need to use next() to go to next middleware
    next();
});
*/

//for mongo db
//const mongoConnect=require('./util/database').mongoConnect;

//for mongoose
require('dotenv').config();
const mongoose=require("mongoose");
//for compressing assets
const compression=require('compression');
//for logging
const morgan=require('morgan');
//CSRF TOKEN
const csrf=require('csurf');
//for showing error msg
const flash=require('connect-flash');
const User=require('./models/user');
const fs=require('fs');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');
//for file upload
const multer=require('multer');
//for https
const https=require('https');

const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'images');
    },
    filename: (req, file, cb) => {
        const date=new Date;
      cb(null, date.getTime() + '-' + file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
//session
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);
// const store=new MongoDBStore({
//     uri:"mongodb+srv://user:HC7W3DzaRel4ylxq@cluster0.hnbr0.mongodb.net/shopMongoose?retryWrites=true&w=majority",
//     collection: 'sessions'
// });
//using environmental variables
//change the "" to `` 
const store=new MongoDBStore({
  uri:`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hnbr0.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`,
  collection: 'sessions'
});

const csrfProtection=csrf();
//for https
// const privateKey=fs.readFileSync('server.key');
// const certificate=fs.readFileSync('server.cert');
//for securing in production
// app.use(helmet());
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);
//for compressing assets
app.use(compression());
//for logging
const accessLogStream= fs.createWriteStream(
  path.join(__dirname, 'access.log'),
  {flags: 'a'}
  );
app.use(morgan('combined',{stream:accessLogStream}));

//bodyParser takes every data as text so image upload doesn't work
app.use(bodyParser.urlencoded({
    extended: false
}));
//for file upload

app.use(
  multer({storage:fileStorage, fileFilter:fileFilter})
     .single('image')
);
app.use(express.static(path.join(__dirname,'public')));
//for showing uploaded files
app.use('/images',express.static(path.join(__dirname,'images')));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized:false,
    store:store
}));
app.use(csrfProtection);
app.use(flash());
// tell express that we need this in every route
app.use((req,res,next)=>{
    res.locals.isLoggedIn=req.session.isLoggedIn;
    res.locals.csrfToken=req.csrfToken();
    next();
});

app.use((req,res,next)=>{
    if(!req.session.user){
       return next();
    }
    User.findById(req.session.user._id)
      .then(user =>{
          //error handling
          if(!user){
              return next();
         }
          req.user=user;
            next();
        })
        .catch(err => {
          next(new Error(err));

          });    
});


// app.use((req,res,next)=>{
    //for sequelize
    // User.findByPk(1)
    // .then(user =>{
    //     req.user=user; 
    //     next(); 
    // })
    // .catch(err => console.log(err));
    
    //for mongoDb
    //  User.findById("60d1de65024894606640a211")
    // .then(user =>{
    //     req.user=new User(user.name,user.email,user.cart,user._id); 
    //     next(); 
    // })
    // .catch(err => console.log(err));

    //for mongoose
    
    //  User.findById("60d9bc15c71eae13cc2c1b9e")
    // .then(user =>{
    //     req.user=user; 
    //     next(); 
    // })
    // .catch(err => console.log(err));

//  });
app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use((req,res,next)=>{
   // res.status(404).sendFile(path.join(__dirname,'views','404error.html'));
    res.status(404).render('404error',{pageTitle:'Page Not Found',path:'..'});

});
app.use('/500',(req,res,next)=>{
    res.status(500).
    render('500error',
    {pageTitle:'Something Went Wrong',
    path:'..',
    isLoggedIn:req.session.isLoggedIn});
 });
 
 app.use((error,req,res,next)=>{
     console.log(error);
    res.status(500).
    render('500error',
    {pageTitle:'Something Went Wrong',
    path:'..',
    isLoggedIn:false});

 })
//MYSQL
// db.execute("SELECT * FROM products")
// .then(result=>{
//     console.log(result[0]);
// })
// .catch(err=>{
//     console.log(err);
// });

// SEQUELIZE

//// checks all models and then creates tables
// Product.belongsTo(User,{
//     constraints:true,onDelete: 'CASCADE'
// });
// User.hasMany(Product);
// User.hasOne(Cart);
// Cart.belongsTo(User);
// Cart.belongsToMany(Product,{through:CartItem});
// Product.belongsToMany(Cart,{through:CartItem});
// Order.belongsTo(User);
// User.hasMany(Order);
// Order.belongsToMany(Product,{through: OrderItem});
// sequelize
// // .sync({force:true})
// .sync()
// .then(result =>{
//     return User.findByPk(1);
//    // console.log(result);

// }).then(user =>{
//     if(!user){
//         return User.create({name:'Deep',email:"deepbhakat234@gmail.com"});
//     }
//     return user;
// }).then(user =>{
//     return user.createCart();

// }).then(cart=>{
//     app.listen(3000);

// })
// .catch(err =>{
//     console.log(err);
// });


//const server=http.createServer(app);
//server.listen(3000);

//for mongodb
// mongoConnect(()=>{
//     //console.log(client);
     
//     app.listen(3000);
// });

//const port = process.env.PORT || 3000;
//for mongoose

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hnbr0.mongodb.net/${process.env.MONGO_DATABASE}?retryWrites=true&w=majority`)
.then(result =>{
    // User.findOne().then(user =>{
    //     if(!user){
    //         const user = new User({
    //             name:"Deep",
    //             email:"deepbhakat234@gmail.com",
    //             cart:{
    //                 items:[]
    //             }
    //             });
    //             user.save();
    //     }
    // });
    console.log("Connected");
    app.listen(process.env.PORT || 3000);
    // https.createServer({key: privateKey, cert:certificate},app)
    // .listen(process.env.PORT || 3000);
  }).catch(err => console.log(err)); 
//creating SSL on local
// PS C:\Users\Bisu\Desktop\NodeJs\ExpressJS> openssl req -nodes -new -x509 -keyout server.key -out server.cert
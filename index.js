require('dotenv').config();
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto  = require('crypto');
const jwt = require('jsonwebtoken');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const cookieParser = require('cookie-parser')





const productRouter = require('./router/Products');
const categoryRouter = require('./router/Category');
const brandRouter = require('./router/Brands');
const AuthRouter = require('./router/Auth')
const UserRouter = require('./router/Users')
const CartRouter = require('./router/Cart')
const OrderRouter = require('./router/Order');
const { User } = require('./model/User');
const { isAuth, sanitizeUser, cookieExtractor } = require('./services/common');
const path = require('path');





var opts = {}
opts.jwtFromRequest = cookieExtractor;
opts.secretOrKey = process.env.JWT_SECRET_KEY;


// Middle Ware
server.use(express.static(path.resolve(__dirname,'build')));
server.use(cookieParser());

server.use(session({
  secret: process.env.SEESION_KEY,
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  // store: new SQLiteStore({ db: 'sessions.db', dir: './var/db' })
}));

server.use(passport.authenticate('session'));
server.use(cors({
  exposedHeaders:['X-Total-Count']
}));
server.use(express.json());
server.use('/products',isAuth(),productRouter.router);
server.use('/categories',isAuth(),categoryRouter.router);
server.use('/brands',isAuth(),brandRouter.router);
server.use('/auth',AuthRouter.router)
server.use('/users',isAuth(),UserRouter.router)
server.use('/cart',isAuth(),CartRouter.router)
server.use('/orders',isAuth(),OrderRouter.router)

// passport strategies
passport.use('local',new LocalStrategy(  {usernameField:'email'},
 async function(email, password, done) {
    try {
      const user = await User.findOne({ email: email }).exec();
      if (!user) {
        // res.status(200).json({ message: "no such user email" });
        done(null,false,{message:"no such user email"});
      }

      crypto.pbkdf2(
        password,
        user.salt,  
        310000,
        32,
        "sha256",
        async function (err, hashedPassword) {
            if (!crypto.timingSafeEqual(user.password,hashedPassword)) {
              return done(null,false,{message:"invaild C"});
              
            } 
const token = jwt.sign(sanitizeUser(user),process.env.JWT_SECRET_KEY);

            done(null,{token});


        })
  
     
    } catch (err) {
      done(err);
    }
  }
));

passport.use('jwt',new JwtStrategy(opts,async function(jwt_payload, done) {
  console.log({jwt_payload});
  
  try {
    const user = await User.findById(jwt_payload.id);
    if (user) {
      return done(null, sanitizeUser(user));
  }
  else {
      return done(null, false);
      // or you could create a new account
  }
    
  } catch (err) {
    return done(err,false);
    
  }
    
      
}));


passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, {id:user.id,role:user.role});
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


// Payment


// This is your test secret API key.
// const stripe = require("stripe")(process.env.STRIPE_SERVER_KEY);




// server.post("/create-payment-intent", async (req, res) => {
//   const { totalAmount } = req.body;

//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: totalAmount*100,
//     currency: "inr",
//     // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
//     automatic_payment_methods: {
//       enabled: true,
//     },
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });






main().catch(err => console.log(err));



async function main() {
  await mongoose.connect(process.env.MONGODB_URL);
  console.log('data base connected');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

server.listen(process.env.PORT,()=>{
    console.log('server stared');
})
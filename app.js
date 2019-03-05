const express = require('express');
const hbs = require('express-handlebars')
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const passport = require('passport');

const app = express();
//initialize the express function.

//Load Routes
const ideas = require('./routes/ideas');
const users = require('./routes/users');

//Passport Config
require('./config/passport')(passport);

//Load DB config

const db = require('./config/database');

  
//Connect to Mongoose

mongoose.Promise = global.Promise;
mongoose.connect(db.mongoURI,{ useNewUrlParser: true }).then(()=>{
  console.log('MongoDB Connected')
}).catch(err=>{
  console.log(err)
});


app.engine('handlebars',hbs({defaultLayout:'main'}));
app.set('view engine','handlebars');

//Body Parser Middleware
  app.use(bodyparser.urlencoded({extended:false}));
  //Parse application JSON
  app.use(bodyparser.json());

//static folder
app.use(express.static(path.join(__dirname,'public')))

//METHOD OVERRIDE MIDDLEWARE
app.use(methodOverride('_method'));

//Express Sessions Middleware
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

app.use(passport.initialize());
app.use(passport.session());

//connect Flash
app.use(flash());

//Global Variables
app.use((req,res,next)=>{
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user ||null;
  next();


});


//setup the templating engine



//How middleware works

app.use((req,res,next)=>{
  //console.log(Date.now());
  req.name = 'Hari'
  next();
});

//HomePage Route
app.get('/',(req,res)=>{
  console.log(req.name)
  const title = 'Welcome'
  res.render('index',{title:title})
});

//About Route
app.get('/about',(req,res)=>{
  const title = 'About'
  res.render('about',{title:title})
})




//going to a webpage is a get request
//post requests are made to update a db or server usually used with a webform

//Use Routes

//Anythng that is /ideas/anything pertains to the ideas file
app.use('/ideas',ideas);
app.use('/users',users);

const port = process.env.PORT || 5000;

app.listen(port,()=>{
 console.log(`server started on port number ${port}`);
});

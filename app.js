const express = require('express');
const dotenv = require('dotenv');
const route = require('./routes/reg_route');
const auth_route = require('./routes/auth_route');
const DB = require('./dbconnection/connection');
const cookieParser = require('cookie-parser');
const {requireAuth} = require('./middleware/auth_middleware');
const app = new express();

// configuring dotenv file
dotenv.config({path: 'config.env'});
const port = process.env.PORT||5500;
const mongobd_url = process.env.MONGODB_URL||'';
const hostname = process.env.HOSTNAME|| '127.0.0.1';

// database connection
DB.DBconnection(app);
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());


// root page
app.get('/', (req, res) => {
    res.status(200).render('index', {title: 'welcome to POWA'});
})
app.get('/home',(req,res) => {
    
    res.redirect('/');
})
app.use('/user',auth_route);
app.use(requireAuth);
app.use('/student',route);




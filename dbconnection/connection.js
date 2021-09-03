const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({path: 'config.env'});
const port = process.env.PORT||5500;
const mongobd_url = process.env.MONGODB_URL||'';
const hostname = process.env.HOSTNAME|| '127.0.0.1';

module.exports.DBconnection = (app) => {
    mongoose.connect(mongobd_url,{
        useCreateIndex:true,
        useNewUrlParser:true,
        useUnifiedTopology:true,
    }).then((con) => {
        console.log('db connected');
        app.listen(port,() => {
            console.log(`app is listenning to http://${hostname}:${port}`);
        })
    }).catch((err) => {
        console.log(err);
    })

}
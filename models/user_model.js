const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');
const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required:[true, 'pls. enter email'],
        unique:true,
        lowercase:true,
        validate: [isEmail, 'Pls. enter valid email']
    },
    password: {
        type:String,
        required: [true,'pls. enter password'],
        minlength: [6,'minimum password is 6'],
    }
}, {timeStamp: true});
// mongoose hooks
// using pre function to hash password before saving to DB
userSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    
    next();
})

// creating static function
userSchema.statics.login = async function(email, password){
    const user = await this.findOne({ email });

    if(user){
        // return user;
        const auth = await bcrypt.compare(password, user.password);
        // return auth;
        if(auth){
            return user;
        }throw Error('incorrect password');

    }throw Error('incorrect email');
}

const user = mongoose.model('user',userSchema);

module.exports = user;
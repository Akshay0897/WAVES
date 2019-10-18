const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({

    email:{
        type:String,
        required:[true,'Email is necessary bruh..'],
        unique:true,
        lowercase:true,
        trim:true,
        validate:[validator.isEmail,'Please provide valid email Address']
    },

    password:{
        type: String,
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: true,
        validate:{
            validator:function(val) {
                var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
                return regularExpression.test(val);
            }
        }
    },

    confirmPassword:{
        type: String,
        required: [true, 'Please provide a password'],
        select: true,
        validate:{
            validator:function(val) {
               return this.password === val
            },
            message: 'Passwords are not the same!'
        }
    },

    name:{
        type:String,
        required:[true,'Email is necessary bruh..'],
        trim:true,
        maxlength:100
    },

    lastName:{
        type:String,
        required:false,
        default:'patel',
        trim:true,
        maxlength:100
    },

    cart:{
        type:Array,
        default:[]
    },

    history:{
        type:Array,
        default:[]
    },

    role:{
        type:Number,
        default:0
    },

    passwordChangedAt: Date
})

userSchema.pre('save',async function(next) {
    const user = this;
    if(!user.isModified('password')) return next();
        user.password = await bcrypt.hash(this.password,12);
        user.confirmPassword = undefined;
        next();
});

userSchema.pre('save',async function(next,docs) {
        console.log('docs are',docs)
        next();
});

userSchema.methods.isPasswordCorrect = async function(userPass, storedPass)
{
    return await bcrypt.compare(userPass, storedPass);
}

userSchema.methods.changedPasswordAfter = function(JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
          this.passwordChangedAt.getTime() / 1000,
          10
        );
        console.log(this.passwordChangedAt,JWTTimestamp)
        return JWTTimestamp < changedTimestamp;
      }
    console.log('hey')
    return false;
}

const User = mongoose.model('User',userSchema);

module.exports = User; 
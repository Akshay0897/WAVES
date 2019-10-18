const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

exports.admin = (req,res,next) => {

    if(req.user.role === 1 ) next();
    else{
    res.status(404).json({
        'message':`${req.user.name} dont have the necessary permission for this route please get out from here`
    })}
}

const sendToken = (User,status,res) => {

    const { id } = User;
    const token = jwt.sign( {id} , process.env.JWT_SECRET,{expiresIn : process.env.JWT_EXPIRES_IN });
    User.password = undefined;
  
    const cookieOptions = {
      expires: new Date(  
        Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
      ),
      httpOnly: true
    };
  
    if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  
    res.cookie('jwt', token, cookieOptions);
  
    res.status(200).send({
          'message':status,
           'data':{
              User
           },
           'token':token
      })
}
  
exports.logout = (req,res) => {
    res.cookie('jwt','loggedout',{expires:new Date(Date.now()+1000*1000), httpOnly:true });
    res.status(200).json({
      'message':'successfully logged out bro'
    })
}

exports.auth =  async (req,res,next) => {
    let token=null;
try {
    if(
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }
    else {
      if(req.cookies.jwt) token = req.cookies.jwt;
    }
    console.log('token is',token);

    if (!token) {
      res.status(401).json({
        'message':'You are not logged in! Please log in to get access.'
      })
    }
       // 2) Verification token
      const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
      const currentUser = await User.findById(decoded.id);
      
     if (!currentUser) {
      res.status(401).json({
        'message':'You are not logged in! Please log in to get access.'
      })
    }
  
    // 4) Check if user changed password after the token was issued
    const status = currentUser.changedPasswordAfter(decoded.iat);
    //console.log('status',status)
  
    if (status) {
      res.status(401).json({
        'message':'You have Changed the password.'
      })
    }
    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
  /* 
    res.status(200).json({
      'message':'success',
      'user':currentUser
    }) */
        
  } catch (error) {
    res.status(401).json({
        'message':'Please first log in to logout'
      })
    }
    next();
};
  
exports.register = async (req,res,next) => {
  
        const user = await User.create({
            name:req.body.name,
            password:req.body.password,
            email:req.body.email,
            confirmPassword:req.body.confirmPass,
            lastName:req.body.lastName,
            cart:req.body.cart,
            history:req.body.history,
            role:req.body.role
        });
      sendToken(user,200,res);
}

exports.login = async (req,res) => {
  
    const {email,password} = req.body;
      
      let result = null;
      // 1) Check if email and password exist
       if (!email || !password) {
        return next();
      }
    
      // 2) Check if user exists && password is correct
      const user = await User.findOne({ email }).select('+password');
      console.log(user);
      
      //check if password is correct or not
      if(user) { result = await user.isPasswordCorrect(user.password,password); }
      console.log('result is',result)
    
      if(!result) { sendToken(user,200,res); }
}
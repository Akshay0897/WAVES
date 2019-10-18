const dotenv = require('dotenv');
dotenv.config({path :'./config.env'});
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRouter = require('./routes/userRoutes');
const brandRouter = require('./routes/brandRouter');
const woodRouter = require('./routes/woodRouter');
const productRouter = require('./routes/productRouter');
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cookieParser());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

app.use('/api/users',userRouter);
app.use('/api/product/article',productRouter);
app.use('/api/product/brand',brandRouter);
app.use('/api/product/wood',woodRouter);

app.all('*', (req, res, next) => {
    res.status(404).send({
      'message':'no routes for this path bitch'
    })
});


module.exports = app;
  
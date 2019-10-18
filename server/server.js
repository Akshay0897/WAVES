const dotenv = require('dotenv');
dotenv.config({path :'./config.env'});

const app = require('./app');
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;

const port  = process.env.PORT || 3000;

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(process.env.DATABASE_LOCAL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => console.log('connection initiated sucessfully with mongodb'))
  .catch((err) => console.log('connection failed to mongodb',err));

app.listen(port,() => 
    console.log(`server is running at ${port}`));
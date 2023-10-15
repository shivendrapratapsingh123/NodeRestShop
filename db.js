const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const Connection = async() => {
  const URL = process.env.MONGO_URL;
  try{
     await mongoose.connect(URL,{useNewUrlParser:true});
     console.log('Database connected successfully');
  }
  catch(error){
     console.log("Error while connecting with the database",error);
  }
}

module.exports = Connection;
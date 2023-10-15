
const mongoose = require("mongoose");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.users_signup_user = (req,res,next) =>{
  User.find({email: req.body.email}).exec().then(user =>{
    if(user.length >= 1){
      return res.status(409).json({
        message: "Email address exits already"
      });
    }
    else{
      bcrypt.hash(req.body.password,10,(err,hash)=>{
        if(err){
         return res.status(500).json({
           error: err
         });
        }else{
         const user = new User({
           _id: new mongoose.Types.ObjectId(),
           email: req.body.email,
           password:hash
   });
   user.save().then(result =>{
     console.log(result);
     res.status(201).json({
       message: "User created successFully"
     })
   }).catch(err =>{
       console.log(err);
       res.status(500).json({
        message: "server error",
         error : err
       })
   })
 }
  });
    }
  });
   
}

exports.users_login_user = (req, res, next) => {
  User.find({ email: req.body.email }).exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }

      const user = users[0];

      // Verify the user's password
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }

        if (result) {
          // User authenticated, create a JWT
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id
            },
            process.env.SECRET_KEY, // Replace with your secret key
            {
              expiresIn: '1h' // Token expiration time
            }
          );

          return res.status(200).json({
            message: "Auth successful",
            token: token
          });
        } else {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        message: "Server error",
        error: err
      });
    });
}


exports.users_delete_user = (req,res,next) =>{
  User.deleteOne({_id: req.params.userId}).exec().then(result =>{
    if(result.deletedCount === 0){
      return res.status(404).json({
        message: "User does not Exits!"
      });
    }
    res.status(200).json({
      message: "User Deleted successfully"
    });
  }).catch(err =>{
    console.log(err);
    res.status(500).json({
      error: err
    });
  });
}
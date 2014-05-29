'use strict';

var users = global.nss.db.collection('users');
var bcrypt = require('bcrypt');
var Mongo = require('mongodb');

class User {
  static login(object,fn){    //the parameter is a function because we when are done it will call back
    users.findOne({email:object.email}, (e, u)=>{  //if it finds a user it will return one
      if(u){
        if(bcrypt.compareSync(object.password, u.password)) { //compare the password they just typed into the form and the password saved in the database
          fn(u);
        }else{
          fn(null);  //if the password doesn't match what's in the database for the user, it will return null
        }
      }else{
        fn(null); //send back the user
      }
    });
  }

  static findByUserId(userId, fn){   //it takes a userId and a callback function
    userId = Mongo.ObjectID(userId);   //takes it from a string and turn it into an object
    users.findOne({_id:userId}, (e, user)=>{   //find the user by his Id
      fn(user);
  });
}
}

module.exports = User;

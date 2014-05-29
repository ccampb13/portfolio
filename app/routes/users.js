'use strict';

var traceur = require('traceur');
var User = traceur.require(__dirname + '/../models/user.js');

exports.login = (req, res)=>{
  res.render('users/login', {title: 'chadcampbell.info/login'});
};

exports.authenticate = (req, res)=>{
  User.login(req.body, u=>{
    if(u){
      console.log('USER');
      console.log(u);
      req.session.userId = u._id;
      res.redirect('/project');
    }else{
      req.session.userId = null;
      res.redirect('/login');
    }
    console.log('USER');
    console.log(u);
  });
};

exports.lookup = (req, res, next)=>{ //next means he is handing it off
  User.findByUserId(req.session.userId, u=>{
    res.locals.user = u;
    next();
  });
};

exports.logout = (req, res)=>{
  req.session.userId = null;
  res.redirect('/');
};

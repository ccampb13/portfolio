'use strict';

var traceur = require('traceur');
var dbg = traceur.require(__dirname + '/route-debugger.js');
var initialized = false;

module.exports = (req, res, next)=>{
  if(!initialized){
    initialized = true;
    load(req.app, next);
  }else{
    next();
  }
};

function load(app, fn){
  var home = traceur.require(__dirname + '/../routes/home.js');
  var users = traceur.require(__dirname + '/../routes/users.js');
  var projects = traceur.require(__dirname + '/../routes/projects.js');

  app.all('*', dbg, users.lookup);
  app.get('/', dbg, home.index);
  app.get('/about', dbg, home.about);
  app.get('/contact', dbg, home.contact);
  app.get('/resume', dbg, home.resume);
  app.get('/login', dbg, users.login);
  app.post('/login', dbg, users.authenticate);
  app.get('/project', dbg, projects.index);
  app.get('/logout', dbg, users.logout);
  app.get('/project/new', dbg, projects.new);
  app.post('/project', dbg, projects.create);
  app.get('/project/show/:projectId/', dbg, projects.show);

  console.log('Routes Loaded');
  fn();
}

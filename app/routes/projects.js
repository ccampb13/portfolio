'use strict';

var multiparty = require('multiparty');
var traceur = require('traceur');
var projects = global.nss.db.collection('projects');
var Project = traceur.require(__dirname + '/../models/project.js');
// var fs = require('fs');
// var Mongo = require('mongodb');

exports.index = (req, res)=>{
  res.render('projects/index', {title: 'Projects: List'});
};

exports.new = (req, res)=>{
  res.render('projects/new', {title: 'Project: New'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();
  form.parse(req, (err, fields, files)=>{
    var project = {};
    project.title = fields.title[0];
    project.description = fields.description[0];
    project.tags = fields.tags[0].split(',').map(x=>x.trim());
    project.gitURL = fields.gitURL[0];
    project.appURL = fields.appURL[0];
    project.date = new Date(fields.date[0]);
    project.userId = req.session.userId;
    console.log(fields);

    // project.photos = [];
    // console.log(files);
    // files.photos.forEach(p=>{
    //   fs.mkdirSync(`${__dirname}/../static/img/${fields.title[0]}`);
    //   fs.renameSync(p.path, `${__dirname}/../static/img/${fields.title}/${p.originalFilename}`);
    //   project.photos.push(p.originalFilename);
    // console.log(fields);
    // console.log(files);
    //
    //
    // });

    var projectObject = new Project(project);
    console.log('----------OBJECT-----------------');
    console.log(projectObject);

    projects.save(project, ()=>res.redirect('/project'));

  });
};

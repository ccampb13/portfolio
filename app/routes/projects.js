'use strict';

var multiparty = require('multiparty');
var traceur = require('traceur');
var projects = global.nss.db.collection('projects');
var Project = traceur.require(__dirname + '/../models/project.js');
var fs = require('fs');
var Mongo = require('mongodb');

exports.index = (req, res)=>{
  Project.findAll(projects=>{
    res.render('projects/index', {projects: projects, title: 'Projects: List'});
  });
};

exports.new = (req, res)=>{
  res.render('projects/new', {title: 'Project: New'});
};

exports.create = (req, res)=>{
  var form = new multiparty.Form();
  var userId = req.session.userId;

  form.parse(req, (err, fields, files)=>{
    var project = {};
    project.title = fields.title[0].trim();
    project.description = fields.description[0].trim();
    project.tags = fields.tags[0].split(',').map(t=>t.toLowerCase()).map(x=>x.trim());
    project.gitURL = fields.gitURL[0].trim();
    project.appURL = fields.appURL[0].trim();
    project.date = new Date(fields.date[0]);
    project.userId = userId;
    console.log(fields);

    project.photos = [];
    console.log(files);
    var photoOrigPaths = [];
    files.photos.forEach(p=>{
      project.photos.push(`/img/${userId}/${project.title}/${p.originalFilename}`);
      photoOrigPaths.push(p.path);

      console.log(fields);
      console.log(files);
      console.log(p);

    });

     if(project.photos.length > 0){
      if(!fs.existsSync(`${__dirname}/../static/img/${userId}`)){
        fs.mkdirSync(`${__dirname}/../static/img/${userId}`);
        }
        if(!fs.existsSync(`${__dirname}/../static/img/${userId}/${project.title}`)){
        fs.mkdirSync(`${__dirname}/../static/img/${userId}/${project.title}`);
        }
        project.photos.forEach((path, i)=>{
        fs.renameSync(photoOrigPaths[i], `${__dirname}/../static/${path}`);
      });
    }



    var projectObject = new Project(project);
    console.log('----------OBJECT-----------------');
    console.log(projectObject);

    projects.save(project, ()=>res.redirect(`/project/show/${project._id}`));

  });
};

exports.show = (req,res)=>{
  var projectId = Mongo.ObjectID(req.params.projectId);
  Project.findById(projectId, project=>{
    console.log(project);
    res.render('projects/show', {project:project, title:`${project.title}`});
  });
};

exports.destroy = (req,res)=>{
    Project.deleted(req.params.projectId, ()=>res.redirect('/project'));

};

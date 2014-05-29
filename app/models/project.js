'use strict';

var projects = global.nss.db.collection('projects');
var Mongo = require('mongodb');

class Project {
  constructor(project){
    this.userId = project.userId;
    this.title = project.title;
    this.description = project.description;
    this.tags = project.tags;
    this.gitURL = project.gitURL;
    this.appURL = project.appURL;
    this.date = project.date;
    this.photos = project.photos;
  }
  save(fn){
    projects.save(this, ()=>{
      fn();
    });
  }

  static findById(projectId, fn){
    projects.findOne(projectId, (err, project)=>{
      fn(project);
    });
  }

  static deleted(projectId, fn){
    projectId = Mongo.ObjectID(projectId);
    projects.remove({_id:projectId}, fn);
  }

  static findAll(fn){
    projects.find().toArray((e,r)=>fn(r));
  }
}


module.exports = Project;

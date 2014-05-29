'use strict';

var projects = global.nss.db.collection('projects');

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
}


module.exports = Project;

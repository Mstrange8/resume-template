const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'projects.json'
);


const getProjectsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Projects {
    constructor(id, order, title, image, description) {
        this.id = id;
        this.order = order;
        this.title = title;
        this.image = image;
        this.description = description;
    }

    save() {
        getProjectsFromFile(projects => {
            if (this.id) {
                const existingProjectsIndex = projects.findIndex(project => project.id === this.id);
                const updatedProjects = [...projects];
                updatedProjects[existingProjectsIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProjects.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                projects.push(this);
                fs.writeFile(p, JSON.stringify(projects.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } 
        });
    }

    static deleteById(id) {
        getProjectsFromFile(projects => {
            const updatedProjects = projects.filter(proj => proj.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProjects.sort(function(first, second) {
                return first.order - second.order
            })), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProjectsFromFile(callback);
    }

    static findById(id, callback) {
        getProjectsFromFile(projects => {
            const project = projects.find(p => p.id === id);
            callback(project);
        });
    }

};
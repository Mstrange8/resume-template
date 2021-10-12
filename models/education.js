const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'education.json'
);


const getEducationFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Education {
    constructor(id, order, school, date, degree, description) {
        this.id = id;
        this.order = order;
        this.school = school;
        this.date = date;
        this.degree = degree;
        this.description = description;
    }

    save() {
        getEducationFromFile(education => {
            if (this.id) {
                const existingEducationIndex = education.findIndex(ed => ed.id === this.id);
                const updatedEducation = [...education];
                updatedEducation[existingEducationIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedEducation.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                education.push(this);
                fs.writeFile(p, JSON.stringify(education.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } 
        });
    }

    static deleteById(id) {
        getEducationFromFile(educations => {
            const updatedEducation = educations.filter(edu => edu.id !== id);
            fs.writeFile(p, JSON.stringify(updatedEducation.sort(function(first, second) {
                return first.order - second.order
            })), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getEducationFromFile(callback);
    }

    static findById(id, callback) {
        getEducationFromFile(educations => {
            const education = educations.find(p => p.id === id);
            callback(education);
        });
    }

};
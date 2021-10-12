const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'skills.json'
);

const getSkillsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Skills {
    constructor(skillNames, skillPercents) {
        this.skillNames = skillNames;
        this.skillPercents = skillPercents;
    }

    save() {
        getSkillsFromFile(Skills => {
            Skills = this;
            fs.writeFile(p, JSON.stringify(Skills), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getSkillsFromFile(callback);
    }
}
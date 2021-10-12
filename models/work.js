const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'work.json'
);


const getWorkFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Work {
    constructor(id, order, company, date, title, description) {
        this.id = id;
        this.order = order;
        this.company = company;
        this.date = date;
        this.title = title;
        this.description = description;
    }

    save() {
        getWorkFromFile(work => {
            if (this.id) {
                const existingWorkIndex = work.findIndex(wrk => wrk.id === this.id);
                const updatedWork = [...work];
                updatedWork[existingWorkIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedWork.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                work.push(this);
                fs.writeFile(p, JSON.stringify(work.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } 
        });
    }

    static deleteById(id) {
        getWorkFromFile(work => {
            const updatedWork = work.filter(wrk => wrk.id !== id);
            fs.writeFile(p, JSON.stringify(updatedWork.sort(function(first, second) {
                return first.order - second.order
            })), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getWorkFromFile(callback);
    }

    static findById(id, callback) {
        getWorkFromFile(wrk => {
            const work = wrk.find(p => p.id === id);
            callback(work);
        });
    }

};
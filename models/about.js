const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'about.json'
);

const getContentsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Contents {
    constructor(content1, content2) {
        this.content1 = content1;
        this.content2 = content2;
    }

    save() {
        getContentsFromFile(contents => {
            contents = this;
            fs.writeFile(p, JSON.stringify(contents), err => {
                console.log(err);
            });
        });
    }

    static fetchContents(callback) {
        getContentsFromFile(callback);
    }
}
const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'contact.json'
);

const getContactsFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Contact {
    constructor(quote, location, email, phone) {
        this.quote = quote;
        this.location = location;
        this.email = email;
        this.phone = phone;
    }

    save() {
        getContactsFromFile(contacts => {
            contacts = this;
            fs.writeFile(p, JSON.stringify(contacts), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getContactsFromFile(callback);
    }
}
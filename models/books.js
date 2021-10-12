const fs = require('fs');
const path = require('path');
const { exit } = require('process');

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'books.json'
);


const getBooksFromFile = (callback) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
    });
}

module.exports = class Books {
    constructor(id, order, title, author, description) {
        this.id = id;
        this.order = order;
        this.title = title;
        this.author = author;
        this.description = description;
    }

    save() {
        getBooksFromFile(book => {
            if (this.id) {
                const existingBooksIndex = book.findIndex(bk => bk.id === this.id);
                const updatedBooks = [...book];
                updatedBooks[existingBooksIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedBooks.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                book.push(this);
                fs.writeFile(p, JSON.stringify(book.sort(function(first, second) {
                    return first.order - second.order
                })), err => {
                    console.log(err);
                });
            } 
        });
    }

    static deleteById(id) {
        getBooksFromFile(books => {
            const updatedBooks = books.filter(bk => bk.id !== id);
            fs.writeFile(p, JSON.stringify(updatedBooks.sort(function(first, second) {
                return first.order - second.order
            })), err => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getBooksFromFile(callback);
    }

    static findById(id, callback) {
        getBooksFromFile(books => {
            const book = books.find(p => p.id === id);
            callback(book);
        });
    }

};
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const methodOverride = require('method-override');
const mongoConnect = require('./util/database').mongoConnect;

const app = express();

const initializePassport = require('./passport-config');

const users = [{"id":"01/13/2021", "name": "matthew", "email": "cameronjemry@gmail.com", "password": "Fuckyocouch55!"}];

initializePassport(
    passport, 
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
);

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(bodyParser.urlencoded(({extended: false})));
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash());
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(methodOverride('_method'));

const adminRoutes = require('./routes/admin');
const publicRoutes = require('./routes/public');

app.use(adminRoutes);
app.use(publicRoutes);

mongoConnect(() => {
    app.listen(process.env.PORT || 3000);
});
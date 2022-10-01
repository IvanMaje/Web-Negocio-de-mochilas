const express = require('express');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const expressLayouts = require('express-ejs-layouts');

const app = express();
require('./database');

//Settings
app.set('port', process.env.PORT || 6000);
app.set('views', path.join(__dirname, 'views'));

app.use(expressLayouts);
app.set('layout', './layouts/layout');
app.set('view engine', 'ejs');

//Middlewares


app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'mysecretkey',
    resave: false,
    saveUninitialized: false
}));
app.use(flash());



//Global variables
app.use((req, res, next) => {
    res.locals.succes_msg = (req.flash('succes_msg'));
    res.locals.error_msg = (req.flash('error_msg'));
    next();
})

//Routes
app.use(require('./routes/productos'));
app.use(require('./routes/pedido'));
app.use(require('./routes/admin'));


app.use(express.static(path.join(__dirname, 'public')));


app.listen(app.get('port'), () => {
    console.log('Listening');
});

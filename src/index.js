const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const Handlebars = require('handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const flash  = require('connect-flash');
const passport = require('passport');
require('dotenv').config();

// Initialization
const app = express();
require('./database');

// passport config
require('./config/passport')(passport);

// Settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    defaultLayout: 'main',
    layoutsDir:  path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(flash());
app.use(session({
    secret: 'mysecretap',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));
app.use('/auth', require('./helpers/auth'))

// Static Files
app.use(express.static(path.join(__dirname, 'public')));

// Server Listenning
app.listen(app.get('port'), () => {
console.log('Server on port', app.get('port'))
});

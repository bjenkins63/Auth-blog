const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 5000;

//parse application middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


//static files
app.use(express.static('public'));


//setup handlebars
app.engine('hbs', exphbs({extname: 'hbs' }));
app.set('view engine', 'hbs');

//router
app.get('/',(req, res) => {
    res.render('home')
});




app.listen(PORT, () => console.log (`listening on port: ${PORT}`));
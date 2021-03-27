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

//connection port
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//connect to db
pool.getConnection((err, connection) => {
    if(err) throw err; 
    console.log(`connected as ID ` + connection.threadId)
});


const routes = require('./server/routes/blog');
app.use('/', routes);


app.listen(PORT, () => console.log (`listening on port: ${PORT}`));
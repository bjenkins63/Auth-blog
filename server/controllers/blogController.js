const mysql = require('mysql2');

//connection port
const pool = mysql.createPool({
    connectionLimit : 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

//view Blogs
exports.view = (req, res) => {

pool.getConnection((err, connection) => {
    if(err) throw err; 
    console.log(`connected as ID ` + connection.threadId)

    //
    connection.query('SELECT * FROM blogs', (err, rows) => {
        //release after connection
        connection.release();

        if(!err) {
            res.render('home', { rows });
        } else {
            console.log(err);
        }

        console.log(`data from blog table: \n`, rows);
        });

    });
}

exports.form = (req, res) => {
    res.render('addBlog');
}

//add new blog
exports.create = (req, res) => {
    const { title, description } = req.body;

    pool.getConnection((err, connection) => {
        if(err) throw err; 
        res.render('/addBlog');

        // console.log(`connected as ID ` + connection.threadId);
    
        //create blog
        connection.query('INSERT INTO blog SET title = ?, description = ?',[title, description], (err, rows) => {
            //release after connection
            connection.release();
    
            if(!err) {
                res.render('addBlog');
            } else {
                console.log(err);
            }
    
            console.log('data from blog table', rows);
            });
    
        });
    }


    //add new blog
// exports.create = (req, res) => {
//     const { title, description } = req.body;

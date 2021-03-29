const express = require('express');
const exphbs = require('express-handlebars');
const fileUpload = require('express-fileupload');
const mysql = require('mysql2');
var fs = require('fs');

const app = express();
const port = process.env.PORT || 5000;

app.use(fileUpload());

app.use(express.static('public'));
app.use(express.static('upload'));

const hbs = exphbs.create({});


//handlebars setup
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(_dirname, 'public')));

app.use(require('./controllers/'));

//connect for image upload
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Bernie2020',
  database: 'BubsBlog'
});

//image upload 
pool.getConnection((err, connection) => {
  if (err) throw err; 
  console.log('Connected!');
});

// app.get('', (req, res) => {
//   pool.getConnection((err, connection) => {
//     if (err) throw err;
//     console.log('Connected!');

//     connection.query('SELECT * FROM blog', (err, rows) => {
//       connection.release();

//       if (!err) {
//         res.render('main');
//       }
//     });
//   });
// });

app.post('', (req, res) => {
  let sampleFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // name of the input is sampleFile
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/upload' + sampleFile.name;

  console.log(sampleFile);

  // Use mv() to place file on the server
  sampleFile.mv(uploadPath, function (err) {
    if (err) return res.status(500).send(err);

    pool.getConnection((err, connection) => {
      if (err) throw err;
      console.log('Connected!');

      connection.query('UPDATE user SET profile_image = ? WHERE id ="1"', [sampleFile.name], (err, rows) => {
        // Once done, release connection
        connection.release();

        if (!err) {
          res.redirect('/');
        } else {
          console.log(err);
        }

      });
    });

    res.send('File uploaded!');
  });
});


app.listen(port, () => console.log(`Listening on port ${port}`));
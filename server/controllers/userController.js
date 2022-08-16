const mysql = require('mysql');
const getDoc = require('../../disu');
// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DBName,
  // port: process.env.DB_PORT,
});

// View Users
exports.view = (req, res) => {
  connection.query('SELECT * FROM docs', (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
  });
}

// Find document by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  console.log(searchTerm)
  connection.query('SELECT * FROM docs WHERE title LIKE ? or body LIKE ? or assessment LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%', '%' + searchTerm + '%' ], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
  });
}

exports.form = (req, res) => {
  res.render('add-document');
}

// Add new document
exports.create = (req, res) => {
  const {title, body, assessment, date, url, domfor, dibOrDisu} = req.body;
  let searchTerm = req.body.search;
  connection.query('INSERT INTO docs SET title = ?, body = ?, assessment = ?, date = ?, url = ?, domfor = ?, DibOrDisu = ?', [title, body, assessment, date, url, domfor, dibOrDisu], (err, rows) => {
    if (!err) {
      res.render('add-document', { alert: 'Document added successfully.' });
    } else {
      console.log(err);
    }
    console.log( rows );
  });
}


// Edit user
exports.edit = (req, res) => {
  connection.query('SELECT * FROM docs WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-document', { rows });
    } else {
      console.log(err);
    }
    console.log( rows );
  });
}


// Update User
exports.update = (req, res) => {
  const { title, body, assessment, date, url, domfor, dibOrDisu } = req.body;
  connection.query('UPDATE docs SET title = ?, body = ?, assessment = ?, date = ?, url = ?, domfor = ?, DibOrDisu = ? WHERE id = ?', [title, body, assessment, date, url,domfor, dibOrDisu, req.params.id], (err, rows) => {

    if (!err) {
      connection.query('SELECT * FROM docs WHERE id = ?', [req.params.id], (err, rows) => {
        if (!err) {
          res.render('edit-document', { rows, alert: `${title} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from document table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log( rows );
  });
}

// Delete User
exports.delete = (req, res) => {
  connection.query('DELETE FROM docs WHERE id = ?', [req.params.id], (err, rows) => {
    if(!err) {
      res.redirect('/');
     } else {
     console.log(err);
    }
    console.log( rows );
   });
}

// View Users
exports.viewall = (req, res) => {
  connection.query('SELECT * FROM docs WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-document', { rows });
    } else {
      console.log(err);
    }
    console.log( rows );
  });
}

exports.downloadDisuAsWord =  (req, res) => {
  console.log(req.params.id);
  const filename =  getDoc(req.params.id, res);
  console.log('filename', filename)
  console.log(`Test ${filename} ${req.params.id}`);
}

exports.downloadDibAsWord =  (req, res) => {
  console.log(req.params.id);
  const filename =  getDoc(req.params.id, res);
  console.log('filename', filename)
  console.log(`Test ${filename} ${req.params.id}`);
}
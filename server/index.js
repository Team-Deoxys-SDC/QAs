const express = require("express");
const app = express();
const db = require("../database");

const PORT = 3000;

app.use('/', express.static(__dirname + '/../../frontend/dist'))
app.use(express.json())

//get questions data
app.get('/api/qa/questions/', (req, res) => {
  console.log(req.query)
  if(!req.query.count){
    req.query.count = '5';
  }
  if(!req.query.page){
    req.query.page = '1';
  }
  const {product_id, page, count} = req.query;
  db.query(
    'SELECT * FROM questions WHERE product_id=? AND reported=0 LIMIT ?',
    [product_id, Number(count)],
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }
      res.send(data);
    })
});

app.post('/api/groceries', (req, res) => {
  const { name, quantity, purchased } = req.body;
  db.query(
    'INSERT INTO groceries (name, quantity, purchased) VALUES (?, ?, ?) ',
    [name, quantity, purchased],
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }
      res.sendStatus(201);
    })
});

// app.delete('/api/groceries', (req, res) => {
//   db.query(
//     'DELETE FROM groceries WHERE id = ?',
//     [req.body.id],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         res.sendStatus(400);
//         return;
//       }
//       res.sendStatus(202);
//     })
// });

// app.put('/api/groceries', (req, res) => {
//   const { name, quantity, purchased, id } = req.body;
//   db.query(
//     ` UPDATE groceries
//       SET name = ?, quantity = ?, purchased = ?
//       WHERE id = ?` ,
//     [name, quantity, purchased, id],
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         res.sendStatus(500);
//         return;
//       }
//       res.sendStatus(202);
//     })
// });

// get answers
app.get('/api/qa/questions/:question_id/answers', (req, res) => {
  console.log(req.params);
  const {question_id} = req.params;
  if(!req.query.count){
    req.query.count = '5';
  }
  if(!req.query.page){
    req.query.page = '1';
  }

  const {page, count} = req.query;

  db.query(
    'SELECT * FROM answers WHERE question_id=? AND reported=0 LIMIT ?',
    [question_id, Number(count)],
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }
      res.send(data);
    })
});


app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on port: ${PORT}`)
  }
})
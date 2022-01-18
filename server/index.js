const express = require("express");
const app = express();
const db = require("../database");

const PORT = 3000;

app.use('/', express.static(__dirname + '/../../frontend/dist'))
app.use(express.json())

//get questions data
app.get('/api/qa/questions/', (req, res) => {
  let {product_id, page = 1, count = 5} = req.query;
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

//POST A NEW QUESTION
app.post('/api/qa/questions/', (req, res) => {
  const { body, name, email, product_id } = req.body;
  db.query(
    `INSERT INTO questions
    (body, name, email, product_id, reported, helpfulness)
    VALUES (?, ?, ?, ?, 0, 0)`,
    [body, name, email, product_id],
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }
      res.sendStatus(201);
    })
});


// QUESTION PUT REQUEST TO MARK AS HELPFUL OR REPORT
app.put('/api/qa/questions/:question_id/*', (req, res) => {
  const {question_id} = req.params;

  //get the endpoint from frontend request
  let endpoint = req.url.slice(19 + question_id.length);

  //change the endpoint depending on what it is
  endpoint = endpoint === 'report' ?
    'reported' : endpoint === 'helpful' ?
    'helpfulness' : false;

   // send bad status if endpoint is not valid
  if(!endpoint) {
    res.sendStatus(400);
    return;
  }

  db.query(
    `UPDATE questions
    SET ${endpoint} = ${endpoint} + 1
    WHERE id = ${Number(question_id)}`,
  (err, data) => {
    if(err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  })

});

// GET ALL ANSWERS FROM QUESTION_ID
app.get('/api/qa/questions/:question_id/answers', (req, res) => {
  const {question_id} = req.params;
  let {page = 1, count = 5} = req.query;

  //console.log(page, count, question_id);

  db.query(
    `SELECT * FROM answers WHERE question_id=? AND reported=0 LIMIT ?`,
    [question_id, Number(count)],
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }
      //res.send(data)
      data.forEach(ans => {
        db.query(`Select * from photos where answer_id=?`,[ans.id],
        (err, data2) => {
          if(err) {
            console.log(err);
            res.sendStatus(400);
            return;
          }
          //console.log(data);
          ans.photos =  data2;
          if(data[data.length - 1].photos){
            res.send(data);
          }
        })
      })
        // res.send(data)
    })
});

//POST A NEW ANSWER
app.post('/api/qa/questions/:question_id/answers', (req, res) => {
  const { body, name, email, photos = [] } = req.body;
  const {question_id} = req.params;
  db.query(
    `INSERT INTO answers
    (body, name, email, question_id, reported, helpfulness)
    VALUES (?, ?, ?, ?, 0, 0)`,
    [body, name, email, question_id],
    (err, data) => {
      if (err) {
        console.log(err);
        res.sendStatus(400);
        return;
      }
     photos.forEach(picURL => {
       db.query(
         'INSERT INTO photos (answer_id, url) VALUE (?, ?)',
         [data.insertId, picURL],
         (err, response) => {
           if(err) {
             console.log(err);
             res.sendStatus(400);
             return;
           }
           res.sendStatus(201);
         })
     })
    })
});

// ANSWERS PUT REQUEST TO MARK AS HELPFUL OR REPORT
app.put('/api/qa/answers/:answer_id/*', (req, res) => {
  const {answer_id} = req.params;

  //get the endpoint from frontend request
  let endpoint = req.url.slice(17 + answer_id.length);

  console.log(endpoint);
  //change the endpoint depending on what it is
  endpoint = endpoint === 'report' ?
    'reported' : endpoint === 'helpful' ?
    'helpfulness' : false;

    console.log(endpoint);
   // send bad status if endpoint is not valid
  if(!endpoint) {
    res.sendStatus(400);
    return;
  }

  db.query(
    `UPDATE answers
    SET ${endpoint} = ${endpoint} + 1
    WHERE id = ${Number(answer_id)}`,
  (err, data) => {
    if(err) {
      console.log(err);
      res.sendStatus(400);
    }
    res.sendStatus(201);
  })

});

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.log(`Listening on port: ${PORT}`)
  }
})
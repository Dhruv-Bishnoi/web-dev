import express from 'express'
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'college',
  password: "#Bishnoishab29",
});

const app = express()


app.get('/add', (req, res) => {

let q = "insert into  users(userID,username,email,passward) values ?"
    let data = ['123545','mo5hit','mohit@gmail.com','#mohitji@$','54321','sih5ag','sihag@gmail.com','#sihagaryan%$#@']

    try {
  const [result] =  connection.query("q, [data]");
  console.log("User inserted successfully!");
  console.log(result);
} catch (err) {
  console.log(err);
} finally {
  connection.end();
}

  res.send('Hello World')
})

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})
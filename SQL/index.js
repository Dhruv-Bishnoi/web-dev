
import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';
import express from 'express'
const app = express()



let createRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(),
    faker.internet.email(),
    faker.internet.password(), 
  ];
}

let data = [];

for( let i = 1;i<=100;i++){

  data.push(createRandomUser())

}



console.log(data)

app.get('/add',(req,res)=>{

  let q = "insert into  users(userID,username,email,passward) values ?"
  
  try {
    const [result] =  connection.query(q, [data]);
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
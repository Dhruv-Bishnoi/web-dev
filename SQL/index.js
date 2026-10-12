
import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'college',
  password: "#Bishnoishab29",
});


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

let q = "insert into  users(userID,username,email,passward) values ?"

try {
  const [result] = await connection.query(q, [data]);
  console.log("User inserted successfully!");
  console.log(result);
} catch (err) {
  console.log(err);
} finally {
  await connection.end();
}
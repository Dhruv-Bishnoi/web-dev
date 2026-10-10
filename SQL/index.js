
import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'college',
  password: "#Bishnoishab29",
});

let q = `
  INSERT INTO users (userID, username, email, passward)
  VALUES (?, ?, ?, ?)
`;

let user = [
  "id123",
  "dhruv",
  "dhruv@gmail.com",
  "myPassword123"
];

try {
  const [result] = await connection.execute(q, user);
  console.log("User inserted successfully!");
  console.log(result);
} catch (err) {
  console.log(err);
} finally {
  await connection.end();
}
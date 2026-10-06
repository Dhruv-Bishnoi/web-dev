import { faker } from '@faker-js/faker';
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'college',
  password: '#Bishnoishab29',
});

try {
  const [result] = await connection.query("SHOW TABLES");
  console.log(result);
} catch (err) {
  console.log(err);
}

let createRandomUser = () => {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    avatar: faker.image.avatar(),
    password: faker.internet.password(),
    birthdate: faker.date.birthdate(),
    registeredAt: faker.date.past(),
  };
};

console.log(createRandomUser());

await connection.end();
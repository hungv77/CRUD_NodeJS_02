import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from 'bluebird';

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  connection.query(
    ' INSERT INTO users (email, password, username) VALUES (?, ?, ?)', [email, hashPassword, username],
    function (err, results, fields) {
      if (err) {
        console.log(err);
      }
    }
  );
};

const getUserList = async() => {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'jwt',
    Promise: bluebird,
  });
  
  let users = [];
  // connection.query(
  //   'SELECT * from users',
  //   function (err, results, fields) {
  //     if (err) {
  //       console.log(err);
  //       return users;
  //     }
  //     users = results; //results là kết quả của phép SELECT
  //     console.log(">>> get users: ", users)
  //     return users;
  //   }
  // );

  const [rows, fields] = await connection.execute(
    'SELECT * from users',
  );

  return rows;
}

module.exports = {
  createNewUser, getUserList
}

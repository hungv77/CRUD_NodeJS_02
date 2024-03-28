import bcrypt from "bcryptjs";
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import db from "../models";

// create the connection, specify bluebird as Promise

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = (userPassword) => {
  let hashPassword = bcrypt.hashSync(userPassword, salt);
  return hashPassword;
};

const createNewUser = async (email, password, username) => {
  let hashPassword = hashUserPassword(password);

  try {
    await db.User.create({
      username: username,
      email: email,
      password: hashPassword,
    });
  } catch (error) {
    console.log(">>> help error: ", error);
  }
};

const getUserList = async () => {
  
  //test relationships 
  let newUser = await db.User.findOne({
    where: { id: 2},
    attributes: ["id", "username", "email"],
    include: {model: db.Group, attributes: ["name", "description"],},
    raw: true,
    nest: true
  })

  let r = await db.Role.findAll({
    include: { model: db.Group, where: {id: 1} },
    raw: true,
    nest: true
  })

  console.log(">>> check new users: ", newUser)
  console.log(">>> check new roles: ", r)



  let users = [];
  users = await db.User.findAll();
  return users;

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute("SELECT * from user");
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error from userService: ", error);
  // }
};

const deleteUser = async (userId) => {
  await db.User.destroy({
    where: { id: userId },
  });

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute
  //   ('DELETE FROM user WHERE id=?', [id]);
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error from userService: ", error);
  // }
};

const getUserById = async (id) => {
  let user = {};
  user = await db.User.findOne({
    where: { id: id },
  });
  return user.get({ plain: true });

  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute
  //   ('SELECT * FROM user WHERE id=?', [id]);
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error from userService: ", error);
  // }
};

const updateUserInfor = async (email, username, id) => {
  await db.User.update(
    { email: email, username: username },
    { where: { id: id,},}
  );
  
  // const connection = await mysql.createConnection({
  //   host: "localhost",
  //   user: "root",
  //   database: "jwt",
  //   Promise: bluebird,
  // });

  // try {
  //   const [rows, fields] = await connection.execute
  //   ('UPDATE user SET email = ?, username = ? WHERE id=?', [email, username, id]);
  //   return rows;
  // } catch (error) {
  //   console.log(">>> check error from userService: ", error);
  // }
};

module.exports = {
  createNewUser,
  getUserList,
  deleteUser,
  getUserById,
  updateUserInfor,
};

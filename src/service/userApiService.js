import db from '../models/index';
import {checkEmailExist, checkPhoneExist, hashUserPassword } from './loginRegisterService';

const getAllUser = async() => {
  let data = {
    EM: '',
    EC: '',
    DT: '',
  }

  try {
    let users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: {model: db.Group, attributes: ["name", "description"],},
    }); //Tham chiếu đến model `user`
    if (users) {
      // let data = users.get({ plain: true });
      return{
        EM: 'Get Data Success', //Error Message
        EC: 0, //Error Code
        DT: users, //Data
      }
    } else { 
      return{
        EM: 'Get Data Success', //Error Message
        EC: 0, //Error Code
        DT: [], //Data
      }
    }
  } catch (e) {
    console.log(e);
    return{
      EM: 'Something Wrongs with Services', //Error Message
      EC: 1, //Error Code
      DT: [], //Data
    }
  }
}

const getUserWithPagination = async (page, limit) => {
  try {
    let offset = (page - 1) * limit;

    const { count, rows } = await db.User.findAndCountAll({
      offset : offset,
      limit: limit,
      attributes: ["id", "username", "email", "phone", "sex", "address"],
      include: {model: db.Group, attributes: ["name", "description", "id"],},
      order : [
        //Sequelize - gửi data Group về được sắp xếp CBA
        ['id','DESC']
      ]
    })

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages : totalPages,
      users : rows
    }

    return{
      EM: 'Fetch OK', //Error Message
      EC: 0, //Error Code
      DT: data, //Data
    }

  } catch (e) {
    console.log(e);
    return{
      EM: 'Something Wrongs with Services', //Error Message
      EC: 1, //Error Code
      DT: [], //Data
    }
  }
}

const createNewUser = async(data) => {
  try {
    //check email/phone are exist
    let isEmailExist = await checkEmailExist(data.email);
    if (isEmailExist === true) {
      return {
        EM: "The email is already exist",
        EC: 1,
        DT: 'email'
      };
    }
    let isPhoneExist = await checkPhoneExist(data.phone);
    if (isPhoneExist === true) {
      return {
        EM: "The phone is already exist",
        EC: 1,
        DT: 'phone'
      };
    }
    //hash user password
    let hashPassword = hashUserPassword(data.password);
    
    await db.User.create({...data, password: hashPassword});
    return{
      EM: 'Create OK', //Error Message
      EC: 0, //Error Code
      DT: [], //Data
    }
  } catch (e) {
    console.log(e)
  }
}

const updateUser = async(data) => {
  try {
    if(!data.groupId){
      return {
        EM: 'Error with Empty GroupId',
        EC: 1,
        DT: 'group'
      }
    }
    let user = await db.User.findOne({
      where: { id: data.id }
    })

    if(user) {
      //update
      await user.update({
        username: data.username,
        address: data.address,
        sex: data.sex,
        groupId: data.groupId
      })
      return {
        EM: 'Update user succeeds',
        EC: 0,
        DT: ''
      }
    } else {
      //not found
      return {
        EM: 'User not found',
        EC: 2,
        DT: ''
      }
    }
  } catch (e) {
    console.log(e)
    return {
      EM: 'Something Wrongs With Services',
      EC: 1,
      DT: []
    }
  }
}

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: {id : id }
    })

    if(user){

      await user.destroy();

      return{
        EM: 'Delete User Succeeds', //Error Message
        EC: 0, //Error Code
        DT: [], //Data
      }
    }else {
      return{
        EM: 'User not exist', //Error Message
        EC: 2, //Error Code
        DT: [], //Data
      }
    }

  } catch (e) {
    console.log(e);
    return{
      EM: 'Error from service', //Error Message
      EC: 1, //Error Code
      DT: [], //Data
    }
  }
}

module.exports = {
  getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}
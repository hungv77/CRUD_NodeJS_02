import db from '../models/index';

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
    await db.User.create({

    })
  } catch (e) {
    console.log(e)
  }
}

const updateUser = async(data) => {
  try {
    let user = await db.user.findOne({
      where: { id: data.id }
    })
    if(user) {
      //update
      user.save({

      })
    } else {
      //not found
    }
  } catch (e) {
    console.log(e)
  }
}

const deleteUser = async (id) => {
  try {
    await db.user.delete({
      where: {id : id }
    })
  } catch (e) {
    console.log(e)
  }
}

module.exports = {
  getAllUser, createNewUser, updateUser, deleteUser, getUserWithPagination
}
import db from "../models/index";

const getGroups = async() => {
  try {
    let data = await db.Group.findAll ({
      order : [
        //Sequelize - gửi data Group về được sắp xếp ABC
        ['name','ASC']
      ]
    });
    return {
      EM: 'Get Group Success', //Error Message
      EC: 0, //Error Code
      DT: data, //Data
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      EM: 'error from service', //Error Message
      EC: 1, //Error Code
      DT: [], //Data
    })
  }
}

module.exports = {
  getGroups
}
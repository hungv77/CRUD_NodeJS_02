import userApiService from "../service/userApiService";

const readFunc = async (req, res) => {
  try {
    if (req.query.page && req.query.limit) {
      let page = req.query.page;
      let limit = req.query.limit;
      let data = await userApiService.getUserWithPagination(+page, +limit);
      return res.status(200).json({
        EM: data.EM, //Error Message
        EC: data.EC, //Error Code
        DT: data.DT, //Data
      });
    } else {
      let data = await userApiService.getAllUser();
      return res.status(200).json({
        EM: data.EM, //Error Message
        EC: data.EC, //Error Code
        DT: data.DT, //Data
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from service", //Error Message
      EC: "-1", //Error Code
      DT: "", //Data
    });
  }
};

const createFunc = async (req, res) => {
  try {
    //Missing Validate
    let data = await userApiService.createNewUser(req.body);
    return res.status(200).json({
      EM: data.EM, //Error Message
      EC: data.EC, //Error Code
      DT: data.DT, //Data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from service", //Error Message
      EC: "-1", //Error Code
      DT: "", //Data
    });
  }
};

const updateFunc = async (req, res) => {
  try {
    //Missing Validate
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
      EM: data.EM, //Error Message
      EC: data.EC, //Error Code
      DT: data.DT, //Data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from service", //Error Message
      EC: "-1", //Error Code
      DT: "", //Data
    });
  }
};

const deleteFunc = async (req, res) => {
  try {
    let data = await userApiService.deleteUser(req.body.id);
    return res.status(200).json({
      EM: data.EM, //Error Message
      EC: data.EC, //Error Code
      DT: data.DT, //Data
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      EM: "error from service", //Error Message
      EC: "-1", //Error Code
      DT: "", //Data
    });
  }
};

const getUserAccount = async (req, res) => {
  return res.status(200).json({
    EM: "ok", //Error Message
    EC: 0, //Error Code
    DT: {
      access_token: req.token,
      groupWithRoles : req.user.groupWithRoles,
      email: req.user.email,
      username: req.user.username,
    }, //Data
  });
};

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getUserAccount,
};

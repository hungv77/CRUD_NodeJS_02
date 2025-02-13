import userApiService from "../service/userApiService";
import roleApiService from "../service/roleApiService";

const readFunc = async (req, res) => {
  try {
    // if (req.query.page && req.query.limit) {
    //   let page = req.query.page;
    //   let limit = req.query.limit;
    //   let data = await userApiService.getUserWithPagination(+page, +limit);
    //   return res.status(200).json({
    //     EM: data.EM, //Error Message
    //     EC: data.EC, //Error Code
    //     DT: data.DT, //Data
    //   });
    // } else {
      let data = await roleApiService.getAllRoles();
      return res.status(200).json({
        EM: data.EM, //Error Message
        EC: data.EC, //Error Code
        DT: data.DT, //Data
      });
    // }
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
    let data = await roleApiService.createNewRoles(req.body);
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
    let data = await roleApiService.deleteRole(req.body.id);
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

  const getRoleByGroup = async(req, res) => {
    try {
      let id = req.params.groupId;
      let data = await roleApiService.getRoleByGroup(id);
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
  }

  const assignRoleToGroup = async (req, res) => {
    try {
      let data = await roleApiService.assignRoleToGroup(req.body.data);
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
  }

module.exports = {
  readFunc,
  createFunc,
  updateFunc,
  deleteFunc,
  getRoleByGroup,
  assignRoleToGroup,
};

import loginRegisterService from '../service/loginRegisterService'

const testApi = (req,res) => {
  return res.status(200).json({
    message: 'ok',
    data: 'test api',
  })
}

const handleRegister = async (req,res) => {
  try{
    //req.body : email, phone, username, password
    if(!req.body.email || !req.body.phone || !req.body.password){
      return res.status(200).json({
        EM: 'Missing required parameters', //Error Message
        EC: '1', //Error Code 
        DT: '', //Data
      })
    } //Đây là backend Validate
    if(req.body.password && req.body.password.length < 3){
      return res.status(200).json({
        EM: 'Your password must have more than 2 letters', //Error Message
        EC: '1', //Error Code 
        DT: '', //Data
      })
    }

    //service : create user
    let data = await loginRegisterService.registerNewUser(req.body);

    return res.status(200).json({
      EM: data.EM, //Error Message
      EC: data.EC, //Error Code 
      DT: '', //Data
    })

  }catch(e){
    return res.status(500).json({
      EM: 'Unknown error', //Error Message
      EC: '-1', //Error Code 
      DT: '', //Data
    })
  }
  console.log(">>> check new new", req.body)
}

const handleLogin = async (req,res) => {
  console.log("check login from react: ",req.body)
  return res.status(200).json({
    message: 'ok',
    data: 'test api login'
  })
}

module.exports = {
  testApi, handleRegister, handleLogin
}
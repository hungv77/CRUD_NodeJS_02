const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('jwt', 'root', null, {
  host: 'localhost',
  dialect: 'mysql'
});

const connection = async() => {
  try {
    await sequelize.authenticate();
    console.log('>>> Connection has been established successfully.');
  } catch (error) {
    console.log('>>> Error: ', error)
  }
}

export default connection;

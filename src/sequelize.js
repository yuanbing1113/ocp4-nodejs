import Sequelize from 'sequelize';
import UserModel from './models/user';

const sequelize = new Sequelize(`mysql://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_HOST}/${process.env.DB_DB}`);

const User = UserModel(sequelize, Sequelize);

// *init table*
// sequelize.sync().then(() => {
//   console.log('tsc_account db and Users table have been created');
// });

module.exports = User;
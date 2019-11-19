const db = require('../entities/models');

class UserService {

  static async addUser(newUser) {
    newUser.password = db.User.encryptPassword(newUser.password);
    try {
      return await db.User.create(newUser);
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(id) {
    try {
      return await db.User.findOne({
        where: {id: Number(id)}
      });
    } catch (error) {
      throw error;
    }
  }

  static async getUserByLogin(login) {
    return db.User.findOne({
      where: {
        [db.Sequelize.Op.or]: [{email: login}, {phone: login}]
      }
    });
  }
}

module.exports = UserService;
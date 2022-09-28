'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class history extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      history.belongsTo(models.user, {foreignKey: "userId"});  
      history.belongsTo(models.room, {foreignKey: "roomId"});  
      
    }
  }
  history.init({
    playerChoice: DataTypes.STRING,
    result: DataTypes.STRING,
    roomId: DataTypes.INTEGER,
    gameRound: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'history',
  });
  return history;
};
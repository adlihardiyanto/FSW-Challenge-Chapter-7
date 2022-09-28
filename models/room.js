'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class room extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      room.belongsTo(models.user, {foreignKey: "ownerId"});  
      room.hasMany(models.history, {foreignKey: "roomId"});  
    }
  }
  room.init({
    name: DataTypes.STRING,
    ownerId: DataTypes.INTEGER,
    challengerId: DataTypes.INTEGER,
    roomcode: DataTypes.STRING,
    roomstatus: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'room',
  });
  return room;
};
const {user,room,history} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 4;
const { Op } = require("sequelize");

class admin{
static async users(req,res){
    try {
    const alluser = await user.findAll();
    res.json({alluser})      
    } catch (error) {
      console.log("error", error);
      res.status(401).json({
        message: error.message,    
    })}
  }

  static async rooms(req,res){
    try {
    const allroom = await room.findAll();
    res.json({allroom})      
    } catch (error) {
      console.log("error", error);
      res.status(401).json({
        message: error.message,    
    })}
  }

  static async history(req,res){
    try {
    const allhistory = await history.findAll();
    res.json({allhistory})      
    } catch (error) {
      console.log("error", error);
      res.status(401).json({
        message: error.message,    
    })}
  }
}
module.exports = admin;
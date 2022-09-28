const {user,room,history} = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const saltRounds = 4;
const { Op } = require("sequelize");

class usercontrol {
   static async register(req,res){
        const { username, password,role } = req.body;
    try {
    const isEmailExist = await user.findOne({
      where: {
        username,
      },
    });
    if (isEmailExist) {
      return res.status(401).json({
        message: "email already exist",
      });
    }

    const passwordHashed = await bcrypt.hash(password, saltRounds);

    await user.create({
      username,
      password: passwordHashed,
      role
    });
    return res.json({
      message: "Successfully create new user. Please Login",
    });
  } catch (error) {
    console.log("error", error);
    res.status(401).json({
      message: error.message,
    });
  }
};

static async login(req,res){
    try {
        const { username, password } = req.body;
        const isUserFound = await user.findOne({
          where: {
            username,
          },
        });
        if (!isUserFound) {
          return res.status(401).json({
            message: "username or password wrong",
          });
        }
        const isPasswordMatch = await bcrypt.compare(
          password,
          isUserFound.password
        );
    
        if (!isPasswordMatch) {
          return res.status(401).json({
            message: "username or password wrong",
          });
        }
    
        const token = await jwt.sign({ id: isUserFound.id , role: isUserFound.role}, "secretsecret");
    
        return res.json({
          message: "Succesfully login",
          token,
        });
      } catch (error) {
        console.log("error", error);
        res.status(401).json({
          message: error.message,
        });
      }
    };


    static async findhistory(req, res){
      try {
    const UserGameHistories = await history.findAll({
      where: {
        userId: req.user.id,
      },
    });
    console.log("UserGameHistories", UserGameHistories[0].roomId);
    const UserGameHistoriesEnemy = await history.findAll({
      where: {
        userId: {
          [Op.ne]: req.user.id, 
        },
        roomId: UserGameHistories[0].roomId,
      },
    });
    res.json({
      UserGameHistories,
      UserGameHistoriesEnemy,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};


}

module.exports = usercontrol;
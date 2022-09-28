var express = require("express");
var router = express.Router();
const { room, user,history } = require("../models");

const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

function generateString(length) {
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function getOverallResult(gameDetailsPerRoom) {

  return 'User with username player1 Win';
}


function generateResult(PlayerChoice, enemyChoice) {
if((PlayerChoice ==="rock" && enemyChoice==="scissors") 
 || (PlayerChoice ==="scissors" && enemyChoice==="paper") 
 || (PlayerChoice ==="paper" && enemyChoice==="rock")){
    return "win"
    } else if((PlayerChoice ==="rock" && enemyChoice==="paper") || 
    (PlayerChoice ==="scissors" && enemyChoice==="rock") ||
     (PlayerChoice ==="paper" && enemyChoice==="scissors")){
         return "lose"
    } else if(PlayerChoice === enemyChoice){
        return "draw"
    }
}

function getReverseResult(result) {
  if (result == "win") return "lose";
  if (result == "lose") return "win";
  return "draw";
}

const getGameRound = (count) => {
  if (count > 3) {
    return 3;
  }
  if (count > 1) {
    return 2;
  }
  return 1;
};

class roomcontrol{
   static async fight(req,res){
  try {
    const isRoomExist = await room.findOne({
      where: {
        roomcode: req.params.IdRoom,
      },
    });
    if (!isRoomExist) {
      return res.status(401).json({
        message: "Room not exist",
      });
    }

    const countHistoryGame = await history.count({
      roomId: isRoomExist.id,
    });
    if (countHistoryGame >= 6) {
      return res.status(400).json({
        message: "Session room already over",
      });
    }

    const isHistoryExist = await history.findOne({
      where: {
        roomId: isRoomExist.id,
      },
      order: [["createdAt", "DESC"]],
    });

    if (isHistoryExist) {
      if (isHistoryExist.userId == req.user.id &&
        getGameRound(countHistoryGame) == isHistoryExist.gameRound) {
        res.json({
          message: "you cant suit again",
        });
      }
      else{
      const optionsCreate = {
        playerChoice: req.body.playerChoice,
        roomId: isRoomExist.id,
        userId: req.user.id,
        result: generateResult(
          req.body.playerChoice,
          isHistoryExist.playerChoice
        ),
        gameRound: getGameRound(countHistoryGame),
      };
      if (isHistoryExist.gameRound !== getGameRound(countHistoryGame)) {
        optionsCreate.result = null;
      }
      
      await history.create(optionsCreate);
      isHistoryExist.result = getReverseResult(
        generateResult(req.body.playerChoice, isHistoryExist.playerChoice)
      );
      await isHistoryExist.save();
    } 
  } else {
      await history.create({
      playerChoice: req.body.playerChoice,
      roomId: isRoomExist.id,
      userId: req.user.id,
      gameRound: 1,
    });
  }
  if (countHistoryGame >= 5) {
    const updateRoom = await room.update(
      {
        roomStatus: false,
      },
      {
        where: {
          id: isRoomExist.id,
        },
      }
    );
  }
    res.json({
      message: "Selesai Fight",
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
}

  static async join(req,res){
    try {
    const isRoomExist = await room.findOne({
    where:{
        roomcode:req.params.IdRoom,
      },
    });
    
    console.log(isRoomExist);
    if (!isRoomExist) {
      return res.status(401).json({
        message: "Room not exist",
      });
    }
    if (isRoomExist.challengerId) {
      return res.status(401).json({
        message: "Room Full",
      });
    }
    if (isRoomExist.ownerId == req.user.id) {
      return res.status(401).json({
        message: "You cant join your own room",
      });
    }

    isRoomExist.challengerId = req.user.id;

    isRoomExist.save();
    return res.status(200).json({
      message: "Join room",
      isRoomExist,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};

static async createroom(req, res){
  try {
    const payload = {
      name: req.body.name,
      ownerId: req.user.id,
      roomcode: generateString(5),
      roomstatus:true,
         };
    console.log("req.user.id", req.user.id);
    const isPlayerHaveRoom = await room.findOne({
      where: {
        ownerId: req.user.id,
        roomstatus: true,
      },
    });
    if (isPlayerHaveRoom) {
      return res.status(401).json({
        message: "You have already your own room",
      });
    }
    await room.create(payload);
    res.json({
      message: "Succesfully create room",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message,
    });
  }
};
}
module.exports = roomcontrol;

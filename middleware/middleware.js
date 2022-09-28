const jwt = require("jsonwebtoken");

class middleware{
  static async authentication(req, res, next){
  try {
    console.log("req", req.headers.auth);
    if (!req.headers.auth) {
      res.status(401).json({
        message: "Token Invalid atas",
      });
    }

    const token = req.headers.auth;
    const isTokenValid = jwt.verify(token, "secretsecret");
    req.user = {
      id: isTokenValid.id,
      role: isTokenValid.role
    };
    
    next();
  } catch (error) {
    res.status(401).json({
      message: "Token Invalid bawah",
    });
  }
};

static async authorization(req,res,next){
  try {
    console.log("req", req.headers.auth);
    if (!req.headers.auth) {
      res.status(401).json({
        message: "Token Invalid atas",
      });
    }

    const token = req.headers.auth;
    const isTokenValid = jwt.verify(token, "secretsecret");
     if(isTokenValid.role === "SA"){
    next();}
    else{
      res.status(401).json({
        message: "Tidak ada akses",
      });  
    }
  } catch (error) {
    res.status(401).json({
      message: "Token Invalid bawah",
    });
  }
};
}
module.exports = middleware;
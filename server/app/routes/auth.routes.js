const { verifySignUp } = require("../middleware");
const controller = require("../controllers/auth.controller");
const SpinnControlers = require("../controllers/spinn.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/auth/signup",
    [
      verifySignUp.checkDuplicateUsernameOrEmail,
      verifySignUp.checkRolesExisted
    ],
    controller.signup
  );

  app.post("/api/auth/signin", controller.signin);
  app.post("/api/auth/addParts", controller.addParts);
  app.post("/api/auth/updateparts", controller.updateparts);
  app.post("/api/checknumber", SpinnControlers.findnumber);
  app.post("/api/spinresult", SpinnControlers.insertnumber);
  app.post("/api/userinformation", SpinnControlers.userinformation);
 
};

import { info } from "console";
import express from "express";
import * as loginService from "../service/LoginService.js";
import { handlerError, INVALID_INPUT_EXCEPTION } from "../utils.js";
const loginRouter = express.Router();

//Route to handle user credential verification
loginRouter.post("/login", (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;
  if (!username || !password) {
    let error = handlerError(INVALID_INPUT_EXCEPTION, 400);
    info("Error message ", error);
    res.send(error);
    next();
  } else {
    console.info("Trying to login with username " + username);
    loginService
      .login(username, password)
      .then((data) => {
        console.log("data is " + data);
        return res.json(data);
      })
      .catch((err) => {
        console.log("Error is " + err);
        res.send(err);
      });
  }
});

//Route to handle user creation request
loginRouter.post("/signup", (req, res, next) => {
  let user_Object = req.body;
  let validationError = validateUserObject(user_Object);
  if (validationError) { 
    res.send(handlerError(validationError, 400));
    next();
  }
  else {
    loginService
    .register(user_Object)
    .then((data) => {
      console.log("data is " + data);
      return res.json(data);
    })
    .catch((err) => {
      console.log("Error is " + err);
      res.send(err);
    });
  }
  
});

// TODO: Move to utils
function validateUserObject(user_Object, res) {
    let error = "";
  if (!user_Object) {
      return INVALID_INPUT_EXCEPTION;
  }

  console.log("User name is ", !user_Object.name);
  if (!user_Object.username) {
    error = error.concat("Invalid Input Username");
  }
  if (!user_Object.password) {
    error = error.concat("Invalid Input password");
  }
  if (!user_Object.name) {
    error = error.concat("Invalid Input name");
  }
  if (!user_Object.lastName) {
    error = error.concat("Invalid Input LastName");
  }
  return error;
}
export { loginRouter };

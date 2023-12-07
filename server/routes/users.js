var express = require('express');
var router = express.Router();
const {check} = require("express-validator");
const userController = require('../controllers/user');
const auth = require('../libs/auth');

const signupCheck =  [
    check('name', 'Please enter valid name').notEmpty(),
    // check('email', 'Please enter valid email').isEmail().notEmpty(),
    check('password', 'Please enter password of minimum 8 characters').notEmpty().isLength({ min: 6 })
  ]

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post("/signup",signupCheck, (req, res) => {
  console.log("signup routes hit");
  userController.signupFunc(req, res);
});
router.post("/login",signupCheck, (req,res) => {
  console.log("login routes hit");
  userController.loginFunc(req, res);
})
router.post("/create",auth, (req, res) => {
  console.log("create todo routes hit");
  userController.createTodo(req, res);
});
router.get("/read", auth, (req, res) => {
  console.log("read todo routes hit");
  userController.readTodo(req, res);
});
router.post("/update", auth, (req, res) => {
  console.log("update todo routes hit");
  userController.updateTodo(req, res);
});
router.get("/delete", auth, (req, res) => {
  console.log("delete todo routes hit");
  userController.deleteTodo(req, res);
});
router.get("/deleteall", auth, (req, res) => {
  console.log("deleteall todo routes hit");
  userController.deleteAllTodo(req, res);
});
module.exports = router;

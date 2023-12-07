// const express = require('express');
// const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user");
const todoModel = require("../models/todo");
const { validationResult } = require("express-validator");

// const deleteallUsers = async (req, res) => {
//     try{
//       await todoModel.deleteMany({});
//        const allUsers = await todoModel.find();
//        const totalUsers = todoModel.length;
//        console.log(totalUsers);
//     }
//     catch(err) {
//       console.error(err);}
// };

// deleteallUsers()

const signupFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    const { name, password, cpassword } = req.body;
    if (password !== cpassword) {
      return res.status(422).json({ error: "password not match" });
    }
    const nameExists = await userModel.findOne({ name });
    if (nameExists) {
      return res.status(422).json({ error: "name already exists" });
    }
    console.log("password before hash", password);
    const hashedPass = await bcrypt.hash(password, 10); //hashed here

    const newUser = new userModel({
      name,
      password: hashedPass,
    });
    const userSave = await newUser.save();
    res.status(200).json({ "signup successful": userSave });
  } catch (e) {
    console.error(e);
    res
      .status(500)
      .json({ error: "signup controller error", errorMessage: e.message });
  }
};

const loginFunc = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(422).json({ errors: result.array() });
    }

    const { name, password } = req.body;
    const dbUser = await userModel.findOne({ name });

    if (!dbUser) {
      return res.status(404).json({ message: "name not found" });
    }
    const passwordMatch = await bcrypt.compare(password, dbUser.password); //unhashed and compared
    console.log("pasword after compare", password);
    console.log("dbuser.pasword after compare", dbUser.password);
    // const passwordMatch = password === dbUser.password
    if (!passwordMatch) {
      return res.status(404).json({ message: "password is incorrect" });
    }
    const token = jwt.sign({ userId: dbUser._id }, process.env.SECRET, {
      expiresIn: "7d",
    });
    console.log("jwt token", token);
    //   localStorage.setItem("jwt", token);
    res.json({ dbUser, token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

const createTodo = async (req, res) => {
  try {
    const id = req.decodedToken.userId;

    console.log("got id from jwt:", id);
    const { task, status } = req.body;
    const addTodo = new todoModel({
      task,
      status,
      user: id,
    });
    const newtask = await addTodo.save();
    res.status(200).json({ "task created successfully": newtask });
  } catch (err) {
    res.status(500).error("login error", err.message);
  }
};
const readTodo = async (req, res) => {
  try {
    const id = await req.decodedToken.userId;

    const readAllTodo = await todoModel.find({ user: id });
    res.send(readAllTodo);
  } catch (err) {
    res.error("readtodo error", err.message);
  }
};
const updateTodo = async (req, res) => {
  try {
    const { id } = req.query;
    const { task, status } = req.body;
    const updateOne = await todoModel.findByIdAndUpdate(
      id,
      { task, status },
      { new: true }
    );
    console.log(updateOne);
    res.status(200).json(updateOne);
  } catch (err) {
    //  res.error("updatetodo error", err.message);
    res.status(500).json({ error: "updateTodo error", message: err.message });
  }
};
const deleteTodo = async (req, res) => {
  try {
    const { id } = req.query;
    const deleteOne = await todoModel.findByIdAndDelete(id);

    if (!deleteOne) {
      return res.status(404).send("Todo not found");
    }

    const nameDeleted = deleteOne.task;
    res.status(200).send(`"${nameDeleted}" deleted successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send(`Error: ${err.message}`);
  }
};

const deleteAllTodo = async (req, res) => {
  try {
    const id = await req.decodedToken.userId;
    const deleteAll = await todoModel.deleteMany({ user: id });
    res.status(200).send(`${deleteAll} deleted`);
  } catch (err) {
    console.error(err);
  }
};
module.exports = {
  signupFunc,
  loginFunc,
  createTodo,
  readTodo,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
};

import express from "express"
import {registerUser,loginUser,getUser,signoutUser} from '../controllers/user.controller.js'
const userRouter=express.Router();
import authenticateUser from "../middlewares/authenticate.js";
import validateFields from "../middlewares/validate.js";
const registerFields = ["username", "email", "password"];
const loginFields = ["email", "password"];
// @route   POST /api/users/register - Register a new user
userRouter.post("/register",validateFields(registerFields),registerUser)
// @route   POST /api/users/login - Login a user and return token
userRouter.post("/signin",validateFields(loginFields),loginUser)
userRouter.get("/",authenticateUser,getUser)
userRouter.post("/signout",signoutUser)


export default userRouter;
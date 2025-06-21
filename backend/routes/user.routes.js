import express from "express"
import {registerUser,loginUser,getUser,signoutUser} from '../controllers/user.controller.js'
const userRouter=express.Router();
import authenticateUser from "../middlewares/authenticate.js";
import validateFields from "../middlewares/validate.js";

// Fields allowed for validation
const registerFields = ["username", "email", "password"];
const loginFields = ["email", "password"];

// @route   POST /api/users/register - Register a new user
userRouter.post("/register",validateFields(registerFields),registerUser)
// @route   POST /api/users/login - Login a user and return token
userRouter.post("/signin",validateFields(loginFields),loginUser)
// @route   GET /user - Get authenticated user info
userRouter.get("/",authenticateUser,getUser)
// @route   POST /user/signout - Logout user
userRouter.post("/signout",signoutUser)


export default userRouter;
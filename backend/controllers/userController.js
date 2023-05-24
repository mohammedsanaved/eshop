import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

//@desc  Auth user & get token
//@route POST /api/users/login
//@access Fetch all products

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //   console.log(email, password);

  const user = await User.findOne({ email: email });

  if (user && (await user.matchPassword(password))) {
    console.log(password);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid Email || Password');
  }
});
//@desc  Register Users
//@route POST /api/users
//@access PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  //   console.log(email, password);

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    res.status(400);
    throw new Error('User already Exist');
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid DATA');
  }
});

//@desc  Auth user & get token
//@route GET /api/users/profile
//@access PRIVATE   Fetch all products
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });

    console.log(user.id);
    console.log(user.name);
    console.log(user.email);
    console.log(generateToken(user._id));
  } else {
    res.status(404);
    console.log(error);
    throw new Error('User Not Found');
  }
});
export { authUser, getUserProfile, registerUser };
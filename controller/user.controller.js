import bcryptjs from "bcryptjs";
import cloudinary from "cloudinary";
import { User } from "../model/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { generateTokenAndSetToken } from "../utils/generatedToken.js";

// signup
export const SignUp = async (req, res) => {
  const { name, email, password } = req.body;
  // console.log(req.body);
  const avatar = req?.file?.path;
  // console.log(req.file);
  try {
    // Check if all fields are provided
    if (!name || !email || !password) {
      throw new ApiError(400, "All fields are required");
    }
    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      throw new ApiError(400, "User already exists");
    }

    // Hash password
    const hashPassword = await bcryptjs.hash(password, 10);
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    // Create new user
    const user = new User({
      name,
      email,
      password: hashPassword,
      avatar,
      verificationCode,
      verificationCodeExpires: Date.now() + 1 * 60 * 60 * 1000,
      lastLogin: Date.now(),
    });
    // Save user
    await user.save();
    const cookie = generateTokenAndSetToken(res, user._id);
    // console.log(cookie)
    res
      .status(201)
      .json(new ApiResponse(201, user, `${user.name} created successfully`));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// login
export const Login = async (req, res) => {
  const { email, password } = req.body;
  // console.log(req.body)
  try {
    // Check if all fields are provided
    if (!email || !password) {
      throw new ApiError(400, "All fields are required");
    }
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      throw new ApiError(400, "User does not exist");
    }
    // Check if password is correct
    const isPasswordCorrect = await bcryptjs.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw new ApiError(400, "Passowrd invalid");
    }
    // Generate token
    generateTokenAndSetToken(res, user._id);
    res
      .status(200)
      .json(new ApiResponse(200, user, "User logged in successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      path: "*",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    res
      .status(200)
      .json(new ApiResponse(200, null, "User logged out successfully"));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// check user authentication
export const checkUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, user, `${user?.name} is authenticated`));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete user
export const deleteUser = async (req, res) => {
  const { imageURL, id } = req.query;
  const imageArr = imageURL.split("/");
  const image = imageArr[imageArr.length - 1].split(".");
  const imageName = image[0];
  try {
    const user = await User.findById(id);
    if (!user) {
      throw new ApiError(404, "User not found");
    } else {
      cloudinary.v2.api
        .delete_resources([`avatar/${imageName}`], {
          type: "upload",
          resource_type: "image",
        })
        .then(console.log);
      await User.findByIdAndDelete(id);
      res
        .status(200)
        .json(new ApiResponse(200, user, `${user?.name} deleted successfully`));
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

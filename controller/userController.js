import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }
    console.log("Email:", email);
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const newUser = new User({ name, email, password: hashedPassword });
    console.log("New User:", newUser);
    
    // Save user to DB
    const response = await newUser.save();
    console.log("User Saved:", response);
    
    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Error registering user", error: err.message });
  }
};

export default signup;


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid username or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.log("error",err)
    res.status(500).json({ message: "Login error", error: err });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err });
  }
};

const logout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ message: "Logout error", error: err });
  }
};


export { signup, login, getUser, logout };

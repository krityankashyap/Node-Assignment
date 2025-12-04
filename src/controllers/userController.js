import * as userService from '../services/userService.js';

export const register = async (req, res) => {
  try {
    const { name, email, password, referralCode } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const result = await userService.registerUser(name, email, password, referralCode);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token: result.token,
      referralCode: result.user.referralCode,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await userService.loginUser(email, password);

    res.json({
      success: true,
      message: 'Login successful',
      token: result.token,
      user: result.user,
    });
  } catch (error) {
    res.status(401).json({ success: false, error: error.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await userService.getUserById(req.userId);

    res.json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(404).json({ success: false, error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const user = await userService.updateUser(req.userId, name);

    res.json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const result = await userService.deleteUser(req.userId);

    res.json({
      success: true,
      message: result.message,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const subscribe = async (req, res) => {
  try {
    const result = await userService.subscribeUser(req.userId);

    res.json({
      success: true,
      message: result.message,
      user: result.user,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getEarnings = async (req, res) => {
  try {
    const earnings = await userService.getUserEarnings(req.userId);

    res.json({
      success: true,
      ...earnings,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();

    res.json({
      success: true,
      count: users.length,
      users,
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};
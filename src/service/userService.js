import User from '../model/User.js';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/index.js';

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: '7d' });
};

const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

export const registerUser = async (name, email, password, referralCode) => {
  // Check if user exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new Error('User already exists with this email');
  }

  if (referralCode) {
    const referrer = await User.findOne({ referralCode });
    if (!referrer) {
      throw new Error('Invalid referral code');
    }
  }

  const newUser = new User({
    name,
    email,
    password, // Will be hashed by pre-save hook
    referralCode: generateReferralCode(),
    referredBy: referralCode || null,
  });

  await newUser.save();

  const token = generateToken(newUser._id);

  return {
    token,
    user: {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      referralCode: newUser.referralCode,
    },
  };
};

export const loginUser = async (email, password) => {
  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found');
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error('Invalid password');
  }

  const token = generateToken(user._id);

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      isSubscribed: user.isSubscribed,
    },
  };
};

export const getUserById = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) {
    throw new Error('User not found');
  }
  return user;
};

export const updateUser = async (userId, name) => {
  const user = await User.findByIdAndUpdate(
    userId,
    { name },
    { new: true, runValidators: true }
  ).select('-password');

  if (!user) {
    throw new Error('User not found');
  }

  return user;
};

export const deleteUser = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new Error('User not found');
  }
  return { message: 'User deleted successfully' };
};

export const subscribeUser = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  if (user.isSubscribed) {
    throw new Error('User is already subscribed');
  }

  user.isSubscribed = true; // Subscription true
  await user.save();

  if (user.referredBy) {
    const referrer = await User.findOne({ referralCode: user.referredBy });
    if (referrer) {
      referrer.earnings += 50; // $50 reward
      await referrer.save();
      console.log(`${referrer.email} earned $50 from referral`);
    }
  }

  return {
    message: 'Subscription activated',
    user: {
      id: user._id,
      email: user.email,
      isSubscribed: user.isSubscribed,
    },
  };
};

export const getUserEarnings = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  return {
    referralCode: user.referralCode,
    earnings: user.earnings,
    message: `Share code ${user.referralCode} to earn money`,
  };
};

export const getAllUsers = async () => {
  const users = await User.find().select('-password');
  return users;
};
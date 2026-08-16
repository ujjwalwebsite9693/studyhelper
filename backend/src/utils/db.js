const mongoose = require('mongoose');

let isConnected = false;

async function connectDB() {
  if (isConnected) return;
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error('MONGO_URI is not set in environment variables');
  await mongoose.connect(uri);
  isConnected = true;
  console.log('MongoDB connected');
}

module.exports = { connectDB };

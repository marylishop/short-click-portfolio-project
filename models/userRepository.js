const User = require('./userModel');

async function createUser(username, email) {
  try {
    const newUser = new User({ username, email });
    const savedUser = await newUser.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createUser,
  // Add other database operations here if needed
};

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String
  },
  lastName: {
    type: String
  },
  birthDate: {
    type: String
  },
  country: {
    type: String
  },
  email: {
    type: String,
    unique: true
  },
  password: {
    type: String,
  }
});

const User = mongoose.model('User', userSchema);

export default User;
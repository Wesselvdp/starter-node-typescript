import mongoose, { Schema, model } from 'mongoose';

const userClient = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  primaryTherapist: { type: mongoose.Schema.Types.ObjectId, ref: 'therapist' },
  secondaryTherapist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'therapist',
  },
});

const UserClient = model('userClient', userClient);

module.exports = UserClient;

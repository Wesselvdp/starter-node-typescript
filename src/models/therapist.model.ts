import mongoose, { Schema, model } from 'mongoose';

const therapist = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  userClients: [
    {
      primaryTherapist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userClient',
      },
    },
  ],
});

const Therapist = model('therapist', therapist);

module.exports = Therapist;

const mongoose = require("mongoose");

// const bookingSchema = new mongoose.Schema({
//   organization:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Organizations",
//     }
//   ],
//   users:[
//     {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Users",
//     }
//   ],
//   data: Date,
//   time: Date,
// },{ timestamps: true })

// const model = mongoose.model("Booking", bookingSchema)
// module.exports = model;
const AppointmentSchema = new mongoose.Schema({
  organization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Organization'
  },
  timeSlot: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'AvailableTimeSlot'
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

const Appointment = mongoose.model('Appointment', AppointmentSchema);
module.exports = Appointment;
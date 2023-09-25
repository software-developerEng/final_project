const mongoose = require("mongoose");

const timeSlotSchema = new mongoose.Schema(
  {
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
    isReserved: {
      type: Boolean,
      default: false,
    },
    reservedBy: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        org: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Organization",
        },
      },
    ],
  },
  { timestamps: true }
);



const generateTimeSlots = () => {
  const timeSlots = [];
  const startHour = 8;
  const endHour = 20;

  for (let hour = startHour; hour < endHour; hour++) {
    const startTime = new Date().setHours(hour, 0, 0, 0);
    const endTime = new Date().setHours(hour + 1, 0, 0, 0);

    const timeSlot = {
      startTime,
      endTime,
    };

    timeSlots.push(timeSlot);
  }

  return timeSlots;
};

const TimeSlot = mongoose.model("TimeSlot", timeSlotSchema);

module.exports = {
  TimeSlot,
  generateTimeSlots,
};

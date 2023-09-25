const mongoose = require("mongoose");
// Define a collection for available time slots
const AvailableTimeSlotSchema = new mongoose.Schema({
    organization: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    isAvailable: {
        type: Boolean
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    titleOfActivity: {
        type: String,
        required:true
    }

});

const AvailableTimeSlot = mongoose.model('AvailableTimeSlot', AvailableTimeSlotSchema);

module.exports = AvailableTimeSlot;
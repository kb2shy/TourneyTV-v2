const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        first: {
            type: String,
            required: true,
        },
        middle: {
            type: String,
        },
        last: {
            type: String,
            required: true
        }
    },
    email: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    chatroomSubscriptions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chatroom' }],
    teams: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Team' }],
    isAdmin: { type: Boolean, default: false },
    playerId: { type: Number },
    img: { type: Buffer },
},
    {
        timestamps: true
    });

module.exports = mongoose.model('User', userSchema);
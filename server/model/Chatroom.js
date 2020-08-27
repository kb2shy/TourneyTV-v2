const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatroomSchema = new Schema({
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    chatroomName: {
        type: String,
        required: true,
    },
    members: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message'}]
},
{
    timestamps: true
})

module.exports = mongoose.model('Chatroom', chatroomSchema);
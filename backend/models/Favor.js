const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const favorModel = {
    favorID: {
        type: Schema.Types.ObjectId,
        required: true,
    }, 
    ownerID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    debtID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    detail: {
        name: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
            required: true,
        },
    },
    status: {
        type: Boolean,
        required: true,
    },
    createdImage: {
        type: String,
        required: true,
    },
    createdTime: {
        type: Date.now,
        required: true, 
    },
    completedImage: {
        type: String,
    },
    completedTime: {
        type: Schema.Types.Date,
    }
}

const FavorSchema = new mongoose.Schema(favorModel);

module.exports = mongoose.model('favors', FavorSchema);
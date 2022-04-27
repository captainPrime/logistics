const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
	user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // user who reviewed
	rating: { type: Number, max: 5, min: 0, required: true, default: 0 },
	review: { type: String},
	requestId: {type: String},
	requestType: {type: String, enum:["ride", "delivery", "bike"]},
    driver: {type: mongoose.Schema.Types.ObjectId, ref:'Driver'}
}, {
	timestamps: true
});

module.exports = mongoose.model('Review', ReviewSchema);

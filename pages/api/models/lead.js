const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const modelLead = Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
		partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
		userView: { type: Number, default: 1 },
		userCalled: [ { _id: false, date: { type: Date, default: new Date() } } ],
		leadId: { type: String, default: new Date().getMilliseconds() }
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Lead', modelLead);

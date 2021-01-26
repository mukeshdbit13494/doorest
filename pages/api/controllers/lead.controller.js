const Mongoose = require('mongoose');
const Lead = require('../models/lead');
const Partner = require('../models/partner');
const jwt = require('jsonwebtoken');

// create and update leads of partners when user see his/her profile
exports.getPartnerDetailAndUpdateLeads = async function(req, res) {
	const { partnerId } = req.params;
	try {
		const { id } = jwt.verify(req.header('Authorization'), process.env.JWT_KEY);
		//get partner details
		const partner = await Partner.aggregate([
			{
				$match: {
					_id: Mongoose.Types.ObjectId(req.params.partnerId),
					isDeleted: null
				}
			},
			{
				$lookup: {
					from: 'partnerdetails',
					localField: '_id',
					foreignField: 'partnerId',
					as: 'partnerDetails'
				}
			},
			{
				$unwind: '$partnerDetails'
			},
			{
				$lookup: {
					from: 'partnerservices',
					localField: '_id',
					foreignField: 'partnerId',
					as: 'partnerServices'
				}
			},
			{
				$unwind: '$partnerServices'
			},
			{
				$project: {
					firstName: '$firstName',
					lastName: '$lastName',
					email: '$email',
					mobile: '$mobile',
					partnerDetails: {
						image: '$partnerDetails.image',
						alternateMobile: '$partnerDetails.alternateMobile'
					},
					partnerServices: '$partnerServices'
				}
			}
		]);
		if (partner != null && partner.length > 0) {
			const lead = await Lead.findOne({
				userId: Mongoose.Types.ObjectId(id),
				partnerId: Mongoose.Types.ObjectId(partnerId)
			});
			if (lead != null) {
				lead.userView = lead.userView + 1;
				lead.save((err, result) => {
					if (err) return res.json({ status: false, message: err });
					if (result != null) {
						return res.json({ status: true, data: partner[0] });
					} else {
						return res.json({ status: false, message: 'Data not found' });
					}
				});
			} else {
				await new Lead({
					userId: id,
					partnerId
				}).save((err, result) => {
					if (err) return res.json({ status: false, message: err });
					if (result != null) {
						return res.json({
							status: true,
							data: partner[0]
						});
					} else {
						return res.json({
							status: false,
							message: 'Data not found'
						});
					}
				});
			}
		} else {
			return res.json({ status: false, message: 'Data not found', data: [] });
		}
	} catch (error) {
		console.log(error);
	}
};

//when user calling partner then this function push dat time in database
exports.updateLeadByCalling = async function(req, res) {
	try {
		const { id } = jwt.verify(req.header('Authorization'), process.env.JWT_KEY);
		const { partnerId } = req.body;
		const lead = await Lead.findOne({
			userId: Mongoose.Types.ObjectId(id),
			partnerId: Mongoose.Types.ObjectId(partnerId)
		});
		if (lead != null) {
			lead.userCalled.push(new Date());
			lead.save((err, result) => {
				if (err) return res.json({ status: false, message: err });
				if (result == null) {
					return res.json({ status: false, message: 'Data not found' });
				} else {
					return res.json({ status: true, message: 'Data updated' });
				}
			});
		} else {
			return res.json({
				status: false,
				message: 'Data not found'
			});
		}
	} catch (error) {
		console.log(error);
	}
};

exports.getPartnerLead = async function(req, res) {
	try {
		const { id } = jwt.verify(req.header('Authorization'), process.env.JWT_KEY);
		const partnerLead = await Lead.aggregate([
			{
				$match: { partnerId: Mongoose.Types.ObjectId(id) }
			},
			{
				$lookup: {
					from: 'users',
					localField: 'userId',
					foreignField: '_id',
					as: 'user'
				}
			},
			{
				$unwind: '$user'
			},

			{
				$project: {
					'user._id': 1,
					'user.firstName': 1,
					'user.lastName': 1,
					'user.email': 1,
					'user.mobile': 1,
					'user.image': 1,
					userView: 1,
					userCalled: 1,
					leadId: 1,
					lastVisitDate: {
						$dateToString: { format: '%d-%m-%Y', date: '$updatedAt' }
					},
					lastVisitTime: {
						$dateToString: {
							format: '%H:%M',
							date: '$updatedAt'
						}
					}
				}
			},
			{
				$sort: { lastVisitTime: -1, lastVisitDate: -1 }
			}
		]);
		if (partnerLead != null) {
			return res.json({ status: true, data: partnerLead });
		} else {
			return res.json({ status: false, message: 'Data not found', data: [] });
		}
	} catch (error) {
		console.log(error);
	}
};

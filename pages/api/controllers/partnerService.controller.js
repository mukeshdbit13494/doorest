const PartnerService = require('../models/partnerService');
const Partner = require('../models/partner');
const Mongoose = require('mongoose');
const service = require('../models/service');
const { email } = require('../mailer/email');

// Inserting partners service details
exports.partnerServiceDetails = async function(req, res) {
	const {
		serviceAreaPincode,
		serviceCharge,
		serviceAreaRange,
		partnerId,
		serviceDays,
		serviceId,
		description,
		specialization,
		experience
	} = req.body;

	try {
		const result = await Partner.findOne({ _id: partnerId });
		await new PartnerService({
			serviceAreaPincode,
			serviceCharge,
			serviceAreaRange,
			serviceDays,
			partnerId,
			serviceId,
			description,
			specialization,
			experience
		}).save((err, response) => {
			if (err) res.json({ status: false, message: err });
			else {
				//send email to partner when save data successfully
				if (result != null) {
					const name = result.firstName + ' ' + result.lastName;
					email(name, result.email, result.mobile);
				}
				res.json({ status: true, data: response });
			}
		});
	} catch (error) {
		console.log(error);
	}
};

//Updating partners service details
exports.updatePartnerService = async function(req, res) {
	const {
		serviceAreaPincode,
		serviceCharge,
		serviceAreaRange,
		status,
		partnerId,
		serviceDays,
		serviceId,
		description,
		specialization
	} = req.body;

	const query = { partnerId: partnerId };
	const updateData = {
		serviceAreaPincode,
		serviceCharge,
		serviceAreaRange,
		serviceDays,
		status,
		serviceId,
		description,
		specialization
	};

	try {
		await PartnerService.findOneAndUpdate(query, updateData, { new: true }, (err, response) => {
			if (err) res.json({ status: false, message: err });
			else {
				res.json({ status: true, message: 'Data updated successfully' });
			}
		});
	} catch (error) {
		console.log(error);
	}
};

//get partner details and service details from service id
exports.getServiceListByServiceId = async function(req, res) {
	const { serviceId } = req.params;
	// const servId = Mongoose.Types.ObjectId(serviceId);
	try {
		const result = await service.aggregate([
			{
				$match: {
					_id: Mongoose.Types.ObjectId(serviceId),
					isDeleted: null
				}
			},
			{
				$lookup: {
					from: 'partnerservices',
					let: { serviceId: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [ { $eq: [ '$serviceId', '$$serviceId' ] } ]
								}
							}
						},
						{
							$lookup: {
								from: 'partnerdetails',
								localField: 'partnerId',
								foreignField: 'partnerId',
								as: 'PartnerDetail'
							}
						},
						{ $unwind: '$PartnerDetail' }
					],
					as: 'PartnerSevices'
				}
			}
		]);
		if (result) {
			res.json({ status: true, data: result });
		} else {
			res.json({ status: false, message: result });
		}
	} catch (error) {
		console.log(error);
	}
};

//get partner's service detail by city
exports.getServiceListByCity = async function(req, res) {
	const { serviceId, city } = req.params;

	try {
		const result = await service.aggregate([
			{
				$match: {
					_id: Mongoose.Types.ObjectId(serviceId),
					isDeleted: null
				}
			},
			{
				$lookup: {
					from: 'partnerservices',
					let: { serviceId: '$_id', city: city },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [ { $eq: [ '$serviceId', '$$serviceId' ] } ]
								}
							}
						},
						{
							$lookup: {
								from: 'partnerdetails',
								let: { city: city, partnerId: '$partnerId' },
								pipeline: [
									{
										$match: {
											$expr: {
												$and: [
													{ $eq: [ '$partnerId', '$$partnerId' ] },
													{ $eq: [ '$address.local.city', '$$city' ] }
												]
											}
										}
									}
								],
								as: 'personalDetails'
							}
						},
						{ $unwind: '$personalDetails' },
						{
							$lookup: {
								from: 'partners',
								localField: 'partnerId',
								foreignField: '_id',
								as: 'profileDetails'
							}
						},
						{ $unwind: '$profileDetails' },
						{
							$lookup: {
								from: 'usercomments',
								let: { partnerId: '$partnerId' },
								pipeline: [
									{
										$match: {
											$expr: {
												$and: [ { $eq: [ '$partnerId', '$$partnerId' ] } ]
											}
										}
									},
									{
										$group: {
											_id: null,
											rating: {
												$avg: '$rating'
											},
											totalComments: { $sum: 1 }
										}
									}
								],

								as: 'userComments'
							}
						}
					],
					as: 'partnerList'
				}
			}
		]);
		if (result) {
			res.json({ status: true, data: result[0] });
		} else {
			res.json({ status: false, message: 'Data not found' });
		}
	} catch (error) {
		console.log(error);
	}
};

exports.getServiceListByLocation = async function(req, res) {
	const { serviceId } = req.params;
	const { latitude, longitude } = req.query;
	// const servId = Mongoose.Types.ObjectId(serviceId);
	try {
		const result = await service.aggregate([
			{
				$match: {
					_id: Mongoose.Types.ObjectId(serviceId),
					isDeleted: null
				}
			},
			{
				$lookup: {
					from: 'partnerservices',
					let: { serviceId: '$_id' },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [ { $eq: [ '$serviceId', '$$serviceId' ] } ]
								}
							}
						},
						{
							$lookup: {
								from: 'partnerdetails',
								pipeline: [
									{
										// $geoNear: {
										// 	near: {
										// 		type: 'Point',
										// 		coordinates: [ parseFloat(longitude), parseFloat(latitude) ]
										// 	},
										// 	distanceField: 'distance'
											// maxDistance: Number(distance),
											// minDistance: 10,
											// includeLocs: "address.location",
										// }
									}
								],
								as: 'personalDetails'
							}
						},
						{ $unwind: '$personalDetails' },
						{
							$lookup: {
								from: 'partners',
								localField: 'partnerId',
								foreignField: '_id',
								as: 'profileDetails'
							}
						},
						{ $unwind: '$profileDetails' },
						{
							$lookup: {
								from: 'usercomments',
								let: { partnerId: '$partnerId' },
								pipeline: [
									{
										$match: {
											$expr: {
												$and: [ { $eq: [ '$partnerId', '$$partnerId' ] } ]
											}
										}
									},
									{
										$group: {
											_id: null,
											rating: {
												$avg: '$rating'
											},
											totalComments: { $sum: 1 }
										}
									}
								],

								as: 'userComments'
							}
						}
					],
					as: 'partnerList'
				}
			}
		]);
		if (result) {
			res.json({ status: true, data: result });
		} else {
			res.json({ status: false, message: result });
		}
	} catch (error) {
		console.log(error);
	}
};

//get partner's service detail by pincode
exports.getServiceListByPincode = async function(req, res) {
	const { serviceId, pincode } = req.params;

	try {
		const result = await service.aggregate([
			{
				$match: {
					_id: Mongoose.Types.ObjectId(serviceId),
					isDeleted: null
				}
			},
			{
				$lookup: {
					from: 'partnerservices',
					let: { serviceId: '$_id', pincode: pincode },
					pipeline: [
						{
							$match: {
								$expr: {
									$and: [ { $eq: [ '$serviceId', '$$serviceId' ] } ]
								}
							}
						},
						{
							$lookup: {
								from: 'partnerdetails',
								let: {
									pincode: Number(pincode),
									partnerId: '$partnerId'
								},
								pipeline: [
									{
										$match: {
											$expr: {
												$and: [
													{ $eq: [ '$partnerId', '$$partnerId' ] },
													{ $eq: [ '$address.local.pincode', '$$pincode' ] }
												]
											}
										}
									}
								],
								as: 'personalDetails'
							}
						},
						{ $unwind: '$personalDetails' },
						{
							$lookup: {
								from: 'partners',
								localField: 'partnerId',
								foreignField: '_id',
								as: 'profileDetails'
							}
						},
						{ $unwind: '$profileDetails' },
						{
							$lookup: {
								from: 'usercomments',
								let: { partnerId: '$partnerId' },
								pipeline: [
									{
										$match: {
											$expr: {
												$and: [ { $eq: [ '$partnerId', '$$partnerId' ] } ]
											}
										}
									},
									{
										$group: {
											_id: null,
											rating: {
												$avg: '$rating'
											},
											totalComments: { $sum: 1 }
										}
									}
								],

								as: 'userComments'
							}
						}
					],
					as: 'partnerList'
				}
			}
		]);
		if (result) {
			res.json({ status: true, data: result });
		} else {
			res.json({ status: false, message: result });
		}
	} catch (error) {
		console.log(error);
	}
};

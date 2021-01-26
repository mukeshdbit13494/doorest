const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelPartnerService = Schema(
  {
    serviceAreaRange: { type: Number, required: true },
    serviceDays: [
      new Schema({
        _id: false,
        day: { type: String, default: "monday", lowercase: true },
        status: { type: Boolean, default: false },
        timing: {
          startTime: { type: String },
          endTime: { type: String },
        },
      }),
    ],
    serviceCharge: {
      charge: { type: Number, default: 150 },
      chargeType: { type: String, default: "HOUR" },
    },
    specialization: { type: String, default: null, lowercase: true },
    experience: { type: Number, default: 0 },
    description: { type: String, default: null, lowercase: true },
    isDeleted: { type: Date, default: null },
    serviceId: {
      type: Schema.Types.ObjectId,
      ref: "Service",
      required: true,
    },
    partnerId: {
      type: Schema.Types.ObjectId,
      ref: "Partner",
      required: true,
    },
  },
  {
    timestapms: true,
  }
);
module.exports = mongoose.model("PartnerService", modelPartnerService);

// const {
//     serviceAreaPincode,
//     serviceCharge,
//     serviceAreaLatitude,
//     serviceAreaLongitude,
//     serviceAreaRange,
//     serviceDays,
//     serviceImages,
//     status,
//     partnerId,
//     serviceId
// };

// for testing purpose
// {
//     "serviceAreaPincode":248001,
//     "serviceCharge":{
//         "charge":750,
//         "chargeType":"DAY"
//     },
//     "serviceAreaLatitude":30.132462374,
//     "serviceAreaLongitude":78.04827476,
//     "serviceAreaRange":20,
//     "days":[
//         {
//             "day":"monday",
//             "status":true,
//             "timing":{
//                 "startTime":"10:30",
//                 "endTime":"20:00"
//             }
//         },
//         {
//             "day":"tuesday",
//             "status":true,
//             "timing":{
//                 "startTime":"10:30",
//                 "endTime":"20:00"
//             }
//         },
//         {
//             "day":"wednesday",
//             "status":true,
//             "timing":{
//                 "startTime":"10:30",
//                 "endTime":"20:00"
//             }
//         },
//         {
//             "day":"thursday",
//             "status":true,
//             "timing":{
//                 "startTime":"10:30",
//                 "endTime":"20:00"
//             }
//         },
//         {
//             "day":"friday",
//             "status":true,
//             "timing":{
//                 "startTime":"10:30",
//                 "endTime":"20:00"
//             }
//         }
//     ],
//     "status":true,
//     "partnerId":"5f7714cd8383cb3b2831fb21",
//     "partnerDetailId":"5f7714cd8383cb3b2831fb21",
//     "serviceId":"5f7714cd8383cb3b2831fb21"
// }

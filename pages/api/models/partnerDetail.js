const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const modelPartnerDetail = Schema(
  {
    fatherName: {
      type: String,
      required: [true, "Father name is required!"],
      lowercase: true,
    },
    alternateMobile: { type: String, required: true },
    uniqueIdentityNumber: { type: String, required: true, unique: true },
    image: { type: String, default: "default-image.jpg" },
    dob: { type: Date, required: true },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
      required: true,
    },
    maritalStatus: {
      type: String,
      enum: ["married", "unmarried"],
      required: true,
    },
    isDeleted: { type: Date, default: null },
    isApproved: { type: Date, default: null },
    referencedBy: { type: String },
    partnerId: { type: Schema.Types.ObjectId, ref: "Partner", required: true },
    address: {
      local: {
        streetNumber: { type: String, required: true },
        street: { type: String, required: true, lowercase: true },
        pincode: { type: Number, required: true },
        city: { type: String, required: true, lowercase: true },
        state: { type: String, required: true, lowercase: true },
        landMark: { type: String, required: true, lowercase: true },
      },
      permanent: {
        streetNumber: { type: String, required: true },
        street: { type: String, required: true, lowercase: true },
        pincode: { type: Number, required: true },
        city: { type: String, required: true, lowercase: true },
        state: { type: String, required: true, lowercase: true },
        landMark: { type: String, required: true, lowercase: true },
      },
      location: new Schema({
        _id: false,
        type: { type: String, default: "Point" },
        coordinates: [],
      }),
    },
  },
  {
    timestapms: true,
  }
);

modelPartnerDetail.index({ "address.location": "2dsphere" });

module.exports = mongoose.model("PartnerDetail", modelPartnerDetail);

// const { firstName,lastName,fatherName,mobile1,mobile2,aadhar,gender,address,referencedBy,maritalStatus,partnerId}

// {
//     "firstName":"mukesh",
//     "lastName":"singh",
//     "fatherName":"mahesh singh",
//     "mobile1":"9876543210",
//     "mobile2":"9876523422",
//     "aadhar":"123456789012",
//     "gender":"male",
//     "maritalStatus":"unmarried",
//     "referencedBy": "online",
//     "partnerId":"5f7714cd8383cb3b2831fb21",
//     "address":{
//         "local":{
//             "streetNumber":223,
//             "street":"govind garh",
//             "city":"5f7714cd8383cb3b2831fb21",
//             "pincode":248001
//         },
//         "permanent": {
//             "streetNumber":223,
//             "street":"govind garh",
//             "city":"5f7714cd8383cb3b2831fb21",
//             "pincode":248001
//         },
//         "location":{
//             "latitude":30.0729164847,
//             "longitude":78.497557384
//         }
//     }
// }

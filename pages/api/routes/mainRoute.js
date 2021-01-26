const {
  partnerServiceDetails,
  getServiceListByServiceId,
  getServiceListByLocation,
  getServiceListByCity,
  getServiceListByPincode,
} = require("../controllers/partnerService.controller");

const {
  partnerRegister,
  partnerDetail,
  partnerLogin,
  updatePartnerDetail,
  getPartner,
  updatePartnerImage,
  getPartnerDetailById,
  getPartnerDetails,
  partnerApproval,
} = require("../controllers/partner.controller");

const {
  addService,
  getAllServices,
  getTopServices,
} = require("../controllers/service.controller");

const {
  partnerComment,
  userComment,
  getUserComments,
  postComment,
  getPartnerComments,
} = require("../controllers/comment.controller");

const {
  createUser,
  updateUserProfile,
  updateUserImage,
  getAllUsers,
  getUser,
  userLogin,
} = require("../controllers/user.controller");

const { checkAuth } = require("../middlewares/checkAuth");
const router = require("express").Router();

const {
  updateLeadByCalling,
  getPartnerLead,
  getPartnerDetailAndUpdateLeads,
} = require("../controllers/lead.controller");
const {
  uploadPartner,
  uploadUser,
  uploadServiceIcon,
} = require("../middlewares/uploads");
const {
  sendComplaint,
  readComplaints,
  getAllPartnerComplaints,
  partnerDeleteComplaint,
  getAllUserComplaints,
} = require("../controllers/complaintController");
const {
  createStateAndCity,
  getAllStateAndCity,
} = require("../controllers/stateAndCity.controller");
const uploadPartnerImage = uploadPartner();
const uploadUserImage = uploadUser();
const uploadService = uploadServiceIcon();

/*
|--------------------------------------------------------------------------
| Post Api
|--------------------------------------------------------------------------
*/

//To add servives
router.post("/add/service", uploadService.single("icon"), addService);

//partners registration
router.post("/partner/register", partnerRegister);

//partner signin
router.post("/partner/login", partnerLogin);

// To insert partner details
router.post(
  "/partner/detail",
  uploadPartnerImage.single("image"),
  partnerDetail
);

//To insert partner service details
router.post("/partner/service/detail", partnerServiceDetails);

//User registeration
router.post("/user/register", createUser);

//User login
router.post("/user/login", userLogin);

//User commenting for Partners
router.post("/user/comment", postComment);

//send comment api
router.post("/send/complaint", sendComplaint);

//create state and city
router.post("/create/state/city", createStateAndCity);

// //Lead generate and update user view number
// router.post("/view/lead", createUpdateLead);

//Lead generate and update user view number
router.get(
  "/user/get/partner/details/:partnerId",
  getPartnerDetailAndUpdateLeads
);

/*
|--------------------------------------------------------------------------
| Get Api
|--------------------------------------------------------------------------
*/

//get all services
router.get("/services", getAllServices);

//get specific service by service ID
router.get("/services/:serviceId", getServiceListByServiceId);

//get all partner service list
router.get("/services/:serviceId/query", getServiceListByLocation);

//get all partner service list by service id and city name
router.get("/services/:serviceId/:city", getServiceListByCity);

//get all partner service list by service id and pincode
router.get("/services/:serviceId/:city/:pincode", getServiceListByPincode);

//get all users
router.get("/all/users", getAllUsers);

//get all users
router.get("/user", getUser);
//get all users
router.get("/partner", getPartner);

//get partner details
router.get("/partner/details/:partnerId", getPartnerDetailById);

//get all partner complaints
router.get("/partner/complaints", getAllPartnerComplaints);

//get all user complaints
router.get("/user/complaints", getAllUserComplaints);

//get all partner leads
router.get("/partner/leads", getPartnerLead);

//get all partner leads
router.get("/partner/comments/:partnerId", getPartnerComments);

//get all partner details
router.get("/admin/partner/details", getPartnerDetails);

//get all states and cities
router.get("/all/states/cities", getAllStateAndCity);

//get all top Services
router.get("/top/service", getTopServices);

/*
|--------------------------------------------------------------------------
| Put and Patch Update Api
|--------------------------------------------------------------------------
*/

//update user profile data
router.patch("/update/user/profile", updateUserProfile);

//upload user image
router.patch(
  "/update/user/image",
  uploadUserImage.single("image"),
  updateUserImage
);

//update partner profile data
router.patch("/update/partner/detail", updatePartnerDetail);

//update partner approval
router.patch("/partner/approval", partnerApproval);

//update partner profile image
router.patch(
  "/update/partner/image",
  uploadPartnerImage.single("image"),
  updatePartnerImage
);

//Leade generate and update
router.patch("/read/complaint", readComplaints);

//Update lead user calling date time
router.patch("/calling/lead", updateLeadByCalling);

/*
|--------------------------------------------------------------------------
| Delete Api
|--------------------------------------------------------------------------
*/
//delete partner complaints
router.delete("/partner/delete/complaint/:complaintId", partnerDeleteComplaint);
module.exports = router;

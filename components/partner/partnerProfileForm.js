import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import imageCompression from 'browser-image-compression';
import MomentUtils from '@date-io/moment';
import MenuItem from '@material-ui/core/MenuItem';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import {
	regxFirstName,
	regxLastName,
	regxMobileNumber,
	regxAltMobileNumber,
	regxFatherName,
	regxAadharNumber,
	regxPinCode,
	regxEmail
} from '../../regulaExpression';
import Axios from 'axios';
import { getServices } from '../../store/actions/serviceAction';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { CloudUpload, CompassCalibration, LocationOnSharp } from '@material-ui/icons';
import { useAuth } from '../../auth/useAuth';
import Icon from '@mdi/react';
import { mdiCrosshairsGps } from '@mdi/js';
import Switch from '@material-ui/core/Switch';
import { Box, Chip, Divider, FormControlLabel, Paper } from '@material-ui/core';
import GoogleMapDialog from '../googleMapDialog';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		width: '100%'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(3)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	},
	locationButton: {
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff'
	},
	detailPaper: {
		paddingTop: 20,
		paddingBottom: 20,
		paddingLeft: 15,
		paddingRight: 15,
		marginTop: 10,
		marginBottom: 10
	},
	btnSubmit: {
		borderRadius: 50,
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		},
		marginRight: 10,
		paddingLeft: 10,
		paddingRight: 10
	}
}));

// Making option for gender field
const genderFunction = [
	{
		value: 'male',
		label: 'Male'
	},
	{
		value: 'female',
		label: 'Female'
	},
	{
		value: 'others',
		label: 'Others'
	}
];

//making option for marital status field
const maritalFunction = [
	{
		value: 'married',
		label: 'Married'
	},
	{
		value: 'unmarried',
		label: 'Unmarried'
	}
];

//making option for Reference field

const referenceByFunction = [
	{
		value: 'social media',
		label: 'Social Media'
	},
	{
		value: 'news paper',
		label: 'News Paper'
	},
	{
		value: 'friends',
		label: 'Friends'
	},
	{
		value: 'other',
		label: 'Other'
	}
];

//making function to create partner profile
function PartnerProfileForm(props) {
	const { partner } = useAuth();
	useEffect(() => {
		if (props.services == null) {
			props.dispatch(getServices());
		}
	}, []);
	const isEdit = props.action === 'edit' ? true : false;

	const classes = useStyles();
	const [ date, setDate ] = useState(new Date('01/01/2020'));
	const [ responseError, setResponseError ] = useState(null);

	// Declared state variables for the partner profile  page field
	const [ firstName, setFirstName ] = useState(partner.firstName);
	const [ lastName, setLastName ] = useState(partner.lastName);
	const [ mobileNumber, setMobileNumber ] = useState(partner.mobile);
	const [ altMobileNumber, setAltMobileNumber ] = useState(isEdit ? partner.partnerDetails.alternateMobile : null);
	const [ email, setEmail ] = useState(partner.email);
	const [ fatherName, setFatherName ] = useState(isEdit ? partner.partnerDetails.fatherName : null);
	const [ aadharNumber, setAadharNumber ] = useState(isEdit ? partner.partnerDetails.uniqueIdentityNumber : null);
	const [ gender, setGender ] = React.useState(isEdit ? partner.partnerDetails.gender : null);

	const [ dob, setDob ] = useState(new Date(isEdit ? partner.partnerDetails.dob : '01/01/2000'));
	const [ maritalStatus, setMaritalStatus ] = React.useState(isEdit ? partner.partnerDetails.maritalStatus : null);
	const [ referenceBy, setReferenceBy ] = useState(isEdit ? partner.partnerDetails.referencedBy : null);
	const [ uploadPhoto, setUploadPhoto ] = useState(null);
	const [ currentStreetNumber, setCurrentStreetNumber ] = useState(
		isEdit ? partner.partnerDetails.address.local.streetNumber : null
	);
	const [ currentStreetName, setCurrentStreetName ] = useState(
		isEdit ? partner.partnerDetails.address.local.street : null
	);

	const [ permanentStreetNumber, setPermanentStreetNumber ] = useState(
		isEdit ? partner.partnerDetails.address.permanent.streetNumber : null
	);
	const [ permanentStreetName, setPermanentStreetName ] = useState(
		isEdit ? partner.partnerDetails.address.permanent.street : null
	);
	const [ currentPinCode, setCurrentPinCode ] = useState(
		isEdit ? partner.partnerDetails.address.local.pincode : null
	);
	const [ currentCity, setCurrentCity ] = useState(isEdit ? partner.partnerDetails.address.local.city : null);
	const [ permanentPinCode, setPermanentPinCode ] = useState(
		isEdit ? partner.partnerDetails.address.permanent.pincode : null
	);
	const [ permanentCity, setPermanentCity ] = useState(isEdit ? partner.partnerDetails.address.permanent.city : null);

	const [ currentLandmark, setCurrentLandmark ] = useState(
		isEdit ? partner.partnerDetails.address.local.landMark : null
	);
	const [ currentState, setCurrentState ] = useState(isEdit ? partner.partnerDetails.address.local.state : null);
	const [ permanentLandmark, setPermanentLandmark ] = useState(
		isEdit ? partner.partnerDetails.address.permanent.landMark : null
	);
	const [ permanentState, setPermanentState ] = useState(
		isEdit ? partner.partnerDetails.address.permanent.state : null
	);
	const [ location, setLocation ] = useState(
		isEdit
			? {
					longitude: partner.partnerDetails.address.location.coordinates[0],
					latitude: partner.partnerDetails.address.location.coordinates[1]
				}
			: null
	);

	const handleChange = (event) => {
		setState({ ...state, [event.target.name]: event.target.checked });
	};

	const [ error, setError ] = useState({
		firstNameError: false,
		lastNameError: false,
		mobileNumberError: false,
		altMobileNumber: false,
		aadharNumberError: false,
		currentPinCodeError: false,
		permanentPinCodeError: false,
		genderError: false,
		referenceByError: false,
		maritalStatusError: false,
		currentStreetNumberError: false,
		currentStreetNameError: false,
		currentCityError: false,
		permanentStreetNumberError: false,
		permanentStreetNameError: false,
		permanentCityError: false,
		uploadPhotoError: false,
		emailError: false,
		currentLandmarkError: false,
		currentStateError: false,
		permanentLandmarkError: false,
		permanentStateError: false,
		serviceStatusError: false
	});
	// making function to handle the data
	const handleDateChange = (date) => {
		setDob(date);
	};

	//devoloped function for image compress
	async function handleImageUpload(event) {
		const imageFile = event.target.files[0];

		console.log('originalFile instanceof Blob', imageFile instanceof Blob); // true
		console.log(`originalFile size ${imageFile.size / 1024 / 1024} `);

		const options = {
			maxSizeMB: 0.1,
			maxWidthOrHeight: 1920,
			useWebWorker: true
		};
		try {
			const compressedFile = await imageCompression(imageFile, options);
			let imgBlobToFile = new File([ compressedFile ], imageFile.name, {
				lastModified: Date.now(),
				type: 'image/jpeg'
			});
			setUploadPhoto(imgBlobToFile);

			console.log('compressedFile instanceof Blob', uploadPhoto instanceof Blob); // true
			console.log(`compressedFile size ${uploadPhoto.size / 1024 / 1024} MB`); // smaller than maxSizeMB

			// await uploadToServer(compressedFile); // write your own logic
			console.log(uploadPhoto);
			console.log('uploaded successfully');
		} catch (error) {
			console.log(error);
		}
	}

	const handleSubmitData = () => {
		//condition to check {firstName,lastName,mobileNumber,altmobileNumber,email,fatherName,gender,aadharNumber,reference,photoUpload} validation
		if (!(firstName != null && regxFirstName.test(firstName))) {
			setError({ firstNameError: true });
		} else if (!(lastName != null && regxLastName.test(lastName))) {
			setError({ lastNameError: true });
		} else if (!(mobileNumber != null && regxMobileNumber.test(mobileNumber))) {
			setError({ mobileNumberError: true });
		} else if (!(altMobileNumber != null && regxAltMobileNumber.test(altMobileNumber))) {
			setError({ altMobileNumberError: true });
		} else if (!(email != null && regxEmail.test(email))) {
			setError({ emailError: true });
		} else if (!(fatherName != null && regxFatherName.test(fatherName))) {
			setError({ fatherNameError: true });
		} else if (!(aadharNumber != '' && regxAadharNumber.test(aadharNumber))) {
			setError({ aadharNumberError: true });
		} else if (gender == null) {
			setError({ genderError: true });
		} else if (gender == null) {
			setError({ genderError: true });
		} else if (dob == null) {
			setError({ dobError: true });
		} else if (maritalStatus == null) {
			setError({ maritalStatusError: true });
		} else if (referenceBy == null) {
			setError({ referenceByError: true });
		} else if (uploadPhoto == null) {
			setError({ uploadPhotoError: true });
			// alert("please upload your photo");
		} else if (currentStreetNumber == null) {
			//condition to check validation of current address
			setError({ currentStreetNumberError: true });
		} else if (currentStreetName == null) {
			setError({ currentStreetNameError: true });
		} else if (!(currentPinCode != null && regxPinCode.test(currentPinCode))) {
			setError({ currentPinCodeError: true });
		} else if (currentCity == null) {
			setError({ currentCityError: true });
		} else if (currentLandmark == null) {
			setError({ currentLandmarkError: true });
		} else if (currentState == null) {
			setError({ currentStateError: true });
		} else if (permanentStreetNumber == null) {
			//condition to check validation of permanent address
			setError({ permanentStreetNumberError: true });
		} else if (permanentStreetName == null) {
			setError({ permanentStreetNameError: true });
		} else if (!(permanentPinCode != null && regxPinCode.test(permanentPinCode))) {
			setError({ permanentPinCodeError: true });
		} else if (permanentCity == null) {
			setError({ permanentCityError: true });
		} else if (permanentLandmark == null) {
			setError({ permanentLandmarkError: true });
		} else if (permanentState == null) {
			setError({ permanentStateError: true });
		} else if (location == null) {
			alert('Please on your current location');
		} else {
			let formData = new FormData();
			formData.append('partnerId', partner._id);
			formData.append('alternateMobile', altMobileNumber);
			formData.append('fatherName', fatherName);
			formData.append('uniqueIdentityNumber', aadharNumber);
			formData.append('gender', gender);
			formData.append('dob', dob);
			formData.append('maritalStatus', maritalStatus);
			formData.append('referencedBy', referenceBy);
			formData.append('image', uploadPhoto);
			formData.append('localStreetNumber', currentStreetNumber);
			formData.append('localStreet', currentStreetName);
			formData.append('localCity', currentCity);
			formData.append('localPincode', Number(currentPinCode));
			formData.append('localState', currentState);
			formData.append('localLandMark', currentLandmark);
			formData.append('permanentStreetNumber', permanentStreetNumber);
			formData.append('permanentStreet', permanentStreetName);
			formData.append('permanentCity', permanentCity);
			formData.append('permanentPincode', Number(permanentPinCode));
			formData.append('permanentState', permanentState);
			formData.append('permanentLandMark', permanentLandmark);
			formData.append('longitude', location.longitude);
			formData.append('latitude', location.latitude);

			if (isEdit) {
				profileUpdate(formData);
			} else {
				profilePost(formData);
			}
		}
	};

	const profileUpdate = async (data) => {
		try {
			const res = await Axios.patch('/api/update/partner/detail', data);
			if (res != null && res.data.status) {
				props.next(1);
			} else {
				// setResponseError(res.data.message);
				console.log(res.data.message);
			}
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	// This function is used for map local Address to permanent Address

	const handleSameLocalAddress = () => {
		setPermanentStreetNumber(currentStreetNumber);
		setPermanentStreetName(currentStreetName);
		setPermanentPinCode(currentPinCode);
		setPermanentCity(currentCity);
		setPermanentLandmark(currentLandmark);
		setPermanentState(currentState);
	};

	const profilePost = async (data) => {
		try {
			const res = await Axios.post('/api/partner/detail', data);
			if (res != null && res.data.status) {
				props.next(1);
			} else {
				// setResponseError(res.data.message);
				console.log(res.data.message);
			}
			console.log(res.data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<MuiPickersUtilsProvider utils={MomentUtils}>
			<Container>
				<CssBaseline />
				<div className={classes.paper}>
					{responseError && responseError}
					<Paper className={classes.detailPaper}>
						<Typography variant="h5">PERSONAL DETAILS</Typography>
						<Divider />
						<Grid container spacing={5} style={{ marginTop: 20 }}>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									required
									fullWidth
									label="First Name"
									size="small"
									error={error.firstNameError}
									helperText={error.firstNameError == true ? 'please enter first name!' : ''}
									value={firstName ? firstName : ''}
									onChange={(event) => {
										setFirstName(event.target.value);
										setError({ firstNameError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									name="lastName"
									required
									fullWidth
									id="lastName"
									label="Last Name"
									size="small"
									error={error.lastNameError}
									helperText={error.lastNameError == true ? 'please enter last name!' : ''}
									value={lastName ? lastName : ''}
									onChange={(event) => {
										setLastName(event.target.value);
										setError({ lastNameError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									name="mobileNumber"
									required
									fullWidth
									label="Mobile"
									autoComplete="mobile"
									size="small"
									error={error.mobileNumberError}
									helperText={error.mobileNumberError == true ? 'please enter mobile number!' : ''}
									value={mobileNumber ? mobileNumber : ''}
									onChange={(event) => {
										setMobileNumber(event.target.value);
										setError({ mobileNumberError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									name="altMobileNumber"
									required
									fullWidth
									label="Alternative Number"
									autoComplete="altmobile"
									autoFocus
									size="small"
									error={error.altMobileNumberError}
									helperText={error.altMobileNumberError == true ? 'please enter mobile number!' : ''}
									value={altMobileNumber ? altMobileNumber : ''}
									onChange={(event) => {
										setAltMobileNumber(event.target.value);
										setError({ altMobileNumberError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									required
									fullWidth
									disabled
									id="email"
									size="small"
									label="Email Address"
									name="email"
									autoComplete="email"
									error={error.emailError}
									helperText={error.emailError == true ? 'please enter email' : ''}
									value={email ? email : ''}
									onChange={(event) => {
										setEmail(event.target.value);
										setError({ emailError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									name="fatherName"
									required
									fullWidth
									label="Father Name"
									autoComplete="fatherName"
									size="small"
									error={error.fatherNameError}
									helperText={error.fatherNameError == true ? 'please enter father name!' : ''}
									value={fatherName ? fatherName : ''}
									onChange={(event) => {
										setFatherName(event.target.value);
										setError({ fatherNameError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									name="aadharNumber"
									required
									fullWidth
									label="Aadhar Number"
									size="small"
									error={error.aadharNumberError}
									helperText={error.aadharNumberError == true ? 'please enter ID card number!' : ''}
									value={aadharNumber ? aadharNumber : ''}
									onChange={(event) => {
										setAadharNumber(event.target.value);
										setError({ aadharNumberError: false });
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									name="gender"
									required
									fullWidth
									select
									label="Gender"
									size="small"
									variant="outlined"
									error={error.genderError}
									helperText={error.genderError == true ? 'please select gender!' : ''}
									value={gender ? gender : ''}
									onChange={(event) => {
										setGender(event.target.value);
										setError({ genderError: false });
									}}
								>
									{genderFunction.map((option, index) => (
										<MenuItem key={index} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={3}>
								<KeyboardDatePicker
									InputAdornmentProps={{
										position: 'start'
									}}
									name="dob"
									id="date-picker-dialog"
									label="Date Of Birth"
									inputVariant="outlined"
									size="small"
									fullWidth
									format="DD/MM/yyyy"
									value={dob}
									onChange={handleDateChange}
									KeyboardButtonProps={{
										'aria-label': 'change date'
									}}
								/>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									name="maritalStatus"
									required
									fullWidth
									select
									label="Marital Status"
									autoComplete="maritalStatus"
									size="small"
									variant="outlined"
									error={error.maritalStatusError}
									helperText={error.maritalStatusError == true ? 'please select any option!' : ''}
									value={maritalStatus ? maritalStatus : ''}
									onChange={(event) => {
										setMaritalStatus(event.target.value);
										setError({ maritalStatusError: false });
									}}
								>
									{maritalFunction.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={12} sm={3}>
								<TextField
									variant="outlined"
									name="referenceBy"
									required
									fullWidth
									select
									label="Reference By"
									type="text"
									autoComplete="reference"
									size="small"
									error={error.referenceByError}
									helperText={error.referenceByError == true ? 'please select any option!' : ''}
									value={referenceBy ? referenceBy : ''}
									onChange={(event) => {
										setReferenceBy(event.target.value);
										setError({ referenceByError: false });
									}}
								>
									{referenceByFunction.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</TextField>
							</Grid>
							<Grid item xs={6} sm={3}>
								<label htmlFor="upload-photo">
									<input
										style={{ display: 'none' }}
										id="upload-photo"
										name="uploadPhoto"
										type="file"
										onChange={(event) => {
											handleImageUpload(event);
											setError({ uploadPhotoError: false });
										}}
									/>
									<Button
										variant="outlined"
										color="primary"
										startIcon={<CloudUpload />}
										component="span"
										fullWidth
									>
										{uploadPhoto ? uploadPhoto.name : 'UPLOAD'}
									</Button>
								</label>
							</Grid>
						</Grid>
					</Paper>
					<Paper className={classes.detailPaper}>
						<Grid container spacing={4}>
							<Grid container item xs={12} sm={6} md={6} spacing={5}>
								<Grid item xs={12} sm={12} md={12}>
									<Typography variant="h5">LOCAL ADDRESS</Typography>
									<Divider />
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<div style={{ display: 'flex', alignItems: 'center' }}>
										<Icon
											style={{ marginRight: 5, color: '#773aaf' }}
											path={mdiCrosshairsGps}
											size={1}
										/>
										<GoogleMapDialog coordinates={setLocation} />
										{location && (
											<p>
												{'        '}( {parseFloat(location.latitude).toFixed(4)} -{' '}
												{parseFloat(location.longitude).toFixed(4)} )
											</p>
										)}
									</div>
								</Grid>

								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="H.No / Street No"
										type="text"
										size="small"
										error={error.currentStreetNumberError}
										helperText={
											error.currentStreetNumberError == true ? 'please fill this field !' : ''
										}
										value={currentStreetNumber ? currentStreetNumber : ''}
										onChange={(event) => {
											setCurrentStreetNumber(event.target.value);
											setError({ currentStreetNumberError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="Complete Address"
										type="text"
										autoComplete="reference"
										size="small"
										error={error.currentStreetNameError}
										helperText={error.currentStreetNameError == true ? 'please enter address!' : ''}
										value={currentStreetName ? currentStreetName : ''}
										onChange={(event) => {
											setCurrentStreetName(event.target.value);
											setError({ currentStreetNameError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label=" Pin Code"
										type="text"
										autoComplete="reference"
										size="small"
										error={error.currentPinCodeError}
										helperText={error.currentPinCodeError == true ? 'please enter pincode!' : ''}
										value={currentPinCode ? currentPinCode : ''}
										onChange={(event) => {
											setCurrentPinCode(event.target.value);
											setError({ currentPinCodeError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" currentCity"
										required
										fullWidth
										label="City"
										type="text"
										autoComplete="reference"
										size="small"
										// onChange={(event) => setCurrentCity(event.target.value)}
										error={error.currentCityError}
										helperText={error.currentCityError == true ? 'please enter city!' : ''}
										value={currentCity ? currentCity : ''}
										onChange={(event) => {
											setCurrentCity(event.target.value);
											setError({ currentCityError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" currentLandmark"
										required
										fullWidth
										label="Landmark"
										type="text"
										autoComplete="landmark"
										size="small"
										// onChange={(event) => setCurrentCity(event.target.value)}
										error={error.currentLandmarkError}
										helperText={error.currentLandmarkError == true ? 'please enter landmark!' : ''}
										value={currentLandmark ? currentLandmark : ''}
										onChange={(event) => {
											setCurrentLandmark(event.target.value);
											setError({ currentLandmarkError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" currentState"
										required
										fullWidth
										label="State"
										type="text"
										autoComplete="state"
										size="small"
										// onChange={(event) => setCurrentCity(event.target.value)}
										error={error.currentStateError}
										helperText={error.currentStateError == true ? 'please enter state!' : ''}
										value={currentState ? currentState : ''}
										onChange={(event) => {
											setCurrentState(event.target.value);
											setError({ currentStateError: false });
										}}
									/>
								</Grid>
							</Grid>
							<Grid container item xs={12} sm={6} md={6} spacing={5}>
								<Grid item xs={12} sm={12} md={12}>
									<Typography variant="h5">PERMANENT ADDRESS</Typography>
									<Divider />
								</Grid>
								<Grid item xs={12} sm={12} md={12}>
									<Button onClick={handleSameLocalAddress} variant="outlined" color="primary">
										Same As Local Address
									</Button>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										required
										fullWidth
										label="H.No / Street No"
										type="text"
										autoComplete="reference"
										size="small"
										error={error.permanentStreetNumberError}
										helperText={
											error.permanentStreetNumberError == true ? 'please fill this field!' : ''
										}
										value={permanentStreetNumber ? permanentStreetNumber : ''}
										onChange={(event) => {
											setPermanentStreetNumber(event.target.value);
											setError({ permanentStreetNumberError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" currentCity"
										required
										fullWidth
										label="Complete Address"
										type="text"
										autoComplete="reference"
										size="small"
										error={error.permanentStreetNameError}
										helperText={
											error.permanentStreetNameError == true ? 'please enter address!' : ''
										}
										value={permanentStreetName ? permanentStreetName : ''}
										onChange={(event) => {
											setPermanentStreetName(event.target.value);
											setError({ permanentStreetNameError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" PermanentPinCode"
										required
										fullWidth
										label="Pin Code"
										type="text"
										autoComplete="reference"
										size="small"
										error={error.permanentPinCodeError}
										helperText={error.permanentPinCodeError == true ? 'please enter pincode!' : ''}
										value={permanentPinCode ? permanentPinCode : ''}
										onChange={(event) => {
											setPermanentPinCode(event.target.value);
											setError({ permanentPinCodeError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" currentCity"
										required
										fullWidth
										label="City"
										type="text"
										autoComplete="reference"
										size="small"
										error={error.permanentCityError}
										helperText={error.permanentCityError == true ? 'please enter gity!' : ''}
										value={permanentCity ? permanentCity : ''}
										onChange={(event) => {
											setPermanentCity(event.target.value);
											setError({ permanentCityError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" permanentLandmark"
										required
										fullWidth
										label="Landmark"
										type="text"
										autoComplete="landmark"
										size="small"
										error={error.permanentLandmarkError}
										helperText={
											error.permanentLandmarkError == true ? 'please enter landmark!' : ''
										}
										value={permanentLandmark ? permanentLandmark : ''}
										onChange={(event) => {
											setPermanentLandmark(event.target.value);
											setError({ permanentLandmarkError: false });
										}}
									/>
								</Grid>
								<Grid item xs={12} sm={6} md={6}>
									<TextField
										variant="outlined"
										name=" permanentState"
										required
										fullWidth
										label="State"
										type="text"
										autoComplete="permanentState"
										size="small"
										error={error.permanentStateError}
										helperText={error.permanentStateError == true ? 'please enter state!' : ''}
										value={permanentState ? permanentState : ''}
										onChange={(event) => {
											setPermanentState(event.target.value);
											setError({ permanentStateError: false });
										}}
									/>
								</Grid>
							</Grid>
						</Grid>
					</Paper>
				</div>
				<Box textAlign="right" marginTop={4} marginBottom={4}>
					{isEdit ? (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.btnSubmit}
							onClick={handleSubmitData}
						>
							Update & Next
						</Button>
					) : (
						<Button
							type="submit"
							variant="contained"
							color="primary"
							className={classes.btnSubmit}
							onClick={handleSubmitData}
						>
							save & Next
						</Button>
					)}
				</Box>
			</Container>
		</MuiPickersUtilsProvider>
	);
}

const mapStateToProps = (state) => {
	return { services: state.serviceReducer.serviceRes };
};

export default connect(mapStateToProps)(PartnerProfileForm);

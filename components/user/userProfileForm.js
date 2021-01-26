import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import MomentUtils from "@date-io/moment";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import {
  regxFirstName,
  regxLastName,
  regxMobileNumber,
  regxAltMobileNumber,
  regxPinCode,
  regxEmail,
} from "../../regulaExpression";
import { CloudUpload, Create, Edit } from "@material-ui/icons";
import Axios from "axios";
import { useAuth, UserProtectedPage } from "../../auth/useAuth";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Avatar, Card, Divider, IconButton } from "@material-ui/core";
import { capitalize } from "../../custome_methods/capitalize";

const useStyles = makeStyles((theme) => ({
  card: {
    margin: 25,
    padding: 30,
    [theme.breakpoints.down("sm")]: {
      margin: 5,
      padding: 10,
    },
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    alignItems: "center",
  },
  avatar: {
    marginTop: theme.spacing(6),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  userImage: {
    height: theme.spacing(15),
    width: theme.spacing(15),
  },
  imgEditBtn: {
    marginLeft: theme.spacing(-6),
    marginTop: theme.spacing(9),
    borderRadius: 50,
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
}));

//making function to create partner profile
export default function UserProfileForm(props) {
  const classes = useStyles();
  const { user } = useAuth();
  const router = useRouter();

  // Declared state variables for the partner profile  page field
  const [img, setImg] = useState(user.image);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [mobileNumber, setMobileNumber] = useState(user.mobile);
  const [email, setEmail] = useState(user.email);
  const [altMobileNumber, setAltMobileNumber] = useState(null);
  const [dob, setDob] = useState(new Date("01/01/2000"));

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [currentStreetNumber, setCurrentStreetNumber] = useState(null);
  const [currentStreetName, setCurrentStreetName] = useState(null);

  const [currentPinCode, setCurrentPinCode] = useState(null);
  const [currentCity, setCurrentCity] = useState(null);

  const [currentLandmark, setCurrentLandmark] = useState(null);
  const [currentState, setCurrentState] = useState(null);

  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,
    mobileNumberError: false,
    altMobileNumber: false,
    currentPinCodeError: false,
    currentStreetNumberError: false,
    currentStreetNameError: false,
    currentCityError: false,
    uploadPhotoError: false,
    emailError: false,
    currentLandmarkError: false,
    currentStateError: false,
  });

  // making function to handle the data
  const handleDateChange = (date) => {
    setDob(date);
  };

  //devoloped function for image compress
  async function handleImageUpload(event) {
    const imageFile = event.target.files[0];

    console.log("originalFile instanceof Blob", imageFile instanceof Blob); // true
    console.log(`originalFile size ${imageFile.size / 1024 / 1024} `);

    const options = {
      maxSizeMB: 0.1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      const compressedFile = await imageCompression(imageFile, options);
      let imgBlobToFile = new File([compressedFile], imageFile.name, {
        lastModified: Date.now(),
        type: "image/jpeg",
      });
      setUploadPhoto(imgBlobToFile);

      console.log(
        "compressedFile instanceof Blob",
        uploadPhoto instanceof Blob
      ); // true
      console.log(`compressedFile size ${uploadPhoto.size / 1024 / 1024} MB`); // smaller than maxSizeMB

      // await uploadToServer(compressedFile); // write your own logic
      console.log(uploadPhoto);
      console.log("uploaded successfully");
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
    } else if (
      !(altMobileNumber != null && regxAltMobileNumber.test(altMobileNumber))
    ) {
      setError({ altMobileNumberError: true });
    } else if (!(email != null && regxEmail.test(email))) {
      setError({ emailError: true });
    } else if (dob == null) {
      setError({ dobError: true });
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
    } else {
      const postData = {
        firstName: firstName,
        lastName: lastName,
        alternateMobile: altMobileNumber,
        dob: dob,
        address: {
          streetNumber: currentStreetNumber,
          street: currentStreetName,
          pinCode: currentPinCode,
          city: currentCity,
          state: currentState,
          landmark: currentLandmark,
        },
      };
      console.log(postData);
      updateUserProfile(postData);
    }
  };

  const updateUserProfile = async (data) => {
    try {
      const res = await Axios.patch("/api/update/user/profile", data, {
        headers: { Authorization: Cookies.getJSON("_dAuthJWToken").token },
      });
      if (res != null && res.data.status) {
        console.log(res.data.message);
        router.push("/user/profile");
      } else {
        console.log(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserProtectedPage>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Container component="main">
          <Grid container spacing={2}>
            <Grid item xs={12} sm={5} />
            <Grid item xs={12} sm={7}>
              <Card className={classes.card}>
                <Typography style={{ textAlign: "center" }} variant="h6">
                  CREATE YOUR PROFILE
                </Typography>
                <Divider />
                <Grid container spacing={6} style={{ marginTop: 20 }}>
                  <Grid item xs={12} sm={12}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <Avatar
                        src={img && img}
                        alt={firstName && capitalize(firstName)}
                        className={classes.userImage}
                      />
                      <label htmlFor="upload-photo">
                        <input
                          style={{ display: "none" }}
                          id="upload-photo"
                          name="uploadPhoto"
                          type="file"
                          onChange={(event) => {
                            handleImageUpload(event);
                            setError({ uploadPhotoError: false });
                          }}
                        />
                        <IconButton
                          variant="contained"
                          color="inherit"
                          className={classes.imgEditBtn}
                        >
                          <Create />
                        </IconButton>
                      </label>
                    </div>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      autoFocus
                      disabled
                      label="First Name"
                      size="small"
                      error={error.firstNameError}
                      helperText={
                        error.firstNameError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={firstName ? firstName : ""}
                      onChange={(event) => {
                        setFirstName(event.target.value);
                        setError({ firstNameError: false });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="lastName"
                      required
                      fullWidth
                      disabled
                      id="lastName"
                      label="Last Name"
                      autoComplete="lname"
                      size="small"
                      error={error.lastNameError}
                      helperText={
                        error.lastNameError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={lastName ? lastName : ""}
                      onChange={(event) => {
                        setLastName(event.target.value);
                        setError({ lastNameError: false });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="mobileNumber"
                      required
                      disabled
                      fullWidth
                      label="Mobile"
                      autoComplete="mobile"
                      size="small"
                      error={error.mobileNumberError}
                      helperText={
                        error.mobileNumberError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={mobileNumber ? mobileNumber : ""}
                      onChange={(event) => {
                        setMobileNumber(event.target.value);
                        setError({ mobileNumberError: false });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name="altMobileNumber"
                      required
                      fullWidth
                      label="Alternative Number"
                      autoComplete="altmobile"
                      size="small"
                      error={error.altMobileNumberError}
                      helperText={
                        error.altMobileNumberError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={altMobileNumber ? altMobileNumber : ""}
                      onChange={(event) => {
                        setAltMobileNumber(event.target.value);
                        setError({ altMobileNumberError: false });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      id="email"
                      disabled
                      size="small"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      error={error.emailError}
                      helperText={
                        error.emailError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={email ? email : ""}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setError({ emailError: false });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <KeyboardDatePicker
                      InputAdornmentProps={{
                        position: "end",
                      }}
                      // margin="normal"
                      name="dob"
                      id="date-picker-dialog"
                      // validLabel="Date Of Birth"
                      label="DOB"
                      inputVariant="standard"
                      size="small"
                      fullWidth
                      format="DD/MM/yyyy"
                      value={dob ? dob : ""}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      label="House No."
                      type="text"
                      autoComplete="reference"
                      size="small"
                      error={error.currentStreetNumberError}
                      helperText={
                        error.currentStreetNumberError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={currentStreetNumber ? currentStreetNumber : ""}
                      onChange={(event) => {
                        setCurrentStreetNumber(event.target.value);
                        setError({ currentStreetNumberError: false });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      label=" Street Name"
                      type="text"
                      autoComplete="reference"
                      size="small"
                      // onChange={(event) => setCurrentStreetName(event.target.value)}
                      error={error.currentStreetNameError}
                      helperText={
                        error.currentStreetNameError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={currentStreetName ? currentStreetName : ""}
                      onChange={(event) => {
                        setCurrentStreetName(event.target.value);
                        setError({ currentStreetNameError: false });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      label=" Pin Code"
                      type="text"
                      autoComplete="reference"
                      size="small"
                      error={error.currentPinCodeError}
                      helperText={
                        error.currentPinCodeError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={currentPinCode ? currentPinCode : ""}
                      onChange={(event) => {
                        setCurrentPinCode(event.target.value);
                        setError({ currentPinCodeError: false });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name=" currentLandmark"
                      required
                      fullWidth
                      label="Landmark"
                      type="text"
                      autoComplete="landmark"
                      size="small"
                      error={error.currentLandmarkError}
                      helperText={
                        error.currentLandmarkError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={currentLandmark ? currentLandmark : ""}
                      onChange={(event) => {
                        setCurrentLandmark(event.target.value);
                        setError({ currentLandmarkError: false });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={6} style={{ marginTop: 10 }}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      required
                      fullWidth
                      label="City"
                      type="text"
                      autoComplete="city"
                      size="small"
                      error={error.currentCityError}
                      helperText={
                        error.currentCityError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={currentCity ? currentCity : ""}
                      onChange={(event) => {
                        setCurrentCity(event.target.value);
                        setError({ currentCityError: false });
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="standard"
                      name=" currentState"
                      required
                      fullWidth
                      label="State"
                      type="text"
                      autoComplete="state"
                      size="small"
                      // onChange={(event) => setCurrentCity(event.target.value)}
                      error={error.currentStateError}
                      helperText={
                        error.currentStateError == true
                          ? "Please enter correct name!"
                          : ""
                      }
                      value={currentState ? currentState : ""}
                      onChange={(event) => {
                        setCurrentState(event.target.value);
                        setError({ currentStateError: false });
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container style={{ marginTop: 20 }}>
                  <Grid item xs={12} sm={12}>
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      onClick={handleSubmitData}
                      fullWidth
                    >
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </MuiPickersUtilsProvider>
    </UserProtectedPage>
  );
}

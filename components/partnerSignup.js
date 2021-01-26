import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "next/link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import {
  regxEmail,
  regxFirstName,
  regxLastName,
  regxMobileNumber,
  regxPassword,
} from "../regulaExpression";
import { spacing } from "@material-ui/system";
import { partnerRegister } from "../store/actions/partnerAction";
import { connect } from "react-redux";
import { Backdrop, Card, CircularProgress } from "@material-ui/core";
import { useRouter } from "next/router";
import Axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "../auth/useAuth";
import { FormatListNumberedTwoTone } from "@material-ui/icons";

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
  typography: {
    marginBottom: "1em",
  },

  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  //backdrop

  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

function SignUp(props) {
  const classes = useStyles();
  const router = useRouter();
  const { setPartnerData, setTokenData } = useAuth();

  // Declared state variables for the signup page field
  const [isAcceptPolicy, setIsAcceptPolicy] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [responseError, setResponseError] = useState(null);
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    firstNameError: false,
    lastNameError: false,

    emailError: false,
    mobileNumberError: false,
    passwordError: false,
    confirmPasswordError: false,
    usernameError: false,
    isAcceptPolicyError: false,
  });

  // Created BackDrop
  const [open, setOpen] = React.useState(false);

  // making function to handle the data
  const handleSubmitData = () => {
    if (!(firstName != "" && regxFirstName.test(firstName))) {
      setError({ firstNameError: true });
    } else if (!(lastName != "" && regxLastName.test(lastName))) {
      setError({ lastNameError: true });
    } else if (username === "") {
      setError({ usernameError: true });
    } else if (!(email != "" && regxEmail.test(email))) {
      setError({ emailError: true });
    } else if (!(mobile != "" && regxMobileNumber.test(mobile))) {
      setError({ mobileNumberError: true });
    } else if (!(password != "" && regxPassword.test(password))) {
      setError({ passwordError: true });
    } else if (confirmPassword === "") {
      setError({ confirmPasswordError: true });
    } else {
      if (password !== confirmPassword) {
        setError({ confirmPasswordError: true });
      } else if (!isAcceptPolicy) {
        setError({ isAcceptPolicyError: true });
      } else {
        const postData = {
          mobile,
          firstName,
          lastName,
          username,
          email,
          password,
        };
        partnerRegister(postData);
      }
    }
  };

  const partnerRegister = async (data) => {
    setOpen(true);
    try {
      const res = await Axios.post(`/api/partner/register`, data);
      if (res != null && res.data.status) {
        Cookies.set(
          "_dPartnerToken",
          { token: res.data.token, userType: "partner" },
          { expires: 7 }
        );

        const { data: partner } = await Axios.get("/api/partner", {
          headers: { Authorization: res.data.token },
        });
        if (partner.status) {
          setPartnerData(partner.data);
          setTokenData(res.data.token);
          setOpen(false);
          router.replace("/partner");
        }
      } else {
        setOpen(false);
        setResponseError(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      {responseError && <h1>{responseError}</h1>}
      <CssBaseline />
      <Card className={classes.card}>
        <Backdrop className={classes.backdrop} open={open}>
          <CircularProgress color="inherit" />
        </Backdrop>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.typography}>
          Sign up
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="firstName"
              variant="outlined"
              required
              autoFocus
              fullWidth
              id="firstName"
              label="First Name"
              size="small"
              error={error.firstNameError}
              helperText={
                error.firstNameError == true ? "Please enter correct name!" : ""
              }
              value={firstName}
              onChange={(event) => {
                setFirstName(event.target.value);
                setError({ firstNameError: false });
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Last Name"
              size="small"
              error={error.lastNameError}
              helperText={
                error.lastNameError == true ? "Please enter correct name!" : ""
              }
              value={lastName}
              onChange={(event) => {
                setLastName(event.target.value);
                setError({ lastNameError: false });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Username"
              size="small"
              error={error.usernameError}
              helperText={
                error.usernameError == true ? "Please enter correct name!" : ""
              }
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
                setError({ usernameError: false });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Email Address"
              size="small"
              error={error.emailError}
              helperText={
                error.emailError == true ? "Please enter correct name!" : ""
              }
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setError({ emailError: false });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Mobile Number"
              size="small"
              error={error.mobileNumberError}
              helperText={
                error.mobileNumberError == true
                  ? "Please enter correct name!"
                  : ""
              }
              value={mobile}
              onChange={(event) => {
                setMobile(event.target.value);
                setError({ mobileNumberError: false });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label="Password"
              type="password"
              size="small"
              error={error.passwordError}
              helperText={
                error.passwordError == true
                  ? " Password Contains Minimum Six Characters, At Least One Letter And One Number:"
                  : ""
              }
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
                setError({ passwordError: false });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              label=" Confirm Password"
              type="password"
              size="small"
              error={error.confirmPasswordError}
              helperText={
                error.confirmPasswordError == true
                  ? "Password doen't match"
                  : ""
              }
              value={confirmPassword}
              onChange={(event) => {
                setConfirmPassword(event.target.value);
                setError({ confirmPasswordError: false });
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  value="acceptDoorestPolicy"
                  onChange={(event) => {
                    if (!isAcceptPolicy) {
                      setError({ isAcceptPolicyError: false });
                    }
                    setIsAcceptPolicy(event.target.checked);
                  }}
                  color="primary"
                  checked={isAcceptPolicy}
                />
              }
              label="Accept Doorest Policy"
            />
          </Grid>
          {error.isAcceptPolicyError && (
            <Typography variant="p" style={{ color: "red", marginLeft: 45 }}>
              Please Accept Doorest Policy
            </Typography>
          )}
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmitData}
        >
          Sign Up
        </Button>
        <Grid container justify="flex-end">
          <Grid item>
            <Link href="/partner/signin">Already have an account? Sign in</Link>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { response: state.partnerReducer.partnerRegisterRes };
};

export default connect(mapStateToProps)(SignUp);

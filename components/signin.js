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
import { regxEmail } from "../regulaExpression";
import { useAuth } from "../auth/useAuth";
import Axios from "axios";
import { Backdrop, Card, CircularProgress, Snackbar } from "@material-ui/core";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { Alert } from "@material-ui/lab";

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
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const { setUserData, setPartnerData, setTokenData } = useAuth();
  const router = useRouter();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signinError, setSigninError] = useState(null);

  const [error, setError] = useState({
    emailError: false,

    passwordError: false,
  });
  const handleSubmitData = () => {
    if (email == "") {
      setError({ emailError: true });
    } else if (password == null) {
      setError({ passwordError: true });
    } else {
      switch (props.role) {
        case "admin":
          return setUser("admin");

        case "partner":
          signin({
            username: email,
            email: email,
            mobile: email,
            userType: "partner",
            password,
          });
          break;

        default:
          signin({
            username: email,
            email: email,
            mobile: email,
            userType: "user",
            password,
          });
          break;
      }

      // console.log({ firstName, lastName, email,mobileNumber, password, confirmPassword });
    }
  };

  const signin = async ({ username, email, mobile, password, userType }) => {
    switch (userType.toLowerCase()) {
      //if type is user then run this code of lines
      case "user":
        setOpen(true);
        const userRes = await Axios.post("/api/user/login", {
          username: username || email || mobile,
          password,
        });
        if (userRes.data.token) {
          Cookies.set(
            "_dUserToken",
            { token: userRes.data.token, userType },
            { expires: 7 }
          );

          const { data: user } = await Axios.get("/api/user", {
            headers: { Authorization: userRes.data.token },
          });
          if (user.status) {
            setUserData(user.data);
            setTokenData(userRes.data.token);
            setOpen(false);
            router.replace("/user");
          } else {
            setOpen(false);
            setSigninError(user.message);
          }
        } else {
          setOpen(false);

          setSigninError(userRes.data.message);
        }
        break;

      //if user is partner then run this code of lines
      case "partner":
        setOpen(true);
        const partnerRes = await Axios.post("/api/partner/login", {
          username: username || email || mobile,
          password,
        });
        if (partnerRes.data.token && partnerRes.data.token) {
          Cookies.set(
            "_dPartnerToken",
            { token: partnerRes.data.token, userType },
            { expires: 7 }
          );
          const result = await Axios.get("/api/partner", {
            headers: { Authorization: partnerRes.data.token },
          });
          if (result && result.data.status) {
            setOpen(false);
            setPartnerData(result.data.data);
            setTokenData(partnerRes.data.token);
            router.replace("/partner");
          } else {
            setOpen(false);
            setSigninError(result.data.message);
          }
        } else {
          setOpen(false);
          console.log(partnerRes);
          setSigninError(partnerRes.data.message);
        }
        break;

      default:
        break;
    }
  };
  return (
    <Container component="main" maxWidth="sm">
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
      <CssBaseline />
      <Card className={classes.card}>
        <Snackbar
          open={signinError ? true : false}
          autoHideDuration={6000}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          onClose={() => setSigninError(null)}
        >
          <Alert severity="error">{signinError && signinError}</Alert>
        </Snackbar>

        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        <TextField
          variant="outlined"
          margin="normal"
          size="small"
          required
          fullWidth
          type="email"
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          autoFocus
          autoComplete="email"
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
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          size="small"
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          error={error.passwordError}
          helperText={
            error.passwordError == true ? "Please enter correct name!" : ""
          }
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
            setError({ passwordError: false });
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={handleSubmitData}
        >
          Sign In
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link
              href={
                props.role === "admin"
                  ? "/admin/signup"
                  : props.role === "partner"
                  ? "/partner/signup"
                  : "/user/signup"
              }
            >
              {"Don't have an account? Sign Up"}
            </Link>
          </Grid>
        </Grid>
      </Card>
      <Box mt={8} />
    </Container>
  );
}

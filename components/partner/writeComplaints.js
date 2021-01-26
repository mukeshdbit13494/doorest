import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Paper, Typography } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import SpinnerButton from "../spinnerButton";
import Axios from "axios";
import Cookies from "js-cookie";
import { connect } from "react-redux";
import { getPartnerComplaints } from "../../store/actions/partnerAction";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: 40,
    marginBottom: 30,
    backgroundColor: theme.palette.secondary.light,
    color: "#ffffff",
    borderRadius: 50,
  },
  cancelButton: {
    color: "red",
  },
  reviewHeading: {
    fontSize: "1.5em",
    paddingLeft: 20,
    paddingTop: 15,
    paddingBottom: 15,
    backgroundColor: theme.palette.secondary.light,
    color: "#ffffff",
  },
  textFieldStyle: {
    marginTop: 10,
  },
  textField: {
    padding: 10,
    margin: 15,
  },
}));

function WriteComplains(props) {
  // Write Complaints is used in inbox component

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef();
  const [subject, setSubject] = React.useState("");
  const [complainBody, setComplainBody] = React.useState("");
  const [error, setError] = React.useState({
    subjectError: false,
    complainBodyError: false,
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleButtonClick = () => {
    if (subject === "") {
      setError({ subjectError: true });
    } else if (complainBody === "") {
      setError({ complainBodyError: true });
    } else {
      const postData = { subject, complainBody, userType: "partner" };
      postComplaint(postData);
    }
  };

  // post api for send complaints
  const postComplaint = async (data) => {
    setSuccess(false);
    setLoading(true);
    try {
      const cookie = Cookies.getJSON("_dPartnerToken");
      const token = cookie.token;
      const res = await Axios.post("/api/send/complaint", data, {
        headers: { Authorization: token },
      });
      if (res != null && res.data.status) {
        setSuccess(true);
        setLoading(false);
        setOpen(false);
        props.dispatch(getPartnerComplaints());
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleClickOpen}>
        <Edit /> Write Complaints
        {/* This Write Complaints button will open dialog box */}
      </Button>
      <Dialog
        open={open}
        fullWidth
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {/* Here dialog popup will appear for writing Complaints */}
        <Typography className={classes.reviewHeading} variant="h5">
          Complaint
        </Typography>
        {/* Heading */}
        <div className={classes.textField}>
          <TextField
            // This TextField is for subject
            className={classes.textFieldStyle}
            multiline
            rows={1}
            label="Subject"
            variant="outlined"
            error={error.subjectError}
            helperText={error.subjectError ? "please type subject!" : ""}
            fullWidth
            onChange={(event) => {
              setError({ subjectError: false });
              setSubject(event.target.value);
            }}
          />
          <TextField
            // This textField is for Complaints
            className={classes.textFieldStyle}
            multiline
            rows={10}
            label="Complaint"
            variant="outlined"
            fullWidth
            error={error.complainBodyError}
            helperText={error.complainBodyError ? "please type subject!" : ""}
            onChange={(event) => {
              setError({ complainBodyError: false });
              setComplainBody(event.target.value);
            }}
          />
        </div>
        <DialogActions>
          <Button className={classes.cancelButton} onClick={handleClose}>
            Cancel
            {/* Cancel Button */}
          </Button>
          <SpinnerButton
            click={handleButtonClick}
            loading={loading}
            success={success}
            fullWidth={true}
            color="inherit"
          />
          {/* Spinner button is used for showing loading spinner */}
        </DialogActions>
      </Dialog>
    </div>
  );
}

const mapStateToProps = (state) => {
  return { getComplainData: state.partnerReducer.partnerComplainRes };
};

export default connect(mapStateToProps)(WriteComplains);

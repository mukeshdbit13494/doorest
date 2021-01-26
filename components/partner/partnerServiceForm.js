import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import "date-fns";

import {
  Backdrop,
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Container,
  Divider,
  FormControlLabel,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import SelectDays from "./selectDays";
import { useEffect } from "react";
import { getServices } from "../../store/actions/serviceAction";
import { connect } from "react-redux";
import { useAuth } from "../../auth/useAuth";
import Axios from "axios";
import { capitalize } from "../../custome_methods/capitalize";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
  serviceDetailPaper: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  title: {
    margin: 10,
  },
  btnSubmit: {
    borderRadius: 50,
    [theme.breakpoints.down("sm")]: {
      width: "100%",
    },
    marginRight: 10,
  },
}));

//creating options for Charge type
const chargeTypeFunction = [
  {
    value: "Day",
    label: "Per Day",
  },
  {
    value: "Hour",
    label: "Per Hour",
  },
  {
    value: "Visit",
    label: "Per Visit",
  },
  {
    value: "Month",
    label: "Per Month",
  },
  {
    value: "Year",
    label: "Per Year",
  },
];

function PartnerServiceForm(props) {
  const classes = useStyles();
  const { partner } = useAuth();
  useEffect(() => {
    if (props.data == null) {
      props.dispatch(getServices());
    }
  }, []);

  const isEdit = props.action === "edit" ? true : false;

  const [open, setOpen] = React.useState(false);
  const [responseError, setResponseError] = React.useState(null);
  //creating set variables
  const [serviceStatus, setServiceStatus] = useState(null);
  const [chargeType, setchargeType] = useState(
    isEdit ? partner.partnerServices.serviceCharge.chargeType : null
  );
  const [serviceRange, setServiceRange] = useState(
    isEdit ? partner.partnerServices.serviceAreaRange : 0
  );
  const [experience, setExperience] = useState(
    isEdit ? partner.partnerServices.experience : 0
  );
  const [specialization, setSpecialization] = useState(
    isEdit ? partner.partnerServices.specialization : null
  );
  const [charge, setCharge] = useState(
    isEdit ? partner.partnerServices.serviceCharge.charge : 0
  );
  const [description, setDescription] = useState(
    isEdit ? partner.partnerServices.description : null
  );
  const [serviceDays, setServiceDays] = useState(
    isEdit ? partner.partnerServices.serviceDays : null
  );
  //creating state variable
  const [error, setError] = useState({
    serviceStatusError: false,
    chargeTypeError: false,
    serviceRangeError: false,
    experienceError: false,
    specializationError: false,
    chargeError: false,
  });
  //creating condition to validate different fields
  const handleSubmitData = () => {
    if (serviceStatus == null) {
      setError({ serviceStatusError: true });
    } else if (serviceRange == null) {
      setError({ serviceRangeError: true });
    } else if (experience == null) {
      setError({ experienceError: true });
    } else if (specialization == null) {
      setError({ specializationError: true });
    } else if (charge == null) {
      setError({ chargeError: true });
    } else if (chargeType == null) {
      setError({ chargeTypeError: true });
    } else {
      const postData = {
        serviceAreaRange: Number(serviceRange),
        serviceCharge: {
          charge: Number(charge),
          chargeType,
        },
        partnerId: partner._id,
        serviceId: serviceStatus,
        serviceDays,
        description,
        experience: Number(experience),
        specialization,
      };
      postServiceDetail(postData);
    }
  };

  const handleUpdate = () => {
    props.next(2);
  };

  const postServiceDetail = async (data) => {
    try {
      const res = await Axios.post("/api/partner/service/detail", data);
      if (res != null && res.data.status) {
        setOpen(false);
        props.next(2);
      } else {
        setOpen(false);
        setResponseError(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <Backdrop className={classes.backdrop} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>

      <Grid container spacing={2}>
        <Grid container item xs={12} sm={5}>
          {/* days and time section start */}
          <Paper className={classes.serviceDetailPaper}>
            <Typography variant="h5" className={classes.title}>
              Service Days
            </Typography>
            <Divider />
            <div style={{ marginTop: 20 }}>
              <SelectDays response={setServiceDays} days={serviceDays} />
            </div>
          </Paper>
          {/* days and time section end */}
        </Grid>
        <Grid container item xs={12} sm={7}>
          <Paper className={classes.serviceDetailPaper}>
            <Typography variant="h5" className={classes.title}>
              Service Deatils
            </Typography>
            <Divider />
            <Grid
              container
              item
              xs={12}
              sm={12}
              spacing={4}
              style={{ marginTop: 20 }}
            >
              <Grid item xs={12} sm={4}>
                <TextField
                  name="ServiceStatus"
                  required
                  fullWidth
                  select
                  autoFocus
                  label="Service"
                  autoComplete="ServiceStatus"
                  size="small"
                  variant="outlined"
                  error={error.serviceStatusError}
                  helperText={
                    error.serviceStatusError == true
                      ? "Please enter correct name!"
                      : ""
                  }
                  value={serviceStatus ? serviceStatus : ""}
                  onChange={(event) => {
                    setServiceStatus(event.target.value);
                    setError({ serviceStatusError: false });
                  }}
                >
                  {props.data &&
                    props.data.services.map((option, index) => (
                      <MenuItem key={index} value={option._id}>
                        {capitalize(option.serviceName)}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="Range"
                  required
                  fullWidth
                  autoFocus
                  label=" Service Range(km)"
                  autoComplete="Range"
                  size="small"
                  variant="outlined"
                  error={error.serviceRangeError}
                  helperText={
                    error.serviceRangeError == true
                      ? "Please enter correct name!"
                      : ""
                  }
                  value={serviceRange ? serviceRange : ""}
                  onChange={(event) => {
                    setServiceRange(event.target.value);
                    setError({ serviceRangeError: false });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="Experience"
                  required
                  fullWidth
                  autoFocus
                  label="Experience"
                  autoComplete="Experience"
                  size="small"
                  variant="outlined"
                  error={error.experienceError}
                  helperText={
                    error.experienceError == true
                      ? "Please enter correct name!"
                      : ""
                  }
                  value={experience ? experience : ""}
                  onChange={(event) => {
                    setExperience(event.target.value);
                    setError({ experienceError: false });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="Specialization"
                  required
                  fullWidth
                  autoFocus
                  label="Specialization"
                  autoComplete="Specialization"
                  size="small"
                  variant="outlined"
                  error={error.specializationError}
                  helperText={
                    error.specializationError == true
                      ? "Please enter correct name!"
                      : ""
                  }
                  value={specialization ? specialization : ""}
                  onChange={(event) => {
                    setSpecialization(event.target.value);
                    setError({ specializationError: false });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="Charge"
                  required
                  fullWidth
                  autoFocus
                  label="Charge"
                  autoComplete="Charge"
                  size="small"
                  variant="outlined"
                  error={error.chargeError}
                  helperText={
                    error.chargeError == true
                      ? "Please enter correct name!"
                      : ""
                  }
                  value={charge ? charge : ""}
                  onChange={(event) => {
                    setCharge(event.target.value);
                    setError({ chargeError: false });
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  name="ChargeType"
                  required
                  fullWidth
                  autoFocus
                  label="Charge Type"
                  autoComplete="ChargeType"
                  size="small"
                  select
                  variant="outlined"
                  error={error.chargeTypeError}
                  helperText={
                    error.chargeTypeError == true
                      ? "Please enter correct name!"
                      : ""
                  }
                  value={chargeType ? chargeType : ""}
                  onChange={(event) => {
                    setchargeType(event.target.value);
                    setError({ chargeTypeError: false });
                  }}
                >
                  {chargeTypeFunction.map((option, index) => (
                    <MenuItem key={index} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  name="Description"
                  required
                  fullWidth
                  autoFocus
                  multiline
                  rows={7}
                  label=" Write Description"
                  autoComplete="Description"
                  size="small"
                  variant="outlined"
                  value={description ? description : ""}
                  onChange={(event) => setDescription(event.target.value)}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
      <Box textAlign="right" marginTop={4} marginBottom={4}>
        {isEdit ? (
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.btnSubmit}
            onClick={handleUpdate}
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
            Save & next
          </Button>
        )}
      </Box>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return { data: state.serviceReducer.serviceRes };
};
export default connect(mapStateToProps)(PartnerServiceForm);

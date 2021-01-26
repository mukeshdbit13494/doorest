import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { Autocomplete } from "@material-ui/lab";
import { useState } from "react";
import {
  Button,
  Card,
  Container,
  Divider,
  Grid,
  MenuItem,
  Typography,
} from "@material-ui/core";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  form: {
    padding: 50,
    paddingTop: 10,
  },
  title: {
    paddingLeft: 50,
    paddingTop: 50,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: theme.palette.secondary.light,
    color: "white",
  },
  saveButton: {
    borderRadius: 50,
  },
}));

export default function StateCityForm() {
  const classes = useStyles();
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState({
    stateError: false,
    cityError: false,
  });
  const handleSave = async () => {
    if (state == null || state.trim() === "") {
      setError({ stateError: true });
    } else if (city == null || city.trim() === "") {
      setError({ cityError: true });
    } else {
      try {
        const res = await Axios.post("/api/create/state/city", {
          city,
          state,
          isActive,
        });
        if (res != null) {
          setResponse(res.data.message);
        } else {
          setResponse(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <Container maxWidth="sm">
      <Card>
        <Typography className={classes.title} variant="h5">
          State & City
        </Typography>
        <Divider />
        <Grid container spacing={5} className={classes.form}>
          <Grid item xs={12} sm={12}>
            <Autocomplete
              id="free-solo-demo"
              options={states}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="State"
                  margin="normal"
                  variant="standard"
                  fullWidth
                  error={error.stateError}
                  helperText={error.stateError ? "please add state" : ""}
                />
              )}
              onChange={(event, option) => {
                setError({ stateError: false });
                setState(option);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              label="Add City"
              variant="standard"
              onChange={(e) => {
                setError({ cityError: false });
                setCity(e.target.value);
              }}
              fullWidth
              error={error.cityError}
              helperText={error.cityError ? "please add city" : ""}
            />
          </Grid>
          <Grid item xs={12} sm={12}>
            <TextField
              select
              label="Select"
              value={isActive}
              fullWidth
              onChange={(e) => setIsActive(e.target.value)}
            >
              {[
                { label: "Active", value: true },
                { label: "Inactive", value: false },
              ].map((option, index) => (
                <MenuItem key={index} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={12}>
            <Button
              onClick={handleSave}
              className={classes.saveButton}
              variant="contained"
              color="primary"
              fullWidth
            >
              Save
            </Button>
            <Typography>{response && response}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}

let states = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttarakhand",
  "Uttar Pradesh",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli",
  "Daman and Diu",
  "Delhi",
  "Lakshadweep",
  "Puducherry",
];

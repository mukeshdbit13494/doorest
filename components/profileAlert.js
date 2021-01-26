import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import Link from "next/link";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 20,
  },
  items: {
    display: "flex",
    justifyContent: "center",
    margin: 10,
  },
}));
export default function ProfileAlert(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.items}>
        <Alert variant="filled" severity="error">
          Please Complete Your Profile !
        </Alert>
      </div>
      <div className={classes.items}>
        <Link href={props.redirectURL}>
          <Button variant="contained" color="primary">
            Complete Profile
          </Button>
        </Link>
      </div>
    </div>
  );
}

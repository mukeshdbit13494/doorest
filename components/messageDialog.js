import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import Typography from "@material-ui/core/Typography";
import { Avatar, CardHeader, DialogContentText } from "@material-ui/core";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;

  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <CardHeader
        avatar={
          <Avatar alt={props.complaint.subject} src={props.complaint.subject} />
        }
        action={
          onClose ? (
            <Typography className={classes.details}>
              {" "}
              {props.complaint.date}
            </Typography>
          ) : null
        }
        title={<Typography variant="h6">{props.complaint.subject}</Typography>}
      />
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function MessageDialog(props) {
  // This Message Dialogue will appear when partner will click on user complaint

  return (
    <div>
      <Dialog
        fullWidth
        onClose={props.onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={props.open}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={props.onClose}
          complaint={props.complaint}
        />
        <DialogContent dividers>
          <DialogContentText id="alert-dialog-description">
            {props.complaint.complainBody}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={props.onClose} style={{ color: "red" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

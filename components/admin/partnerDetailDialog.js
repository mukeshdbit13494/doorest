import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import ListItemText from "@material-ui/core/ListItemText";
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import ServiceDetails from "../partner/serviceDetails";
import Availability from "../partner/availability";
import { Container, Grid } from "@material-ui/core";
import ProfileCard from "../partner/profileCard";

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PartnerDetailDialog(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={props.open}
        onClose={props.close}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={props.close}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Sound
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={() => props.onApprove(props.data._id)}
            >
              Approved
            </Button>
            <Button autoFocus color="inherit" onClick={props.close}>
              Decline
            </Button>
          </Toolbar>
        </AppBar>

        <Container>
          <div>
            {props.data && (
              <div>
                <ProfileCard data={props.data} />
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    <ServiceDetails data={props.data} />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Availability
                      data={props.data.partnerServices.serviceDays}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={6}>
                    {/* <Reviews review={props.partnerDetails} /> */}
                    {/* Reviews Global Component */}
                  </Grid>
                  <Grid item xs={12} sm={6} />
                </Grid>
              </div>
            )}
          </div>
        </Container>
      </Dialog>
    </div>
  );
}

import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Avatar } from "@material-ui/core";
import { capitalize } from "../custome_methods/capitalize";
import Link from "next/link";
import PartnerDetailDialog from "./admin/partnerDetailDialog";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    textAlign: "center",
  },
  cardHead: {
    height: 120,
    background: theme.palette.secondary.light,
  },
  cardAvatar: { marginTop: -60, display: "flex", justifyContent: "center" },
  cardFooter: {
    display: "flex",
    justifyContent: "center",
    border: 1,
    borderTopColor: "grey",
  },
}));

export default function ProfileCard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleClickOpen}>
        <div className={classes.cardHead}></div>
        <div className={classes.cardAvatar}>
          <Avatar
            src={props.user.image}
            alt={props.user.firstName}
            style={{
              width: 120,
              height: 120,
            }}
          />
        </div>

        <CardContent>
          <Typography variant="h5" component="h2">
            {capitalize(`${props.user.firstName} ${props.user.lastName}`)}
          </Typography>
          <Typography variant="subtitle1">{props.user.email}</Typography>
        </CardContent>
        <CardActions className={classes.cardFooter}>
          <Typography
            style={{ textAlign: "center" }}
            variant="h5"
            component="h2"
            color="primary"
          >
            {capitalize(props.user.service)}
          </Typography>
        </CardActions>
      </CardActionArea>
      <PartnerDetailDialog
        open={open}
        close={handleClose}
        data={props.data}
        onApprove={props.onApprove}
      />
    </Card>
  );
}

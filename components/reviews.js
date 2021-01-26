import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Card, CardActionArea, Chip, Divider, Paper } from "@material-ui/core";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { Rating } from "@material-ui/lab";
import { capitalize } from "../custome_methods/capitalize";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 40,
  },
  cardStyle: {
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      margin: 10,
    },
  },
  heading: {
    fontSize: "1.3em",
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: theme.palette.secondary.light,
    color: "#ffffff",
  },
  avatar: {
    backgroundColor: red[500],
  },
  details: {
    color: theme.palette.primary.grey,
    marginLeft: theme.spacing(8),
  },
  nameColor: {
    color: theme.palette.secondary.light,
  },
  ratingDiv: {
    display: "flex",
    alignItems: "center",
  },
  ratingChip: {
    marginLeft: 5,
  },
  avatarSize: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
}));

export default function Reviews(props) {
  // Review is the global comonent for all pages which contains write review

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card elevation={2} className={classes.cardStyle}>
        <Paper className={classes.heading}>Reviews</Paper>
        {/* Heading */}
        {props.data.comments.map((item, index) => (
          // Here we are calling data through API
          <div key={index}>
            <CardHeader
              avatar={
                <Avatar
                  alt={item.user.firstName}
                  src={item.user.image}
                  className={classes.avatarSize}
                />
              }
              action={
                <div className={classes.ratingDiv}>
                  <Rating
                    name="read-only"
                    precision={0.5}
                    value={item.rating}
                    readOnly
                  />
                  <Chip
                    label={item.rating}
                    color="primary"
                    className={classes.ratingChip}
                  />
                </div>
              }
              title={
                <Typography className={classes.nameColor}>
                  {capitalize(`${item.user.firstName} ${item.user.lastName}`)}
                </Typography>
              }
            />
            <CardContent>
              <Typography
                className={classes.details}
                variant="subtitle1"
                color="textSecondary"
              >
                {item.comment}
              </Typography>
            </CardContent>
            <CardActionArea></CardActionArea>
            {props.data.comments.length - 1 != index && <Divider />}
            {/* Divider is a global component and are used for creating line between two content */}
          </div>
        ))}
      </Card>
    </div>
  );
}

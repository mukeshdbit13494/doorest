import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { capitalize } from "../../custome_methods/capitalize";

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: 40,
  },
  cardStyle: {
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      margin: 0,
    },
  },
  reviewHeading: {
    fontSize: "1.5em",
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 10,
    backgroundColor: theme.palette.secondary.light,
    color: "#ffffff",
  },
  details: {
    color: theme.palette.primary.grey,
    float: "right",
  },
  nameColor: {
    marginLeft: 20,
    color: theme.palette.secondary.light,
  },
  chip: {
    fontSize: 10,
    marginLeft: 10,
    backgroundColor: theme.palette.primary.main,
    color: "white",
    borderRadius: 30,
    padding: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
  },
}));

export default function CalledUser(props) {
  // Called User Card is for Record page

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card elevation={2} className={classes.cardStyle}>
        <Paper className={classes.reviewHeading} variant="outlined">
          Called user
          {/* Heading */}
        </Paper>
        <List>
          {props.data.map((item, index) =>
            // Here we are directly calling data through API
            {
              item.userCalled.length > 0 && (
                <div key={index}>
                  <ListItem button onClick={() => props.setUser(item)}>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={item.user.image} />
                    </ListItemAvatar>
                    <ListItemText>
                      <Typography className={classes.nameColor} variant="body2">
                        {item.user.firstName
                          ? capitalize(
                              `${item.user.firstName} ${item.user.lastName}`
                            )
                          : "Doorest User"}
                        {<span className={classes.chip}>{item.userView}</span>}
                      </Typography>
                    </ListItemText>
                    <ListItemSecondaryAction>
                      <div>
                        <Typography className={classes.details} variant="body2">
                          {item.lastVisitDate}
                        </Typography>
                        <br />
                        <Typography className={classes.details} variant="body2">
                          {item.lastVisitTime}
                        </Typography>
                      </div>
                    </ListItemSecondaryAction>
                    {/* Divider is used for differing two lines */}
                  </ListItem>
                  {props.data.length - 1 != index && <Divider />}
                </div>
              );
            }
          )}
        </List>
      </Card>
    </div>
  );
}

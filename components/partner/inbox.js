import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Card,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import MessageDialog from "../messageDialog";
import Icon from "@mdi/react";
import { mdiCheckAll, mdiDelete } from "@mdi/js";
import WriteComplains from "./writeComplaints";
import ConfirmationDialog from "../confirmationDialog";

const useStyles = makeStyles((theme) => ({
  desktopStyle: {
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  cardStyle: {
    margin: 10,
    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  reviewHeading: {
    fontSize: "1.5em",
    paddingLeft: 20,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: theme.palette.secondary.light,
    color: "#ffffff",
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },

  // Common style for Mobile and Desktop view

  demo: {
    fontSize: "2.5em",
  },

  //Mobile View

  mobileCard: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

export default function Inbox(props) {
  //  Inbox card is for Complaints page

  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);

  const [open, setOpen] = React.useState(false);
  const [data, setData] = React.useState(null);

  const handleClickOpen = (item) => {
    setData(item);
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className={classes.desktopStyle}>
        <WriteComplains />
        {/* Write Complaints component are for writing partner complaints */}
      </div>
      <Card className={classes.cardStyle}>
        <Paper className={classes.reviewHeading}>Inbox</Paper>
        {/* Heading */}
        <div className={classes.demo}>
          <List dense={dense}>
            {props.data.map((item, index) => (
              // Here data will call from array which is in complaints page
              <div key={index}>
                <ListItem button onClick={() => handleClickOpen(item)}>
                  <ListItemAvatar>
                    <Avatar alt={item.subject} src={item.subject} />
                  </ListItemAvatar>
                  <div style={{ width: 200, whiteSpace: "nowrap" }}>
                    <Box
                      component="div"
                      my={2}
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      <Typography variant="subtitle1">
                        {item.subject}
                      </Typography>
                    </Box>
                  </div>
                  <div
                    style={{
                      width: 650,
                      whiteSpace: "nowrap",
                      color: "#a9a9a9",
                    }}
                  >
                    <Box
                      component="div"
                      my={2}
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      <Typography variant="body2">
                        {item.complainBody}
                      </Typography>
                    </Box>
                  </div>
                  <ListItemSecondaryAction
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.isRead ? (
                      <Icon path={mdiCheckAll} color="primary" size={1} />
                    ) : (
                      <Icon path={mdiCheckAll} color="grey" size={1} />
                    )}
                    <ConfirmationDialog
                      iconButton={true}
                      mdiIcon={mdiDelete}
                      color="red"
                      size={1}
                      onClick={() => props.onDelete(item._id)}
                      message={"Do you want to Delete this complain ?"}
                      title={"Delete Confirmation"}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                {props.data.length - 1 != index && <Divider />}
                {/* Called User component which shows that which user has called on your profile */}
              </div>
            ))}
          </List>
          {data && (
            <MessageDialog complaint={data} open={open} onClose={handleClose} />
          )}
          {/* This Message Dialogue component will appear when partner will click on user complaint */}
        </div>
      </Card>

      {/* Mobile View */}

      <div className={classes.mobileCard}>
        <div className={classes.demo}>
          <List dense={dense}>
            {props.data.map((item, index) => (
              // Here data will call from array which is in complaints page
              <div key={index}>
                <ListItem button onClick={() => handleClickOpen(item)}>
                  <ListItemAvatar>
                    <Avatar alt={item.subject} src={item.subject} />
                  </ListItemAvatar>
                  <div style={{ width: 150, whiteSpace: "nowrap" }}>
                    <Box
                      component="div"
                      my={2}
                      textOverflow="ellipsis"
                      overflow="hidden"
                    >
                      <Typography variant="subtitle1">
                        {item.subject}
                      </Typography>
                      <div style={{ color: "#a9a9a9" }}>
                        <Typography variant="body2">
                          {item.complainBody}
                        </Typography>
                      </div>
                    </Box>
                  </div>
                  <ListItemSecondaryAction
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {item.isRead ? (
                      <Icon path={mdiCheckAll} color="primary" size={1} />
                    ) : (
                      <Icon path={mdiCheckAll} color="grey" size={1} />
                    )}
                    <ConfirmationDialog
                      iconButton={true}
                      mdiIcon={mdiDelete}
                      color="red"
                      size={1}
                      onClick={() => props.onDelete(item._id)}
                      message={"Do you want to Delete this complain ?"}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
                {props.data.length - 1 != index && <Divider />}
                {/* Divider is used for creating a line between two content */}
              </div>
            ))}
          </List>
          {data && (
            <MessageDialog complaint={data} open={open} onClose={handleClose} />
          )}
          {/* This Message Dialogue component will appear when partner will click on user complaint */}
        </div>
      </div>
    </div>
  );
}

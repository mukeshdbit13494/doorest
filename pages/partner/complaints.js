import React, { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/partnerRoutes";
import Inbox from "../../components/partner/inbox";
import CustomSpinner from "../../components/customSpinner";
import { connect } from "react-redux";
import { Button, makeStyles, Snackbar } from "@material-ui/core";
import WriteComplaintDialogButton from "../../components/writeComplaintDialogButton";
import { PartnerProtectedPage, useAuth } from "../../auth/useAuth";
import {
  deletePartnerComplaint,
  getPartnerComplaints,
} from "../../store/actions/partnerAction";
import Head from "next/head";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
  },

  // For Mobile View
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

function Complaints(props) {
  const classes = useStyles();
  const { partner, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [deleteRes, setDeleteRes] = useState({
    status: false,
    message: "",
  });

  useEffect(async () => {
    // Here we are calling Action
    if (props.getComplainData == null) {
      props.dispatch(getPartnerComplaints());
    }
  }, []);

  const deleteComplaint = (id) => {
    deletePartnerComplaint(id, token).then((res) => {
      if (res.status) {
        props.dispatch(getPartnerComplaints());
        setDeleteRes(res);
      } else {
        setDeleteRes(res);
      }
    });
  };

  return (
    <PartnerProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Complaints | Doorest Partner</title>
      </Head>
      <div className={classes.root}>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={partner && partner}
        >
          {/* This is used for dashboard layout */}
          {loading && <CustomSpinner />}
          {/* Custom Spinner will use when our data will come till that time spinner will work */}
          {!loading && (
            <div>
              {props.getComplainData && (
                <Inbox
                  data={props.getComplainData.data}
                  onDelete={deleteComplaint}
                />
              )}
              {/* Inbox component is showing users complaints */}
              <div className={classes.fab}>
                <WriteComplaintDialogButton />
                {/* This Component contains Write complaint section for Mobile View  */}
              </div>
            </div>
          )}
          <Snackbar
            open={deleteRes.status}
            autoHideDuration={5000}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            onClose={() => setDeleteRes({ status: false })}
          >
            <Alert severity={deleteRes.status ? "success" : "error"}>
              {deleteRes.message}
            </Alert>
          </Snackbar>
        </DashboardLayout>
      </div>
    </PartnerProtectedPage>
  );
}

const mapStateToProps = (state) => {
  // Here we are calling data from API but currently not Working
  return { getComplainData: state.partnerReducer.partnerComplaintRes };
};

export default connect(mapStateToProps)(Complaints);

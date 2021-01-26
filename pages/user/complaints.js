import { makeStyles } from "@material-ui/core";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useAuth, UserProtectedPage } from "../../auth/useAuth";
import CustomSpinner from "../../components/customSpinner";
import Inbox from "../../components/user/inbox";
import WriteComplaintDialogButton from "../../components/writeComplaintDialogButton";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/userRoutes";
import { getUserComplaints } from "../../store/actions/userAction";
import Head from "next/head";

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

function Complains(props) {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { user } = useAuth();

  const [data, setData] = useState(null);

  useEffect(async () => {
    // Here we are calling Action
    if (props.getComplainData == null) {
      props.dispatch(getUserComplaints());
    }
  }, []);

  return (
    <UserProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Complaints | User</title>
      </Head>
      <div className={classes.root}>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={user && user}
        >
          {/* This is used for dashboard layout */}
          {loading && <CustomSpinner />}
          {/* Custom Spinner will use when our data will come till that time spinner will work */}
          {!loading && (
            <div>
              {props.getComplainData && (
                <Inbox data={props.getComplainData.data} />
              )}
              {/* Inbox component is showing partner complaints */}
              <div className={classes.fab}>
                <WriteComplaintDialogButton />
                {/* This Component contains Write complaint section for Mobile View  */}
              </div>
            </div>
          )}
        </DashboardLayout>
      </div>
    </UserProtectedPage>
  );
}
const mapStateToProps = (state) => {
  // Here we are calling data from API but currently not Working
  return { getComplainData: state.userReducer.userComplaintRes };
};

export default connect(mapStateToProps)(Complains);

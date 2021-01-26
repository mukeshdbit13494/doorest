import { Button } from "@material-ui/core";
import React, { useState } from "react";
import { connect } from "react-redux";
import { useAuth, UserProtectedPage } from "../../auth/useAuth";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/userRoutes";
import { getUserPartnerDetails } from "../../store/actions/userAction";
import Head from "next/head";

function User(props) {
  const { user } = useAuth();
  const partnerId = "5ff09d4b03b7573c38ef0c7b";

  return (
    <UserProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Dashboard | Doorest</title>
      </Head>
      <DashboardLayout
        route={routes}
        menuOption={menuOption}
        profile={user && user}
      >
        {/* This is used for dashboard layout */}
      </DashboardLayout>
    </UserProtectedPage>
  );
}
const mapStateToProps = (state) => {
  return { partnerData: state.userReducer.gerUserPartnerDetailsRes };
};

export default connect(mapStateToProps)(User);

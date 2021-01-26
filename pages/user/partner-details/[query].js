import React, { useEffect, useState } from "react";
import PartnerProfile from "../../../components/user/partnerProfile";
import DashboardLayout from "../../../layouts/dashboardLayout";
import AddReviews from "../../../components/user/addReviews";
import { menuOption, routes } from "../../../router/userRoutes";
import CustomSpinner from "../../../components/customSpinner";
import Reviews from "../../../components/reviews";
import { useAuth, UserProtectedPage } from "../../../auth/useAuth";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { getUserPartnerDetails } from "../../../store/actions/userAction";
import ServiceDetails from "../../../components/partner/serviceDetails";
import Availability from "../../../components/partner/availability";
import { Grid } from "@material-ui/core";

import Head from "next/head";

function PartnerDetails(props) {
  // User Service Details page
  const { user } = useAuth();
  const router = useRouter();
  const { partnerId } = router.query;
  useEffect(() => {
    if (partnerId) {
      props.dispatch(getUserPartnerDetails(partnerId));
    }
  });

  return (
    <UserProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <div>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <title>Partner Details | Doorest</title>
        </Head>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={user && user}
        >
          {/* This is used for dashboard layout */}
          {/* {!props.data && <CustomSpinner />} */}
          {/* Custom Spinner will use when our data will come till that time spinner will work */}
          {/* {props.data && ( */}
          <div>
            {props.partnerData && (
              <PartnerProfile data={props.partnerData.data} />
            )}
            {/* {/* Partner Profile Component */}
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                {props.partnerData && (
                  <ServiceDetails data={props.partnerData.data} />
                )}
                {/* Service Details Component */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {props.partnerData && (
                  <Availability
                    data={props.partnerData.data.partnerServices.serviceDays}
                  />
                )}
                {/* Availability component */}
              </Grid>
            </Grid>
            <Grid container spacing={4}>
              <Grid item xs={12} sm={6}>
                {/* <Reviews review={props.data} /> */}
                {/* Reviews Global Component */}
              </Grid>
              <Grid item xs={12} sm={6}>
                {/* <AddReviews /> */}
                {/* Add Review Component for partner */}
              </Grid>
            </Grid>
          </div>
          {/* )} */}
        </DashboardLayout>
      </div>
    </UserProtectedPage>
  );
}

const mapStateToProps = (state) => {
  return { partnerData: state.userReducer.getUserPartnerDetailsRes };
};

export default connect(mapStateToProps)(PartnerDetails);

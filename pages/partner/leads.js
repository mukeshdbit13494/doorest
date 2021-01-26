import { Button, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { PartnerProtectedPage, useAuth } from "../../auth/useAuth";
import CalledUser from "../../components/partner/calledUser";
import UserProfile from "../../components/partner/userProfile";
import ViewedUser from "../../components/partner/viewedUser";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/partnerRoutes";
import { getPartnerLead } from "../../store/actions/partnerAction";
import Head from "next/head";

function Leads(props) {
  const [loading, setLoading] = useState(false);
  const { partner } = useAuth();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(async () => {
    if (props.partnerLeadData == null) {
      props.dispatch(getPartnerLead());
    }
  }, []);

  return (
    <PartnerProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Leads | Doorest Partner</title>
      </Head>
      <div>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={partner && partner}
        >
          {/* This is used for dashboard layout */}
          {userProfile && <UserProfile data={userProfile} />}
          {/* User Profile Component */}
          <Grid container>
            <Grid item xs={12} sm={6}>
              {props.partnerLeadData && (
                <ViewedUser
                  data={props.partnerLeadData.data}
                  setUser={setUserProfile}
                />
              )}
              {/* Viewed User component which shows that which user has viewed  your profile */}
            </Grid>
            <Grid item xs={12} sm={6}>
              {props.partnerLeadData && (
                <CalledUser
                  data={props.partnerLeadData.data}
                  setUser={setUserProfile}
                />
              )}
              {/* Called User component which shows that which user has called on your profile */}
            </Grid>
          </Grid>
        </DashboardLayout>
      </div>
    </PartnerProtectedPage>
  );
}

const mapStateToProps = (state) => {
  return { partnerLeadData: state.partnerReducer.partnerLeadRes };
};

export default connect(mapStateToProps)(Leads);

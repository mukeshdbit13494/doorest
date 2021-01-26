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

function Record(props) {
  const [loading, setLoading] = useState(false);
  const { partner } = useAuth();

  useEffect( () => {
    if (props.partnerLeadData == null) {
      props.dispatch(getPartnerLead());
    }
  }, []);

  return (
    <PartnerProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <div>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={partner && partner}
        >
          {/* This is used for dashboard layout */}
          <UserProfile />
          {/* User Profile Component */}
          <Button
            onClick={() =>
              console.log(props.partnerLeadData && props.partnerLeadData)
            }
          >
            Get Leads
          </Button>
          <Grid container>
            <Grid item xs={12} sm={6}>
              {props.partnerLeadData && (
                <ViewedUser data={props.partnerLeadData.data} />
              )}
              {/* Viewed User component which shows that which user has viewed  your profile */}
            </Grid>
            <Grid item xs={12} sm={6}>
              {props.partnerLeadData && (
                <CalledUser data={props.partnerLeadData.data} />
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

export default connect(mapStateToProps)(Record);

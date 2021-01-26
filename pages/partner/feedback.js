import { Container, Grid } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import CustomSpinner from "../../components/customSpinner";
import WriteReviews from "../../components/partner/writeReview";
import Reviews from "../../components/reviews";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/partnerRoutes";
import { PartnerProtectedPage, useAuth } from "../../auth/useAuth";
import { connect } from "react-redux";
import { getPartnerComments } from "../../store/actions/partnerAction";
import Head from "next/head";

function Feedback(props) {
  const { partner } = useAuth();
  useEffect(async () => {
    if (partner) props.dispatch(getPartnerComments(partner._id));
  }, []);
  return (
    <PartnerProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Feedback | Doorest Partner</title>
      </Head>
      <div>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={partner && partner}
        >
          {}
          {/* This is used for dashboard layout */}
          {/* {<CustomSpinner />} */}
          {/* Custom Spinner will use when our data will come till that time spinner will work */}

          <Container>
            <Grid container>
              <Grid item xs={12} sm={12}>
                {props.partnerComments && (
                  <Reviews data={props.partnerComments.data} />
                )}
                {/* Reviews global component */}
              </Grid>
            </Grid>
          </Container>
        </DashboardLayout>
      </div>
    </PartnerProtectedPage>
  );
}

const mapStateToProps = (state) => {
  return { partnerComments: state.partnerReducer.partnerCommentRes };
};

export default connect(mapStateToProps)(Feedback);

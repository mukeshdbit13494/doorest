import React, { useState } from "react";
import { connect } from "react-redux";
import { PartnerProtectedPage, useAuth } from "../../auth/useAuth";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/partnerRoutes";
import { Button, Typography } from "@material-ui/core";
import ProfileAlert from "../../components/profileAlert";
import Head from "next/head";
import Chart from "react-google-charts";

function Partner(props) {
  // Partner Index page
  const [loading, setLoading] = useState(false);
  const { partner, token } = useAuth();

  return (
    <PartnerProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Partner Dashboard | Doorest</title>
      </Head>
      <DashboardLayout
        route={routes}
        menuOption={menuOption}
        profile={partner && partner}
      >
        {/* This is used for dashboard layout */}
        {partner &&
          (partner.partnerDetails == null ? (
            <ProfileAlert redirectURL="/partner/forms" />
          ) : (
            <div>
              {/* here you can paste your code */}
              <div style={{ textAlign: "center", marginTop: 30 }}>
                <Typography variant="h5">Monthly Leads Graphs</Typography>
                <Chart
                  width={"1200px"}
                  height={"400px"}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data={[
                    ["x", "Leads"],
                    ["Jan", 0],
                    ["Feb", 10],
                    ["Mar", 23],
                    ["Apr", 17],
                    ["May", 18],
                    ["Jun", 9],
                    ["Jul", 11],
                    ["Aug", 27],
                    ["Sep", 33],
                    ["Oct", 40],
                    ["Nov", 32],
                    ["Dec", 35],
                  ]}
                  options={{
                    hAxis: {
                      title: "Months",
                    },
                    vAxis: {
                      title: "Leads",
                    },
                  }}
                  rootProps={{ "data-testid": "10" }}
                />
              </div>
            </div>
          ))}
      </DashboardLayout>
    </PartnerProtectedPage>
  );
}

export default Partner;

import React, { useEffect, useState } from "react";
import { PartnerProtectedPage, useAuth } from "../../auth/useAuth";
import CustomSpinner from "../../components/customSpinner";
import PrivacyPolicy from "../../components/partner/privacyPolicy";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/partnerRoutes";
import Head from "next/head";

function Privacy(props) {
  // Privacy page
  const [loading, setLoading] = useState(false);
  const { partner } = useAuth();

  return (
    <PartnerProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Doorest Policy | Partner</title>
      </Head>
      <div>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={partner && partner}
        >
          {/* This is used for dashboard layout */}
          {loading && <CustomSpinner />}
          {/* Custom Spinner will use when our data will come till that time spinner will work */}
          {!loading && <PrivacyPolicy />}
          {/* Privacy Policy COmponent */}
        </DashboardLayout>
      </div>
    </PartnerProtectedPage>
  );
}

export default Privacy;

import React, { useState } from "react";
import { useAuth, UserProtectedPage } from "../../auth/useAuth";
import CustomSpinner from "../../components/customSpinner";
import PrivacyPolicy from "../../components/user/privacyPolicy";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/userRoutes";
import Head from "next/head";

export default function Privacy() {
  // Privacy page
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  return (
    <UserProtectedPage>
      {/* Used for authenticate the person to directly go to another page without login */}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Doorest Policy | User</title>
      </Head>
      <div>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={user && user}
        >
          {/* This is used for dashboard layout */}
          {loading && <CustomSpinner />}
          {/* Custom Spinner will use when our data will come till that time spinner will work */}
          {!loading && <PrivacyPolicy />}
          {/* Privacy Policy COmponent */}
        </DashboardLayout>
      </div>
    </UserProtectedPage>
  );
}

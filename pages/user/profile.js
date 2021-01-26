import React from "react";
import { useAuth, UserProtectedPage } from "../../auth/useAuth";
import ProfileAlert from "../../components/profileAlert";
import ProfileCard from "../../components/user/profileCard";
import UserProfileForm from "../../components/user/userProfileForm";
import DashboardLayout from "../../layouts/dashboardLayout";
import { menuOption, routes } from "../../router/userRoutes";
import Head from "next/head";

export default function Profile() {
  // User Profile page
  const { user } = useAuth();
  return (
    <UserProtectedPage>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Profile | User</title>
      </Head>
      <div>
        <DashboardLayout
          route={routes}
          menuOption={menuOption}
          profile={user && user}
        >
          {/* Used for authenticate the person to directly go to another page without login */}
          {user &&
            (user.userDetails == null ? (
              <UserProfileForm />
            ) : (
              <div>
                {/* This is used for dashboard layout */}

                <ProfileCard data={user} />
                {/* Profile Card Component */}
              </div>
            ))}
        </DashboardLayout>
      </div>
    </UserProtectedPage>
  );
}

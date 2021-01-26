import React from "react";
import SignUp from "../../components/userSignup";
import Layout from "../../layouts/layout";
import Head from "next/head";

function UserSignup(props) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Sign-up | Doorest</title>
      </Head>
      <div style={{ marginBottom: 80 }}>
        <SignUp />
      </div>
    </Layout>
  );
}

export default UserSignup;

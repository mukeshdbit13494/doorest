import React from "react";
import SignIn from "../../components/signin";
import Layout from "../../layouts/layout";
import Head from "next/head";

function Signin(props) {
  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>User Sign-in | Doorest</title>
      </Head>
      <div style={{ marginBottom: 80 }}>
        <SignIn role="user" />
      </div>
    </Layout>
  );
}

export default Signin;

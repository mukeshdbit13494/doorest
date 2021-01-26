import React from 'react';
import SignIn from '../../components/signin';
import Layout from '../../layouts/layout';
import Head from 'next/head';

function Signin(props) {
	return (
		<Layout>
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Partner Sign-in | Doorest</title>
			</Head>
			<div style={{ marginBottom: 80 }}>
				<SignIn role="partner" />
			</div>
		</Layout>
	);
}

export default Signin;

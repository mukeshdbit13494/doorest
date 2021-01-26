import React, { useEffect } from 'react';
import Layout from '../layouts/layout';
import HomeServiceCard from '../components/homeServiceCard';
import HomeTopServicesCard from '../components/homeTopServicesCard';
import HomeAboutUsCard from '../components/homeAboutUsCard';
import HomeHeros from '../components/homeHeros';
import { connect } from 'react-redux';
import { getServices } from '../store/actions/serviceAction';
import Head from 'next/head';

function Index(props) {
	useEffect(() => {
		if (props.data == null) {
			props.dispatch(getServices());
		}
	}, []);
	return (
		<Layout>
			<div>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Home | Doorest</title>
				</Head>
				<HomeHeros />
				{props.data && <HomeServiceCard data={props.data.services} />}
				<HomeAboutUsCard />
				<HomeTopServicesCard />
			</div>
		</Layout>
	);
}

const mapStateToProps = (state) => {
	return { data: state.serviceReducer.serviceRes };
};

export default connect(mapStateToProps)(Index);

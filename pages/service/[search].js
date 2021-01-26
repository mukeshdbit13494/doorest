import { Container } from '@material-ui/core';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ServiceHerosSection from '../../components/serviceHerosSection';
import ServicePageSection from '../../components/servicePageSection';
import Layout from '../../layouts/layout';
import { getPartnerlistByCity } from '../../store/actions/serviceAction';
import Head from 'next/head';

function Services(props) {
	const router = useRouter();

	useEffect(() => {
		const { city, serviceId } = router.query;
		console.log({ serviceId, city });
		props.dispatch(getPartnerlistByCity(serviceId, city));
	});

	return (
		<div>
			<Layout>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>Service | Doorest</title>
				</Head>
				<ServiceHerosSection />
				<Container>
					<ServicePageSection data={props.data && props.data.data} />
				</Container>
			</Layout>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		data: state.serviceReducer.partnerListByCity
	};
};

export default connect(mapStateToProps)(Services);

import React, { useEffect, useState } from 'react';
import PartnerProfile from '../../components/user/partnerProfile';
import ServiceDetails from '../../components/user/serviceDetails';
import DashboardLayout from '../../layouts/dashboardLayout';
import AboutMe from '../../components/user/aboutMe';
import Availability from '../../components/user/availability';
import AddReviews from '../../components/user/addReviews';
import { menuOption, routes } from '../../router/userRoutes';
import { Grid } from '@material-ui/core';
import CustomSpinner from '../../components/customSpinner';
import Reviews from '../../components/reviews';
import { useAuth, UserProtectedPage } from '../../auth/useAuth';
import { getServices } from '../../store/actions/serviceAction';
import { connect } from 'react-redux';
import ServiceSearchBar from '../../components/user/searviceSearchBar';

function Services(props) {
	// User Service Details page
	const { user } = useAuth();
	useEffect(() => {
		if (props.data == null) {
			props.dispatch(getServices());
		}
	}, []);

	return (
		<UserProtectedPage>
			{/* Used for authenticate the person to directly go to another page without login */}
			{/* <div> */}
			<DashboardLayout route={routes} menuOption={menuOption} profile={user && user}>
				{/* This is used for dashboard layout */}
				{/* {!props.data && <CustomSpinner />} */}
				{/* Custom Spinner will use when our data will come till that time spinner will work */}
				{/* {props.data && ( */}
				{/* <div> */}
				<div style={{ marginTop: 80 }}>
					<ServiceSearchBar data={props.data == null ? [] : props.data.services} />
				</div>
				{/* <PartnerProfile />
						Partner Profile Component
						<Grid container spacing={4}>
							<Grid item xs={12} sm={6}>
								<ServiceDetails />
								Service Details Component
							</Grid>
							<Grid item xs={12} sm={6}>
								<Availability />
								Availability component
							</Grid>
						</Grid>
						<AboutMe />
						About Me Component
						<Grid container spacing={4}>
							<Grid item xs={12} sm={6}>
								<Reviews review={props.data} />
								Reviews Global Component
							</Grid>
							<Grid item xs={12} sm={6}>
								<AddReviews />
								Add Review Component for partner
							</Grid>
						</Grid> */}
				{/* </div> */}
				{/* )} */}
			</DashboardLayout>
			{/* </div> */}
		</UserProtectedPage>
	);
}

const mapStateToProps = (state) => {
	return { data: state.serviceReducer.serviceRes };
};

export default connect(mapStateToProps)(Services);

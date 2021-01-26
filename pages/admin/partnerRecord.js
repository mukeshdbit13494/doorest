import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useAuth } from '../../auth/useAuth';
import Availability from '../../components/partner/availability';
import ProfileCard from '../../components/partner/profileCard';
import ServiceDetails from '../../components/partner/serviceDetails';
import DashboardLayout from '../../layouts/dashboardLayout';
import { menuOption, routes } from '../../router/partnerRoutes';

function PartnerRecord(props) {
	// Partner Profile Page
	const [ loading, setLoading ] = useState(false);
	const { partner } = useAuth();

	useEffect(async () => {
		if (props.getPartnerData == null) props.dispatch(getPartnerDetails());
	}, []);

	return (
		<div>
			{/* {!props.partnerDetails && <CustomSpinner />} */}
			{/* Custom Spinner will use when our data will come till that time spinner will work */}
			<div>
				{/* here you can paste you code */}
				<ProfileCard data={partner} />
				{/* Profile Card component */}
				{/* <Grid container spacing={4}>
						<Grid item xs={12} sm={6}>
							<ServiceDetails data={partner} />
							Service Details Component
						</Grid>
						<Grid item xs={12} sm={6}>
							<Availability data={partner.partnerServices.serviceDays} />
							Availability Component
						</Grid>
					</Grid> */}
			</div>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { getPartnerData: state.PartnerReducer.partnerRecordRes };
};

export default connect(mapStateToProps)(PartnerRecord);

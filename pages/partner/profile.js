import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { PartnerProtectedPage, useAuth } from '../../auth/useAuth';
import Availability from '../../components/partner/availability';
import ProfileCard from '../../components/partner/profileCard';
import ServiceDetails from '../../components/partner/serviceDetails';
import DashboardLayout from '../../layouts/dashboardLayout';
import { menuOption, routes } from '../../router/partnerRoutes';
import ProfileAlert from '../../components/profileAlert';
import Head from 'next/head';
import GoogleMap from '../../components/googleMap';

export default function PartnerProfile(props) {
	// Partner Profile Page
	const [ loading, setLoading ] = useState(false);
	const { partner } = useAuth();

	const AnyReactComponent = ({ text }) => <div>{text}</div>;

	return (
		<PartnerProtectedPage>
			{/* Used for authenticate the person to directly go to another page without login */}
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Profile | Doorest Partner</title>
			</Head>
			<div>
				<DashboardLayout route={routes} menuOption={menuOption} profile={partner && partner}>
					{/* This is used for dashboard layout */}
					{/* {!props.partnerDetails && <CustomSpinner />} */}
					{/* Custom Spinner will use when our data will come till that time spinner will work */}

					{partner &&
						(partner.partnerDetails == null ? (
							<ProfileAlert redirectURL="/partner/forms" />
						) : (
							<div>
								{/* here you can paste you code */}
								<ProfileCard data={partner} />
								{/* Profile Card component */}
								<Grid container spacing={4}>
									<Grid item xs={12} sm={6}>
										<ServiceDetails data={partner} />
										{/* Service Details Component */}
									</Grid>
									<Grid item xs={12} sm={6}>
										<Availability data={partner.partnerServices.serviceDays} />
										{/* Availability Component */}
									</Grid>
								</Grid>
								{/* <PersonalDetails data={partner && partner} /> */}
								{/* About Me Component */}
								<Grid container spacing={2}>
									{/* <Grid item xs={12} sm={6}>
                    <Reviews review={props.partnerDetails} />
                    Reviews Global Component
                  </Grid> */}
									<Grid item xs={12} sm={6}>
										<GoogleMap
											lat={partner.partnerDetails.address.location.coordinates[1]}
											long={partner.partnerDetails.address.location.coordinates[0]}
										/>
									</Grid>
								</Grid>
							</div>
						))}
				</DashboardLayout>
			</div>
		</PartnerProtectedPage>
	);
}

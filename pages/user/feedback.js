import { Grid } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useAuth, UserProtectedPage } from '../../auth/useAuth';
import CustomSpinner from '../../components/customSpinner';
import Reviews from '../../components/reviews';
import WriteReviews from '../../components/user/writeReviews';
import DashboardLayout from '../../layouts/dashboardLayout';
import { menuOption, routes } from '../../router/userRoutes';
import Head from 'next/head';

function Feedback(props) {
	const [ loading, setLoading ] = useState(false);
	const { user } = useAuth();

	return (
		<UserProtectedPage>
			{/* Used for authenticate the person to directly go to another page without login */}
			<Head>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<title>Feedback | User</title>
			</Head>
			<div>
				<DashboardLayout route={routes} menuOption={menuOption} profile={user && user}>
					{/* This is used for dashboard layout */}
					{!props.data && <CustomSpinner />}
					{/* Custom Spinner will use when our data will come till that time spinner will work */}
					{props.data && (
						<div>
							<Grid container>
								<Grid item xs={12} sm={4}>
									<WriteReviews />
									{/* Write Reviews Component */}
								</Grid>
								<Grid item xs={12} sm={8}>
									<Reviews review={props.data} />
									{/* Reviews global component */}
								</Grid>
							</Grid>
						</div>
					)}
				</DashboardLayout>
			</div>
		</UserProtectedPage>
	);
}

export default Feedback;

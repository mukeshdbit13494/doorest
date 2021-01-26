import { Avatar, Button, Card, CardContent, CardMedia, Chip, Grid, makeStyles, Typography } from '@material-ui/core';
import { Call, CheckCircle, Email } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { capitalize } from '../../custome_methods/capitalize';
import Address from './address';
import PersonalDetails from './personalDetails';

import Paper from '@material-ui/core/Paper';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useRouter } from 'next/router';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		marginTop: 20,
		marginBottom: 20,
		// margin: 'auto',
		width: '100%'
	},
	image: {
		width: 128,
		height: 128
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},

	img: {
		marginTop: 20,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	avatarStyle: {
		width: theme.spacing(12),
		height: theme.spacing(12)
	},
	detail: {
		color: theme.palette.secondary.light
	},
	ratingChipStyle: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		marginLeft: 10,
		paddingLeft: 10,
		paddingRight: 10
	},
	ratingStyle: {
		display: 'flex',
		alignItems: 'center',
		textAlign: 'center',
		justifyContent: 'center',
		paddingTop: theme.spacing(0)
	},
	editProfile: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	}
}));

export default function ProfileCard(props) {
	// Profile Component is for Profile Page

	const classes = useStyles();
	const router = useRouter();

	const [ value, setValue ] = React.useState(4);
	return (
		<div>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<div className={classes.root}>
						<Paper className={classes.paper}>
							<Grid container spacing={3}>
								<Grid item>
									<div className={classes.img}>
										<Avatar
											alt={props.data.firstName}
											src={props.data.partnerDetails.image}
											className={classes.avatarStyle}
										/>
									</div>
								</Grid>
								<Grid item xs={12} sm container>
									<Grid item xs container direction="column" spacing={2}>
										<Grid item xs>
											<Typography
												className={classes.detail}
												gutterBottom
												variant="h1"
												component="h2"
											>
												{capitalize(`${props.data.firstName} ${props.data.lastName}`)}{' '}
												<CheckCircle />
											</Typography>
											<Typography variant="subtitle1" color="textSecondary" variant="subtitle1">
												{/* <Email className={classes.detail} /> */}
												{capitalize(`${props.data.email}`)}
											</Typography>
											<Typography variant="subtitle1" color="textSecondary" variant="subtitle1">
												{/* <Call className={classes.detail} /> */}
												{capitalize(
													`${props.data.mobile} / ${props.data.partnerDetails
														.alternateMobile}`
												)}
											</Typography>
										</Grid>
										{/* <Grid item>
											<Typography variant="body2" style={{ cursor: 'pointer' }}>
												Remove
											</Typography>
										</Grid> */}
									</Grid>
									<Grid item>
										<div className={classes.ratingStyle}>
											<Rating name="read-only" value={value} readOnly />
											<Chip
												className={classes.ratingChipStyle}
												size="small"
												label={'4'}
												variant="outlined"
											/>
										</div>
									</Grid>
								</Grid>
							</Grid>
							<PersonalDetails data={props.data.partnerDetails} heading="Peronal Details" />
						</Paper>
					</div>
				</Grid>
				<Grid item xs={12} sm={6}>
					<Card elevation={2} style={{ marginTop: 20 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<Address data={props.data.partnerDetails.address.local} heading="Local Address" />
							</Grid>
							<Grid item xs={12} sm={6}>
								<Address
									data={props.data.partnerDetails.address.permanent}
									heading="Permanent Address"
								/>
							</Grid>
						</Grid>
					</Card>
				</Grid>
			</Grid>
			<div className={classes.editProfile}>
			<Button
				
				onClick={() => router.push('/partner/forms?action=edit')}
				variant="outlined"
				color="primary"
			>
				Edit Profile
			</Button>
			</div>
		</div>
	);
}

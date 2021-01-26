import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions, Grid } from '@material-ui/core';
import { Call, CheckCircle, Edit, Email, LocationOn } from '@material-ui/icons';
import { capitalize } from '../../custome_methods/capitalize';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 40
	},
	rootSection: {
		display: 'flex',
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	content: {
		flex: '1 0 auto'
	},
	detail: {
		color: theme.palette.secondary.light,
		marginRight: 10
	},

	//This style is common for Mobile and Desktop view

	button: {
		marginTop: theme.spacing(2),
		marginLeft: 40,
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		borderRadius: 50
	},
	calling: {
		alignItems: 'center',
		marginLeft: theme.spacing(4),
		paddingTop: theme.spacing(5)
	},
	textStyle: {
		fontSize: 22,
		color: theme.palette.primary.background
	},

	//mobile Style

	mobileCard: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},
	mobileroot: {
		marginTop: 5
	},
	mobileMedia: {
		height: 400
	}
}));

export default function UserProfile(props) {
	// User profile Card is for Record page

	const classes = useStyles();
	const theme = useTheme();

	return (
		<div className={classes.root}>
			{/* {props.profile.map((item,index) => ( */}
			<Card className={classes.rootSection}>
				<img src={props.data.user.image} height="180" width="170" />
				<Grid item xs={12} sm={9}>
					<div style={{ marginLeft: 20 }}>
						<CardContent className={classes.content}>
							<Typography className={classes.detail} gutterBottom variant="h1" component="h2">
								{props.data.user.firstName ? (
									capitalize(`${props.data.user.firstName} ${props.data.user.lastName}`)
								) : (
									'Doorest User'
								)}{' '}
								{/* <CheckCircle /> */}
								{/* {item.name} This is used when we call data from API */}
							</Typography>
							<Typography
								variant="subtitle1"
								color="textSecondary"
								style={{ display: 'flex', alignContent: 'center' }}
							>
								<Email className={classes.detail} />
								{props.data.user.email}
							</Typography>
							<div style={{ float: 'right' }}>
								<Typography variant="subtitle1" color="primary">
									{props.data.lastVisitDate}
								</Typography>
								<Typography variant="subtitle1" color="primary">
									{props.data.lastVisitTime}
								</Typography>
							</div>
						</CardContent>
					</div>
				</Grid>
			</Card>

			{/* Mobile View */}

			<div className={classes.mobileCard}>
				<Card className={classes.mobileroot}>
					<CardMedia
						className={classes.mobileMedia}
						image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography className={classes.detail} gutterBottom variant="h1" component="h2">
							{props.data.firstName ? (
								capitalize(`${props.data.firstName} ${props.data.lastName}`)
							) : (
								'Doorest User'
							)}{' '}
							<CheckCircle />
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<LocationOn className={classes.detail} /> Digaut Office
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<Email className={classes.detail} />
							{props.data.email}
						</Typography>
					</CardContent>
					<CardActions>
						<Button variant="contained" className={classes.button} startIcon={<Edit />}>
							Review
						</Button>
						<div className={classes.calling}>
							<Typography variant="subtitle1" className={classes.textStyle}>
								<Call className={classes.detail} /> Call Now
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								{props.data.mobile}
							</Typography>
						</div>
					</CardActions>
				</Card>
			</div>
		</div>
	);
}

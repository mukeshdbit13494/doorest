import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		marginTop: 40,
		paddingBottom: 55
	},
	heading: {
		fontSize: 25,
		color: theme.palette.secondary.light
	},
	details: {
		color: theme.palette.primary.grey
	},
	expand: {
		transform: 'rotate(0deg)',
		color: theme.palette.secondary.light,
		marginLeft: 'auto'
	},
	descriptionContent: {
		padding: 10,
		// marginTop: 20,
		marginBottom: 35,
		color: theme.palette.secondary.light
	}
}));

export default function ServiceDetails(props) {
	// Service Details component is for Profile Page

	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<Card className={classes.root} elevation={2}>
				<CardContent>
					<Typography className={classes.heading} variant="h1">
						Service Details
					</Typography>
					{/* Here Divider is used for creating lines between two content */}
				</CardContent>
				<Divider />
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Charge
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{`${props.data.partnerServices.serviceCharge.charge} / ${props.data.partnerServices
							.serviceCharge.chargeType}`}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Experience
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.partnerServices.experience}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Specilization
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.partnerServices.specialization}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Description
					</Typography>
				</CardActions>
				<Typography className={classes.descriptionContent} elevation={0} variant="body2">
					{props.data.partnerServices.description}
				</Typography>
			</Card>
		</div>
	);
}

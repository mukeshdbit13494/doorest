import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	heading: {
		fontSize: 25,
		color: theme.palette.secondary.light
	},
	details: {
		color: theme.palette.primary.grey
	},
	expand: {
		color: theme.palette.secondary.light,
		marginLeft: 'auto'
	}
}));

export default function Address(props) {
	// Availability component for Partner Profile page

	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<Card elevation={0}>
				<CardContent>
					<Typography className={classes.heading} variant="h1">
						{props.heading}
						{/* Heading */}
					</Typography>
					{/* Here we are using Divider for deviding two sections */}
				</CardContent>
				<Divider />
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Street Number
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.streetNumber}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Street
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.street}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Landmark
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.landMark}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						City
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.city}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						State
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.state}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Pincode
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.pincode}
					</Typography>
				</CardActions>
			</Card>
		</div>
	);
}

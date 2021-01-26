import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Moment from 'moment';
import { Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		// paddingBottom: 90
	},
	heading: {
		fontSize: 25,
		color: theme.palette.secondary.light
	},
	details: {
		color: theme.palette.primary.grey
	},
	expand: {
		// transform: 'rotate(0deg)',
		color: theme.palette.secondary.light,
		marginLeft: 'auto'
	}
}));

export default function PersonalDetails(props) {
	// Personal details component for Partner Profile page

	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div>
			<Card className={classes.root} elevation={0}>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Father Name
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.fatherName}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						DOB
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{Moment(props.data.dob).format('DD-MM-YYYY')}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Gender
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.gender}
					</Typography>
				</CardActions>
				<CardActions disableSpacing>
					<Typography className={classes.details} variant="subtitle1">
						Marital Status
					</Typography>
					<Typography
						className={classes.expand}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
						variant="subtitle1"
					>
						{props.data.maritalStatus}
					</Typography>
				</CardActions>
			</Card>
		</div>
	);
}

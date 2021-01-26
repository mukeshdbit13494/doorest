import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { Chip, Divider } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 40
	},
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

export default function Availability(props) {
	// Availability component for Partner Profile page

	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<div className={classes.root}>
			<Card elevation={2}>
				<CardContent>
					<Typography className={classes.heading} variant="h1">
						Availablility
						{/* Heading */}
					</Typography>
					{/* Here we are using Divider for deviding two sections */}
				</CardContent>
				<Divider />
				{props.data.map((item, index) => (
					// Here we are calling data from array through map function.
					<CardActions disableSpacing key={index}>
						<Typography className={classes.details} variant="subtitle1">
							{item.day}
						</Typography>
						<Typography
							className={classes.expand}
							onClick={handleExpandClick}
							aria-expanded={expanded}
							aria-label="show more"
							variant="subtitle1"
						>
							{item.status ? (
								`${item.timing.startTime} - ${item.timing.endTime}`
							) : (
								<Chip className={{ backgroundColor: '#f5f5f5' }} size="small" label="Not Available" />
							)}
						</Typography>
					</CardActions>
				))}
			</Card>
		</div>
	);
}

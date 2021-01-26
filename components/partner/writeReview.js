import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, Paper, TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import SpinnerButton from '../spinnerButton';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 40
	},
	cardStyle: {
		margin: 10,
		[theme.breakpoints.down('sm')]: {
			margin: 0
		}
	},
	reviewHeading: {
		fontSize: '1.3em',
		paddingLeft: 20,
		paddingTop: 8,
		paddingBottom: 10,
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff'
	},
	nameColor: {
		marginLeft: 20,
		marginTop: 10,
		color: theme.palette.secondary.light
	},
	ratingStyle: {
		paddingTop: 10,
		marginLeft: 20
	},
	textFieldStyle: {
		paddingTop: 10,
		paddingLeft: 20,
		paddingRight: 20,
		paddingBottom: 25
	}
}));

export default function WriteReviews() {
	// Write Reviews Card is for Feedback page

	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);
	const [ value, setValue ] = React.useState(4);

	const [ loading, setLoading ] = React.useState(false);
	const [ success, setSuccess ] = React.useState(false);
	const timer = React.useRef();

	const handleButtonClick = () => {
		if (!loading) {
			setSuccess(false);
			setLoading(true);
			timer.current = window.setTimeout(() => {
				setSuccess(true);
				setLoading(false);
			}, 2000);
		}
	};

	return (
		<div className={classes.root}>
			<Card elevation={2} className={classes.cardStyle}>
				<Paper className={classes.reviewHeading}>Write Reviews</Paper>
				{/* Heading */}
				<Typography className={classes.nameColor} variant="subtitle1">
					Rating
				</Typography>
				<Rating className={classes.ratingStyle} name="read-only" value={value} readOnly />
				<CardContent className={classes.textFieldStyle}>
					<TextField multiline rows={6} fullWidth placeholder={'Write...'} variant="outlined" />
				</CardContent>
				<SpinnerButton click={handleButtonClick} loading={loading} success={success} fullWidth={false} />
				{/* This Spinner Button is used when the review data will save  */}
			</Card>
		</div>
	);
}

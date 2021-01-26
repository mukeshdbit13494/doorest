import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center'
	},
	top: {
		marginTop: 100,
		color: theme.palette.primary.main,
		animationDuration: '550ms'
	},
	circle: {
		strokeLinecap: 'round'
	}
}));

export default function CustomSpinner(props) {
	// This is a custom Spinner which is used for showing spinner while loading the page

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CircularProgress
				variant="indeterminate"
				disableShrink
				className={classes.top}
				classes={{
					circle: classes.circle
				}}
				size={40}
				thickness={4}
				{...props}
			/>
		</div>
	);
}

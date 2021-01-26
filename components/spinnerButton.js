import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Button, IconButton, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	wrapper: {
		margin: theme.spacing(1),
		position: 'relative'
	},
	buttonSuccess: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		'&:hover': {
			backgroundColor: theme.palette.secondary.light,
			color: '#ffffff',
			width: '100%'
		},
		width: '100%'
	},
	buttonProgress: {
		color: 'green[500]',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginTop: -12,
		marginLeft: -12
	}
}));

export default function SpinnerButton(props) {
	// Spinner button is used in Write complaints Component and are used for showing loading spinner

	const classes = useStyles();
	const timer = React.useRef();

	const buttonClassname = clsx({
		[classes.buttonSuccess]: props.success
	});

	return (
		<div className={classes.wrapper}>
			<Button className={buttonClassname} disabled={props.loading} onClick={props.click}>
				<Typography style={{ display: props.loading ? 'none' : 'block' }}>Send</Typography>
			</Button>
			{props.loading && <CircularProgress size={24} className={classes.buttonProgress} />}
		</div>
	);
}

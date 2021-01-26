import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Icon from '@mdi/react';
import { Fab, TextField } from '@material-ui/core';
import { mdiPencil } from '@mdi/js';
import SpinnerButton from './spinnerButton';

const useStyles = makeStyles((theme) => ({
	appBar: {
		position: 'relative'
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1
	},
	TextFieldStyle: {
		marginTop: 20
	},
	TextField: {
		padding: 10
	}
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function WriteComplaintDialogButton() {
	// This Component contains Write complaint section for Mobile View  */}

	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);
	const [ loading, setLoading ] = React.useState(false);
	const [ success, setSuccess ] = React.useState(false);
	const timer = React.useRef();

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

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
		<div>
			<Fab color="primary" onClick={handleClickOpen}>
				<Icon path={mdiPencil} size={1} />
			</Fab>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
				<AppBar className={classes.appBar}>
					<Toolbar>
						<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
							<CloseIcon />
						</IconButton>
						<Typography variant="h6" className={classes.title}>
							Write Complaints
						</Typography>
						<SpinnerButton
							click={handleButtonClick}
							loading={loading}
							success={success}
							fullWidth={true}
							autoFocus
							color="inherit"
						/>
					</Toolbar>
				</AppBar>
				<div className={classes.TextField}>
					<TextField
						//  This TextField is for subject
						className={classes.TextFieldStyle}
						multiline
						rows={1}
						label="Subject"
						variant="outlined"
						fullWidth
					/>
					<TextField
						//  This TextField is for complaint
						className={classes.TextFieldStyle}
						multiline
						rows={10}
						label="Complaint"
						variant="outlined"
						fullWidth
					/>
				</div>
			</Dialog>
		</div>
	);
}

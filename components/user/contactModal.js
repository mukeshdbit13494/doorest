import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { Call } from '@material-ui/icons';

const useStyles = makeStyles({
	avatar: {
		backgroundColor: blue[100],
		color: blue[600]
	},
	dialog: {
		minWidth: 300,
		padding: 10
	}
});

function ContactDialog(props) {
	const classes = useStyles();
	const { onClose, open } = props;

	const handleClose = () => {
		onClose(false);
	};

	return (
		<Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open} className={classes.dialog}>
			<DialogTitle id="simple-dialog-title">Call Me</DialogTitle>
			<List>
				{props.contacts.map((contact, index) => (
					<a href={`tel:+91 ${contact}`} key={index}>
						<ListItem button>
							<ListItemAvatar>
								<Avatar className={classes.avatar}>
									<Call />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary={contact} />
						</ListItem>
					</a>
				))}
			</List>
		</Dialog>
	);
}

export default function ContactModal(props) {
	const [ open, setOpen ] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
	};

	return (
		<div>
			<Button color="primary" onClick={handleClickOpen}>
				<Call /> Call Now
			</Button>
			<ContactDialog contacts={props.contacts} open={open} onClose={handleClose} />
		</div>
	);
}

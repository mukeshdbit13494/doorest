import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Chip,
	Grid,
	makeStyles,
	Typography,
	useTheme
} from '@material-ui/core';
import { Call, CheckCircle, Edit, Email, LocationOn } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import {
	mdiAccountGroup,
	mdiCards,
	mdiChat,
	mdiClipboard,
	mdiClipboardFile,
	mdiFormatFloatNone,
	mdiTextBoxMultiple
} from '@mdi/js';
import React from 'react';

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
	calling: {
		alignItems: 'center',
		marginLeft: theme.spacing(4),
		paddingTop: theme.spacing(5)
	},
	button: {
		marginTop: theme.spacing(2),
		marginLeft: 5,
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		borderRadius: 50
	},
	detail: {
		color: theme.palette.secondary.light
	},
	textStyle: {
		fontSize: 22,
		color: theme.palette.primary.background
	},
	ratingStyle: {
		alignItems: 'center',
		display: 'flex',
		paddingTop: theme.spacing(0)
	},
	ratingChipStyle: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		marginLeft: 10,
		paddingLeft: 10,
		paddingRight: 10
	},

	//mobile Styles
	mobileroot: {
		marginTop: 5
	},
	mobileMedia: {
		height: 250
	},
	mobileCard: {
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	}
}));

export default function ProfileCard(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(4);
	return (
		<div className={classes.root}>
			<Card className={classes.rootSection}>
				<img src={props.data.image} height="180" width="150" />
				<div>
					<CardContent className={classes.content}>
						<Typography className={classes.detail} gutterBottom variant="h5" component="h2">
							{props.data.firstName} <CheckCircle />
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<LocationOn className={classes.detail} /> Digaut Office
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<Email className={classes.detail} />
							{props.data.email}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<Call className={classes.detail} /> {props.data.mobile}
						</Typography>
					</CardContent>
				</div>
			</Card>

			{/* Mobile View */}

			<div className={classes.mobileCard}>
				<Card className={classes.mobileroot}>
					<CardMedia className={classes.mobileMedia} image={props.data.image} title="Contemplative Reptile" />
					<CardContent>
						<Typography className={classes.detail} gutterBottom variant="h5" component="h2">
							{props.data.firstName} <CheckCircle />
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<LocationOn className={classes.detail} /> Digaut Office
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<Email className={classes.detail} /> {props.data.email}
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<Call className={classes.detail} /> {props.data.mobile}
						</Typography>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}

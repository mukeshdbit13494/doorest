import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Chip, Grid } from '@material-ui/core';
import { Call, CheckCircle, Edit, Email, LocationOn } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import ContactModal from './contactModal';
import { capitalize } from '../../custome_methods/capitalize';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,

		paddingTop: 40
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		width: '100%'
	},
	image: {
		width: 128,
		height: 128
	},
	img: {
		margin: 'auto',
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	detail: {
		color: theme.palette.secondary.light
	},
	ratingChipStyle: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		marginLeft: 10,
		paddingLeft: 10,
		paddingRight: 10
	}
}));

export default function PartnerProfile(props) {
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(4);

	return (
		<div className={classes.root}>
			<Paper className={classes.paper}>
				<Grid container spacing={2}>
					<Grid item>
						<ButtonBase className={classes.image}>
							<img className={classes.img} alt="complex" src={props.data.partnerDetails.image} />
						</ButtonBase>
					</Grid>
					<Grid item xs={12} sm container>
						<Grid item xs container direction="column" spacing={2}>
							<Grid item xs>
								<Typography className={classes.detail} gutterBottom variant="h1">
									{capitalize(`${props.data.firstName} ${props.data.lastName}`)}
									<CheckCircle />
								</Typography>
								<Typography
									style={{ display: 'flex', alignItems: 'center' }}
									variant="subtitle1"
									color="textSecondary"
									gutterBottom
								>
									<Email style={{ marginRight: 5 }} className={classes.detail} />
									{props.data.email}
								</Typography>
							</Grid>
							<Grid item>
								<Rating name="read-only" value={value} readOnly />
								<Chip className={classes.ratingChipStyle} size="small" label={'4'} />
							</Grid>
						</Grid>
						<Grid item>
							<ContactModal contacts={[ props.data.mobile ]} />
						</Grid>
					</Grid>
				</Grid>
			</Paper>
		</div>
	);
}

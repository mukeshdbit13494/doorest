import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { Button, CardActions, Chip, Grid } from '@material-ui/core';
import { Call, CheckCircle, Edit, Email, LocationOn } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';

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
		marginLeft: 40,
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

export default function PartnerSectionCard() {
	const classes = useStyles();
	const theme = useTheme();
	const [ value, setValue ] = React.useState(4);

	return (
		<div className={classes.root}>
			<Card className={classes.rootSection}>
				<img
					src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
					height="175"
					width="150"
				/>
				<Grid item xs={12} sm={10}>
					<div className={classes.details}>
						<CardContent className={classes.content}>
							<Typography className={classes.detail} gutterBottom variant="h5" component="h2">
								Piyush Dubey <CheckCircle />
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								<LocationOn className={classes.detail} /> Digaut Office
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								<Email className={classes.detail} /> Dubeyji@gmail.com
							</Typography>
						</CardContent>
						<div className={classes.ratingStyle}>
							<Rating style={{ marginLeft: 20 }} name="read-only" value={value} readOnly />
							<Chip className={classes.ratingChipStyle} size="small" label={'4'} />
						</div>
					</div>
				</Grid>
				<Grid item xs={12} sm={2}>
					<Card elevation={0}>
						<Button variant="contained" className={classes.button} startIcon={<Edit />}>
							Review
						</Button>
						<div className={classes.calling}>
							<Typography variant="subtitle1" className={classes.textStyle}>
								<Call className={classes.detail} /> Call Now
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								+91-9876543210
							</Typography>
						</div>
					</Card>
				</Grid>
			</Card>

			{/* Mobile View */}

			<div className={classes.mobileCard}>
				<Card className={classes.mobileroot}>
					<CardMedia
						className={classes.mobileMedia}
						image="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
						title="Contemplative Reptile"
					/>
					<CardContent>
						<Typography className={classes.detail} gutterBottom variant="h5" component="h2">
							Piyush Dubey <CheckCircle />
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<LocationOn className={classes.detail} /> Digaut Office
						</Typography>
						<Typography variant="subtitle1" color="textSecondary">
							<Email className={classes.detail} /> Dubeyji@gmail.com
						</Typography>
						<div>
							<Rating name="read-only" value={value} readOnly />
						</div>
					</CardContent>
					<CardActions>
						<Button variant="contained" className={classes.button} startIcon={<Edit />}>
							Review
						</Button>
						<div className={classes.calling}>
							<Typography variant="subtitle1" className={classes.textStyle}>
								<Call className={classes.detail} /> Call Now
							</Typography>
							<Typography variant="subtitle1" color="textSecondary">
								+91-9876543210
							</Typography>
						</div>
					</CardActions>
				</Card>
			</div>
		</div>
	);
}

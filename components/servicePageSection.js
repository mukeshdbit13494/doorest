import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Button,
	ButtonBase,
	Card,
	CardActionArea,
	CardActions,
	CardMedia,
	Checkbox,
	Chip,
	FormControlLabel,
	FormGroup,
	Grid,
	InputBase,
	MenuItem,
	Paper,
	Slider,
	SwipeableDrawer,
	useTheme,
	withStyles
} from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import { mdiFilter } from '@mdi/js';
import Icon from '@mdi/react';
import { capitalize } from '../custome_methods/capitalize';
import gsap from 'gsap';
import ServiceSearchBar from './user/searviceSearchBar';
import { connect } from 'react-redux';
import { getServices } from '../store/actions/serviceAction';
import Link from 'next/link';

const BootstrapInput = withStyles((theme) => ({
	root: {
		'label + &': {
			marginTop: theme.spacing(3)
		}
	},
	input: {
		borderRadius: 50,
		position: 'relative',
		backgroundColor: '#f5f5f5',
		fontSize: 14,
		padding: '6px 18px 6px 20px',
		transition: theme.transitions.create([ 'border-color', 'box-shadow' ]),
		// Use the system font instead of the default Roboto font.
		fontFamily: [
			'-apple-system',
			'BlinkMacSystemFont',
			'"Segoe UI"',
			'Roboto',
			'"Helvetica Neue"',
			'Arial',
			'sans-serif',
			'"Apple Color Emoji"',
			'"Segoe UI Emoji"',
			'"Segoe UI Symbol"'
		].join(','),
		'&:focus': {
			borderRadius: 50
		}
	}
}))(InputBase);

const useStyles = makeStyles((theme) => ({
	root1: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto'
	},
	image: {
		width: 128,
		height: 128
	},
	img: {
		display: 'block',
		maxWidth: '100%',
		maxHeight: '100%'
	},
	rightRoot: {
		marginBottom: 20
	},
	details: {
		display: 'flex',
		flexDirection: 'column'
	},
	content: {
		flex: '1 0 auto'
	},
	controls: {
		display: 'flex',
		alignItems: 'center',
		paddingLeft: theme.spacing(0),
		paddingBottom: theme.spacing(0)
	},
	detail: {
		color: theme.palette.secondary.light
	},
	sideRoot: {
		width: 300,
		marginLeft: 20
	},
	filter: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	cityDropdownStyle: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
		marginBottom: 50,
		// marginTop: -30,
		borderRadius: 50,
		padding: 10
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},

	btnMobileFilter: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		width: '100%',
		borderRadius: 50,
		[theme.breakpoints.up('sm')]: {
			display: 'none'
		}
	},

	//mobile view

	mobRatingStyle: {
		marginLeft: 10,
		paddingLeft: 5,
		paddingRight: 5,
		marginTop: 10
	},
	mobChipStyle: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff',
		marginRight: 5,
		paddingLeft: 5,
		paddingRight: 5,
		marginTop: 10
	},
	mobButton: {
		marginTop: theme.spacing(1),
		backgroundColor: theme.palette.primary.main,
		color: '#ffffff',
		borderRadius: 50
	}
}));

const columnCard = [
	{
		imgUrl:
			'https://images.pexels.com/photos/1704488/pexels-photo-1704488.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
		name: 'Piyush Dubey',
		location: 'Digaut Office',
		status: 'IT Work',
		duration: '1500 / Hours',
		rating: 4,
		ratingNo: 4
	}
];

function ServicePageSection(props) {
	const classes = useStyles();
	const theme = useTheme();

	useEffect(() => {
		if (props.dataItem == null) {
			props.dispatch(getServices());
		}
	});

	const [ value, setValue ] = React.useState(3.5);
	const [ expanded, setExpanded ] = React.useState(false);
	const [ valueRadius, setValueRadius ] = React.useState(5);
	const [ valueExperience, setValueExperience ] = React.useState(0);
	const [ valueServiceCost, setValueServiceCost ] = React.useState(0);
	const card = document.getElementsByClassName('card');
	useEffect(() => {
		gsap.from(card, { duration: 1, scale: 1, x: -100 });
	}, []);

	const filter = () => (
		<Card elevation={2} className={'card'} style={{ marginBottom: 20 }}>
			<CardContent>
				<Typography className={classes.heading}>SORT BY</Typography>
			</CardContent>
			<div className={classes.sideRoot}>
				<Typography id="input-slider" gutterBottom>
					Radius around {valueRadius} Km
				</Typography>
				<Slider
					value={typeof valueRadius === 'number' ? valueRadius : 0}
					onChange={(event, value) => setValueRadius(value)}
					aria-labelledby="input-slider"
				/>
				<Typography id="input-slider" gutterBottom>
					Experience {valueExperience} Year
				</Typography>
				<Slider
					value={valueExperience}
					onChange={(event, value) => setValueExperience(value)}
					aria-labelledby="input-slider"
				/>
				<Typography id="input-slider" gutterBottom>
					Min service cost {valueServiceCost}
				</Typography>
				<Slider
					value={valueServiceCost}
					onChange={(event, value) => setValueServiceCost(value)}
					aria-labelledby="input-slider"
				/>
			</div>
			<FormGroup style={{ marginLeft: 20 }}>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Most Rated"
				/>
				<Typography>Days</Typography>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Monday"
				/>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Tuesday"
				/>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Wednesday"
				/>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Thursday"
				/>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Friday"
				/>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Saturday"
				/>
				<FormControlLabel
					control={
						<Checkbox
							icon={<CheckBoxOutlineBlankIcon fontSize="small" />}
							checkedIcon={<CheckBoxIcon fontSize="small" />}
							name="checkedI"
						/>
					}
					label="Sunday"
				/>
			</FormGroup>
		</Card>
	);

	const [ open, setOpen ] = useState(false);

	const mobileFilter = (status) => (event) => {
		setOpen(status);
	};

	const [ city, setCity ] = React.useState(null);
	const [ cityDropdown, setCityDropdown ] = React.useState(false);

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	const handleClose = () => {
		setCityDropdown(false);
	};

	const handleOpen = () => {
		setCityDropdown(true);
	};

	return (
		<div className={classes.root}>
			<Grid container spacing={4}>
				<Grid item xs={12} sm={4}>
					<Button
						className={classes.btnMobileFilter}
						variant="contained"
						onClick={mobileFilter(true)}
						startIcon={<Icon path={mdiFilter} size={1} horizontal vertical rotate={180} color="#ffffff" />}
					>
						Sort By
					</Button>
					<SwipeableDrawer
						anchor="bottom"
						open={open}
						onClose={mobileFilter(false)}
						onOpen={mobileFilter(true)}
					>
						{filter()}
					</SwipeableDrawer>
					<div className={classes.filter}>{filter()}</div>
				</Grid>
				<Grid item xs={12} sm={8}>
					<div style={{ marginTop: 40 }}>
						<ServiceSearchBar data={props.dataItem == null ? [] : props.dataItem.services} />
					</div>
					{props.data &&
						props.data.partnerList.map((item, index) => (
							<Link href={`/user/partner-details/query?partnerId=${item.profileDetails._id}`} key={index}>
								<div className={classes.root1}>
									<Card className={classes.rightRoot}>
										<CardActionArea>
											<Paper className={classes.paper}>
												<Grid container spacing={2}>
													<Grid item>
														<ButtonBase className={classes.image}>
															<img
																className={classes.img}
																alt="complex"
																src={item.personalDetails.image}
															/>
														</ButtonBase>
													</Grid>
													<Grid item xs={12} sm container>
														<Grid item xs container direction="column" spacing={2}>
															<Grid item xs>
																<Typography gutterBottom variant="subtitle1">
																	{capitalize(
																		item.profileDetails.firstName +
																			' ' +
																			item.profileDetails.lastName
																	)}
																</Typography>
															</Grid>
															<Grid item>
																<Chip
																	variant="outlined"
																	color="primary"
																	style={{ cursor: 'pointer' }}
																	// className={classes.chipStyle}
																	size="small"
																	label={capitalize(item.specialization)}
																/>
															</Grid>
														</Grid>

														<Grid item>
															<Chip
																// className={classes.mobButton}
																style={{ marginLeft: 20 }}
																variant="outlined"
																color="primary"
																size="small"
																label={`${item.serviceCharge.charge}/${item
																	.serviceCharge.chargeType}`}
															/>
															<Grid style={{ marginTop: 70 }}>
																<Rating
																	className={classes.mobRatingStyle}
																	name="read-only"
																	value={item.rating}
																	size="small"
																	readOnly
																/>
															</Grid>
														</Grid>
													</Grid>
												</Grid>
											</Paper>
										</CardActionArea>
									</Card>
								</div>
							</Link>
						))}
				</Grid>
			</Grid>
		</div>
	);
}

const mapStateToProps = (state) => {
	return { dataItem: state.serviceReducer.serviceRes };
};

export default connect(mapStateToProps)(ServicePageSection);

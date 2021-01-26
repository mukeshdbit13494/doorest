import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { CardActionArea, Container, Divider, Grid, Snackbar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Link from 'next/link';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { capitalize } from '../custome_methods/capitalize';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getAllStateCity } from '../store/actions/globalAction';
import { useRouter } from 'next/router';
import { Alert } from '@material-ui/lab';

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
	ourCourses: {
		paddingBottom: 20,
		backgroundColor: theme.palette.secondary.main
	},
	root: {
		padding: '2px 4px',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		flexWrap: 'wrap',
		marginBottom: 30,
		marginTop: -30,
		borderRadius: 50,
		padding: 10
	},
	input: {
		marginLeft: theme.spacing(1),
		flex: 1
	},
	iconButton: {
		padding: 10
	},
	button: {
		display: 'block',
		marginTop: theme.spacing(2)
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120
	},
	serviceName: {
		color: theme.palette.secondary.light,
		fontSize: '1.3em'
	}
}));

function HomeServiceCard(props) {
	const classes = useStyles();
	const [ services, setServices ] = useState(props.data);
	const [ city, setCity ] = React.useState(null);
	const [ open, setOpen ] = React.useState(false);
	const [ cityError, setCityError ] = React.useState(false);
	const router = useRouter();

	const filterService = (key) => {
		setServices(
			props.data.filter((item) => {
				return item.serviceName.toLowerCase().includes(key.toLowerCase());
			})
		);
	};

	useEffect(() => {
		if (props.cities == null) props.dispatch(getAllStateCity());
	});

	const handleChange = (event) => {
		setCity(event.target.value);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleOpen = () => {
		setOpen(true);
	};

	const handleSearchService = (item) => {
		if (city == null || city.trim() === '') {
			setCityError(true);
		} else {
			router.push(`/service/search?service=${item.serviceName}&city=${city}&serviceId=${item._id}`);
		}
	};
	return (
		<div className={classes.ourCourses}>
			<Container>
				<Grid container>
					<Grid item xs={12} sm={12}>
						<Paper component="form" className={classes.root} elevation={10}>
							<SearchIcon />
							<InputBase
								className={classes.input}
								placeholder="Search"
								inputProps={{ 'aria-label': 'search google maps' }}
								onChange={(e) => filterService(e.target.value)}
							/>
							<div>
								<Select
									open={open}
									value={city ? city : ''}
									onClose={handleClose}
									onOpen={handleOpen}
									displayEmpty={true}
									onChange={handleChange}
									input={<BootstrapInput />}
								>
									<MenuItem value="" disabled>
										Select City
									</MenuItem>
									{props.cities &&
										props.cities.data.map((item, index) => (
											<MenuItem key={index} value={item.city}>
												{item.isActive && capitalize(item.city)}
											</MenuItem>
										))}
								</Select>
							</div>
						</Paper>
					</Grid>
				</Grid>
				<Grid container spacing={1}>
					{services.map((item, index) => (
						<Grid item xs={12} sm={3} key={index}>
							<Card
								onClick={() => handleSearchService(item)}
								style={{
									marginLeft: 50,
									marginRight: 50,
									marginTop: 10,
									marginBottom: 10,
									textAlign: 'center',
									borderRadius: 10
								}}
							>
								<CardActionArea
									style={{
										padding: 10
									}}
								>
									<img src={item.serviceIcon} height="80" width="75" />
									<Typography className={classes.serviceName} variant="subtitle1">
										{capitalize(item.serviceName)}
									</Typography>
								</CardActionArea>
							</Card>
						</Grid>
					))}
				</Grid>
				<Snackbar open={cityError} autoHideDuration={6000} onClose={() => setCityError(false)}>
					<Alert onClose={() => setCityError(false)} variant="filled" severity="error">
						Please Select City.
					</Alert>
				</Snackbar>
			</Container>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		cities: state.globalReducer.getStateCityRes
	};
};

export default connect(mapStateToProps)(HomeServiceCard);

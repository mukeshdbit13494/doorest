import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Grid, Icon, List, ListItem, ListItemIcon, ListItemText, Snackbar } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { capitalize } from '../../custome_methods/capitalize';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { getAllStateCity } from '../../store/actions/globalAction';
import { Alert } from '@material-ui/lab';
import { useRouter } from 'next/router';

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
	root: {
		paddingBottom: 40,
		backgroundColor: theme.palette.secondary.main
	},
	searchPaper: {
		padding: '2px 4px',
		width: '100%',
		flexWrap: 'wrap',
		marginBottom: 50,
		marginTop: -30,
		borderRadius: 30,
		padding: 10
	},
	searchDiv: {
		display: 'flex',
		alignItems: 'center',
		width: '100%'
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
	serviceSearchList: {
		marginTop: 5,
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.primary.grey
	}
}));

function ServiceSearchBar(props) {
	const classes = useStyles();
	const [ services, setServices ] = useState(null);
	const [ city, setCity ] = React.useState(null);
	const [ open, setOpen ] = React.useState(false);
	const [ cityError, setCityError ] = React.useState(false);
	const router = useRouter();

	useEffect(() => {
		if (props.cities == null) {
			props.dispatch(getAllStateCity());
		}
	});
	const filterService = (key) => {
		key == null || key.trim() === ''
			? setServices(null)
			: setServices(
					props.data.filter((item) => {
						return item.serviceName.toLowerCase().includes(key.toLowerCase());
					})
				);
	};

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
			router.push(`/user/service/search?serviceId=${item._id}&service=${item.serviceName}&city=${city}`);
		}
	};
	return (
		<div>
			<Container>
				<Grid container>
					<Paper component="form" className={classes.searchPaper} elevation={10}>
						<div className={classes.searchDiv}>
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
									<MenuItem value="">Select City</MenuItem>
									{props.cities &&
										props.cities.data.map((item, index) => (
											<MenuItem key={index} value={item.city}>
												{item.isActive && capitalize(item.city)}
											</MenuItem>
										))}
								</Select>
							</div>
						</div>
						<div>
							{services &&
								services.map((item, index) => (
									<ListItem
										onClick={() => handleSearchService(item)}
										button
										className={classes.serviceSearchList}
										key={index}
									>
										<ListItemIcon>
											<SearchIcon />
										</ListItemIcon>
										<ListItemText>{capitalize(item.serviceName)}</ListItemText>
									</ListItem>
								))}
						</div>
					</Paper>
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
export default connect(mapStateToProps)(ServiceSearchBar);

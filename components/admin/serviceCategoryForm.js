import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';
import { Backdrop, CircularProgress } from '@material-ui/core';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { useAuth } from '../../auth/useAuth';
import { Alert } from '@material-ui/lab';

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center'
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1)
	},
	submit: {
		margin: theme.spacing(3, 0, 2)
	}
}));

export default function ServiceCategoryForm() {
	const { setUserData, setPartnerData } = useAuth();
	const router = useRouter();
	const classes = useStyles();
	const [ serviceName, setServiceName ] = useState(null);
	const [ serviceIcon, setServiceIcon ] = useState(null);
	const [ error, setError ] = useState({
		serviceNameError: false,
		serviceIconError: false
	});

	const handleSubmitData = () => {
		if (serviceName == null) {
			setError({ serviceNameError: true });
		} else if (serviceIcon == null) {
			setError({ serviceIconError: true });
		} else {
			console.log({ serviceName, icon: serviceIcon[0] });
			let formData = new FormData();
			formData.append('serviceName', serviceName);
			formData.append('icon', serviceIcon[0]);
			addService(formData);
		}
	};

	const addService = async (data) => {
		try {
			const res = await Axios.post('/api/add/service', data);
			if (res != null && res.data.status) {
				alert('data added successfully');
			} else {
				alert('' + res.data.message);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<TextField
					variant="outlined"
					size="small"
					required
					fullWidth
					type="text"
					label="Service Name"
					autoFocus
					error={error.serviceNameError}
					helperText={error.serviceNameError == true ? 'Please enter correct name!' : ''}
					value={serviceName}
					onChange={(event) => {
						setServiceName(event.target.value);
						setError({ serviceNameError: false });
					}}
				/>
				<input
					required
					type="file"
					onChange={(event) => {
						setServiceIcon(event.target.files);
						setError({ serviceIconError: false });
					}}
				/>
				<FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
				<Button
					type="submit"
					fullWidth
					variant="contained"
					color="primary"
					className={classes.submit}
					onClick={handleSubmitData}
				>
					Sign In
				</Button>
			</div>
			<Box mt={8} />
		</Container>
	);
}

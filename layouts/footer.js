import {
	Box,
	Button,
	Card,
	CardActions,
	Chip,
	Grid,
	IconButton,
	Link,
	List,
	ListItem,
	makeStyles,
	Typography
} from '@material-ui/core';
import { Call, Facebook, Instagram, LinkedIn, LocationOn, MailOutline, Opacity } from '@material-ui/icons';
import { closestIndexTo } from 'date-fns';
import { useRouter } from 'next/router';
import React, { Component } from 'react';
import Divider from '../components/divider';

const useStyles = makeStyles((theme) => ({
	root: {
		padding: 20,
		backgroundColor: theme.palette.secondary.light
	},
	icons: {
		marginRight: 5,
		color: theme.palette.primary.light
	},
	emailStyle: {
		fontSize: 14,
		color: theme.palette.primary.light
	},
	menusSectionStyle: {
		lineHeight: 2,
		color: '#ffffff',
		marginBottom: 20
	},
	statesSectionStyle: {
		marginTop: -20,
		marginRight: 30,
		marginBottom: 20,
		color: '#ffffff'
	},
	boxStyle: {
		marginTop: 20,
		maxWidth: 400,
		backgroundColor: theme.palette.secondary.light,
		height: 150
	},
	chipStyle: {
		margin: '7px'
	}
}));

const footerLinks = [
	{
		href: '/services',
		name: 'Services'
	},
	{
		href: '/services',
		name: 'Partners'
	},
	{
		href: '/services',
		name: 'About Us'
	},
	{
		href: '/services',
		name: 'Privacy Policy'
	}
];

const states = [
	{
		stateName1: '',
		stateName2: ''
	},
	{
		stateName1: 'Uttarakhand',
		stateName2: 'Bihar'
	},
	{
		stateName1: 'Arunachal Pradesh',
		stateName2: 'Goa'
	},
	{
		stateName1: 'Madhya Pradesh',
		stateName2: 'Delhi'
	},
	{
		stateName1: 'Maharastra',
		stateName2: 'Punjab'
	}
];

const serviceTags = [
	{
		service: 'plumber'
	},
	{
		service: 'Carpainter'
	},
	{
		service: 'AC Repair'
	},
	{
		service: 'TV Repair'
	},
	{
		service: 'plumber'
	},
	{
		service: 'Carpainter'
	},
	{
		service: 'AC Repair'
	},
	{
		service: 'TV Repair'
	},
	{
		service: 'plumber'
	},
	{
		service: 'Carpainter'
	},
	{
		service: 'AC Repair'
	},
	{
		service: 'TV Repair'
	}
];

function Footer() {
	const classes = useStyles();
	const router = useRouter();
	return (
		<div>
			<div className={classes.root}>
				<Grid container>
					<Grid item xs={12} sm={3}>
						<Link href="/">
							<img src="/logo.svg" width="150" height="80" />
						</Link>
						<IconButton>
							<MailOutline className={classes.icons} />
							<a href="Support@gmail.com" className={classes.emailStyle}>
								netkingyadav@gmail.com
							</a>
						</IconButton>
						<div>
							<IconButton>
								<a href="" target="_blank">
									<Facebook className={classes.icons} />
								</a>
							</IconButton>
							<IconButton>
								<a href="#">
									<LinkedIn className={classes.icons} />
								</a>
							</IconButton>
							<IconButton>
								<a href="#">
									<Instagram className={classes.icons} />
								</a>
							</IconButton>
						</div>
					</Grid>
					<Grid item xs={12} sm={2}>
						<div className={classes.menusSectionStyle}>
							<Typography variant="h1" style={{ marginBottom: 10 }}>
								Menus
							</Typography>
							<Divider />
							{footerLinks.map((item, index) => (
								<div key={index}>
									<a href={item.href}>{item.name}</a>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={12} sm={3}>
						<Typography variant="h1" style={{ color: '#ffffff', marginBottom: 10 }}>
							States
						</Typography>
						<Divider />
						<div className={classes.statesSectionStyle}>
							{states.map((item, index) => (
								<div key={index}>
									<CardActions disableSpacing>
										<Typography variant="subtitle1">{item.stateName1}</Typography>
										<Typography
											style={{ marginLeft: 'auto' }}
											aria-label="show more"
											variant="subtitle1"
										>
											{item.stateName2}
										</Typography>
									</CardActions>
								</div>
							))}
						</div>
					</Grid>
					<Grid item xs={12} sm={4}>
						<Typography variant="h1" style={{ color: '#ffffff', marginBottom: 10 }}>
							TAGS
						</Typography>
						<Divider />
						<Box
							display="flex"
							flexWrap="wrap"
							alignContent="flex-start"
							className={classes.boxStyle}
							// p={1}
							// m={1}
							// bgcolor="background.paper"
						>
							{serviceTags.map((item, index) => (
								<div key={index}>
									<Chip
										className={classes.chipStyle}
										variant="outlined"
										size="small"
										color="secondary"
										label={item.service}
									/>
								</div>
							))}
						</Box>
					</Grid>
				</Grid>
			</div>
			<div
				style={{
					backgroundColor: 'black',
					height: 40,
					width: '100%',
					textAlign: 'right',
					paddingRight: 20,
					paddingTop: 10
				}}
			>
				<span style={{ fontWeight: 'bold', color: 'white', fontStyle: 'italic' }}>Developed By - </span>{' '}
				<a style={{ color: 'orange' }} href="https://digaut.com/" target="_blank">
					Digaut
				</a>
			</div>
		</div>
	);
}
export default Footer;

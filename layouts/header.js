import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme) => ({
	root: {
		backgrounColor: theme.palette.primary.main
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	toggleButton: {
		[theme.breakpoints.between('sm', 'xl')]: {
			display: 'none'
		}
	},
	navLink: {
		[theme.breakpoints.down('sm')]: {
			display: 'none'
		}
	},
	title: {
		flexGrow: 1
	}
}));

const navLinks = [
	{
		href: '/',
		name: 'Home'
	},
	{
		href: '/about',
		name: 'About'
	},
	{
		href: '/user/signin',
		name: 'login'
	},
	{
		href: '/user/signup',
		name: 'Signup'
	}
];

export default function Header() {
	// Header seaction
	const classes = useStyles();
	const [ open, setOpen ] = React.useState(false);

	const toggleDrawer = () => {
		// Toggle Drawer for mobile view
		if (open == true) {
			setOpen(false);
		} else {
			setOpen(true);
		}
	};

	const list = () => (
		// List for mobile view on click at toggle button
		<div role="presentation" className={classes.root}>
			<List>
				{navLinks.map((item) => (
					<ListItem key={item.name}>
						<Link href={item.href} key={item.name}>
							<Button color="inherit"> {item.name} </Button>
						</Link>
					</ListItem>
				))}
				<ListItem>
					<Link href="/partner/signup">
						<Button style={{ borderRadius: 50 }} color="secondary" variant="outlined">
							Become a Partner
						</Button>
					</Link>
				</ListItem>
			</List>
		</div>
	);

	return (
		<div>
			<SwipeableDrawer
				anchor="right"
				open={open}
				onClose={() => setOpen(false)}
				onOpen={() => setOpen(true)}
				className={classes.root}
			>
				{list()}
			</SwipeableDrawer>

			<AppBar position="static">
				<Toolbar variant="dense">
					<Link href="/">
						<IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
							<img src="/logo.svg" width="150" height="40" style={{ marginTop: 5, marginBottom: 5 }} />
						</IconButton>
					</Link>
					<Typography variant="h6" className={classes.title}>
						{''}
					</Typography>
					<div className={classes.navLink}>
						{navLinks.map((item) => (
							<Link href={item.href} key={item.name}>
								<Button color="inherit"> {item.name}</Button>
							</Link>
						))}
						<Link href="/partner/signup">
							<Button style={{ borderRadius: 50 }} color="secondary" variant="outlined">
								Become a Partner
							</Button>
						</Link>
					</div>
					<IconButton
						edge="start"
						className={classes.toggleButton}
						onClick={toggleDrawer}
						// Toggle button
						color="inherit"
						aria-label="menu"
					>
						<MenuIcon />
					</IconButton>
				</Toolbar>
			</AppBar>
		</div>
	);
}

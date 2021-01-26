import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Link from 'next/link';
import { Avatar, Badge, Button, Divider, Fade, Grid, Menu, MenuItem } from '@material-ui/core';
import { Mail, MoreVert, Notifications } from '@material-ui/icons';
import Icon from '@mdi/react';
import { mdiAccount, mdiLock } from '@mdi/js';
import { useAuth } from '../auth/useAuth';
import { capitalize } from '../custome_methods/capitalize';

const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex'
	},
	paper: {
		backgroundColor: theme.palette.primary.main
	},
	appBar: {
		zIndex: theme.zIndex.drawer + 1,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		})
	},
	appBarShift: {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create([ 'width', 'margin' ], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	menuButton: {
		marginRight: 36
	},
	hide: {
		display: 'none'
	},
	drawer: {
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		color: 'white'
	},
	drawerOpen: {
		width: drawerWidth,
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	},
	drawerClose: {
		transition: theme.transitions.create('width', {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen
		}),
		overflowX: 'hidden',
		width: theme.spacing(7) + 1,
		[theme.breakpoints.up('sm')]: {
			width: theme.spacing(9) + 1
		},
		[theme.breakpoints.down('sm')]: {
			width: 0
		}
	},
	toolbar: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'flex-end',
		padding: theme.spacing(0, 1),
		marginBottom: -10,
		// necessary for content to be below app bar
		...theme.mixins.toolbar
	},
	content: {
		flexGrow: 1,
		padding: theme.spacing(3),
		paddingTop: theme.spacing(6)
	},
	grow: {
		flexGrow: 1
	},
	moreVert: {
		marginRight: -20,
		marginLeft: -10
	},
	smallAvatar: {
		width: theme.spacing(4),
		height: theme.spacing(4),
		marginLeft: 10,
		marginRight: 10
	},
	largeAvatar: {
		width: theme.spacing(6),
		height: theme.spacing(6),
		align: 'center'
	},
	sidebarItems: {
		'&:hover': {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen
			})
		}
	},
	iconMoreVert: {
		color: theme.palette.primary.main,
		marginRight: 5
	}
}));
export default function DashboardLayout(props) {
	const classes = useStyles();
	const theme = useTheme();

	const { signout } = useAuth();
	const [ open, setOpen ] = React.useState(false);
	const handleDrawerOpen = () => {
		setOpen(true);
	};
	const handleDrawerClose = () => {
		setOpen(false);
	};
	const [ anchorEl, setAnchorEl ] = React.useState(null);
	const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = React.useState(null);
	const isMenuOpen = Boolean(anchorEl);
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
	const handleProfileMenuOpen = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};
	const handleMenuClose = () => {
		setAnchorEl(null);
		handleMobileMenuClose();
	};
	const handleMobileMenuOpen = (event) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};
	const menuId = 'primary-search-account-menu';
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={menuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMenuOpen}
			onClose={handleMenuClose}
		/>
	);
	const mobileMenuId = 'primary-search-account-menu-mobile';
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{ vertical: 'top', horizontal: 'right' }}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
			TransitionComponent={Fade}
			transitionDuration={500}
			style={{ marginTop: 30 }}
		>
			<div style={{ textAlign: 'center', margin: 10 }}>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Avatar
						className={classes.largeAvatar}
						alt={props.profile.firstName}
						src={
							props.profile.image || (props.profile.partnerDetails && props.profile.partnerDetails.image)
						}
					/>
				</div>
				<Typography variant="subtitle1" spacing={2}>
					{capitalize(props.profile.firstName + ' ' + props.profile.lastName)}
				</Typography>
			</div>
			<Divider />
			{props.menuOption.map((item, index) => (
				<Link href={item.url} key={index}>
					<MenuItem>
						<Icon path={item.icon} className={classes.iconMoreVert} size="24px" />
						<Typography variant="subtitle2">{item.page}</Typography>
					</MenuItem>
				</Link>
			))}

			<MenuItem onClick={() => signout('partner')}>
				<Icon path={mdiLock} className={classes.iconMoreVert} size="24px" />
				<Typography variant="subtitle2">Sign Out</Typography>
			</MenuItem>
		</Menu>
	);
	return (
		<div className={classes.root}>
			<CssBaseline />
			<AppBar
				position="fixed"
				className={clsx(classes.appBar, {
					[classes.appBarShift]: open
				})}
			>
				<Toolbar variant="dense">
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						className={clsx(classes.menuButton, {
							[classes.hide]: open
						})}
					>
						<MenuIcon />
					</IconButton>
					<div className={classes.grow} />
					<Avatar
						className={classes.smallAvatar}
						alt={props.profile.firstName}
						src={
							props.profile.image || (props.profile.partnerDetails && props.profile.partnerDetails.image)
						}
					/>
					<Typography variant="subtitle1" spacing={2}>
						{capitalize(props.profile.firstName + ' ' + props.profile.lastName)}
					</Typography>
					<div>
						<IconButton
							aria-label="show more"
							aria-controls={mobileMenuId}
							aria-haspopup="true"
							onClick={handleMobileMenuOpen}
							color="inherit"
							className={classes.moreVert}
						>
							<MoreVert />
						</IconButton>
					</div>
				</Toolbar>
			</AppBar>
			<Drawer
				variant="permanent"
				className={clsx(classes.drawer, {
					[classes.drawerOpen]: open,
					[classes.drawerClose]: !open
				})}
				classes={{
					paper: clsx(classes.paper, {
						[classes.drawerOpen]: open,
						[classes.drawerClose]: !open
					})
				}}
			>
				<div className={classes.toolbar}>
					<IconButton onClick={handleDrawerClose} style={{ color: 'white' }}>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				{/* <Divider light /> */}
				<List>
					{props.route.map((items, index) => (
						<Link href={items.url} key={index}>
							<ListItem
								button
								className={clsx(classes.drawer, {
									[classes.drawerOpen]: open,
									[classes.drawerClose]: !open
								})}
								onMouseOver={handleDrawerOpen}
								onMouseLeave={handleDrawerClose}
							>
								<ListItemIcon>
									<Icon path={items.icon} color="white" size={1} />
									{/* <InboxIcon style={{ color: "white" }} /> */}
								</ListItemIcon>
								<ListItemText primary={items.page} />
							</ListItem>
						</Link>
					))}
				</List>
			</Drawer>
			{/* {renderMenu} */}
			{renderMobileMenu}
			<main className={classes.content} onClick={handleDrawerClose}>
				<div>{props.children}</div>
			</main>
		</div>
	);
}

import * as React from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, Card, Link, makeStyles, Typography } from '@material-ui/core';
import { useRouter } from 'next/router';
import HeroImage from './heroImage';

const useStyle = makeStyles((theme) => ({
	root: {
		backgroundColor: '#f5f5f5'
	},
	sloganCard: {
		paddingTop: 1,
		textAlign: 'center',
		justifyContent: 'center',
		alignItem: 'center',
		backgroundColor: '#f5f5f5',
		color: 'white'
	},
	sloganText: {
		color: '#ffffff',
		fontSize: '3.2em',
		textShadow: [
			'0 0 5px rgba(0,0,0,.05)',
			'0 1px 3px rgba(0,0,0,.2)',
			'0 3px 5px rgba(0,0,0,.2)',
			'0 5px 10px rgba(0,0,0,.2)',
			'0 10px 10px rgba(0,0,0,.2)',
			'0 20px 20px rgba(0,0,0,.3)'
		],
		[theme.breakpoints.down('sm')]: {
			fontSize: '2em'
		}
	},
	headingColor: {
		color: theme.palette.primary.grey,
		fontSize: '1.2em',
		lineHeight: '22px',
		[theme.breakpoints.down('sm')]: {
			margin: '30px 20px 20px 20px'
		}
	},
	btnStyle: {
		marginTop: 20,
		borderRadius: 'none',
		boxShadow: '0 14px 28px rgba(0,0,0,0.20), 0 10px 10px rgba(0,0,0,0.20)',
		'&:hover': {
			boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
			transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)'
		}
	},
	heroDiv: {
		width: '100%',
		display: 'flex',
		justifyContent: 'center',
		[theme.breakpoints.down('sm')]: {
			width: '100%'
		}
	}
}));

function HomeHeros(props) {
	const classes = useStyle();
	const router = useRouter();

	return (
		<div className={classes.root}>
			<div className={classes.sloganCard}>
				<h1 className={classes.sloganText}>Why Do We Use Doorest ?</h1>
				<Typography className={classes.headingColor} variant="body2">
					Doorest is a online platform at which number of service providers <br />
					&#8226; Electrician &#8226; Plumber &#8226; AC Repair &#8226; Carpainter &#8226; TV Repair
					<br /> deliver their services for you at one click.
				</Typography>
				<Link style={{ textDecoration: 'none' }} href="/partner/signup">
					<Button className={classes.btnStyle} color="primary" variant="contained">
						Become a Partner
					</Button>
				</Link>
			</div>
			<div className={classes.heroDiv}>
				<HeroImage />
			</div>
		</div>
	);
}

export default HomeHeros;

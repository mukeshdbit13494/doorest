import { Fab, makeStyles, Typography } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';

import React, { useEffect } from 'react';
import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRouter } from 'next/router';

gsap.registerPlugin(ScrollTrigger);

const useStyles = makeStyles((theme) => ({
	root: {
		paddingLeft: 50,
		paddingRight: 50,
		paddingTop: 40,
		paddingBottom: 60,

		textAlign: 'center',
		[theme.breakpoints.down('sm')]: {
			paddingLeft: 20,
			paddingRight: 20,
			paddingTop: 20,
			paddingBottom: 40
		}
	},
	content: {
		color: theme.palette.primary.grey
	},
	arrowIcon: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff'
	},
	heading: {
		textAlign: 'center',
		fontSize: '2.5em',
		marginBottom: 30,
		textTransform: 'uppercase',
		color: theme.palette.secondary.light,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1em',
			marginBottom: 30
		}
	}
}));

export default function HomeAboutUsCard() {
	const myCard = document.getElementsByName('content');
	const myCard1 = document.getElementsByName('heading');
	const router = useRouter();
	const classes = useStyles();
	useEffect(() => {
		// gsap.to(myCard, {
		// 	duration: 0.6,
		// 	scale: 1.1,
		// 	opacity: '1',
		// 	ease: 'ease-in',
		// 	scrollTrigger: {
		// 		trigger: myCard,
		// 		start: 'top 85%',
		// 		end: 'bottom 85%'
		// 		// toggleActions: 'restart pause reverse pause',
		// 		// onLeaveBack: (self) => self.disable()
		// 	}
		// });
	}, []);

	return (
		<div className={classes.root}>
			<h1 name={'heading'} className={classes.heading}>
				ABOUT US
			</h1>
			<Typography name={'content'} className={classes.content} varient="body2">
				Welcome everyone to Doorest page.First of all let us know what is "Doorest" and what its goals are.
				Durrest is a platform for service providers, service recipients and service beneficiaries who work to
				make their service available as per needs. This platform will be very helpful for all who are providing
				some services or seeking for some services in today's rush. Workers from urban, semi-urban and
				unorganized areas such as carpenters, plumber, electricians, drivers, beauticians, mehndi designers,
				ladies / gents tailor etc who are only able to extend their services to a limited area or limited range
				of people which is affecting their income and also difficulties in getting work, this platform will be a
				boon for all those workers and they will be able to extend their services to more and more people with
				their skills, which will improve their earning and strengthen their financial condition, which will
				result in the better livelihood of the family.
			</Typography>
			<div style={{ marginTop: 60 }}>
				<Fab aria-label="forword" className={classes.arrowIcon} onClick={() => router.push('/about')}>
					<ArrowForward />
				</Fab>
			</div>
		</div>
	);
}

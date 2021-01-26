import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Container, Fab, Grid } from '@material-ui/core';
import { ArrowForward } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import Icon from '@mdi/react';
import { mdiHome } from '@mdi/js';

import { gsap } from 'gsap/dist/gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
		backgroundColor: '#f5f5f5'
	},
	heading: {
		textAlign: 'center',
		fontSize: '2.5em',
		paddingTop: 40,
		paddingBottom: 40,
		textTransform: 'uppercase',
		color: theme.palette.secondary.light,
		[theme.breakpoints.down('sm')]: {
			fontSize: '1em'
		}
	},
	arrowIcon: {
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff'
	}
}));

const topServices = [
	{
		serviceName: 'Plumber',
		icon: mdiHome,
		rating: 3.5,
		ratingText: 4
	},
	{
		serviceName: 'Carpainter',
		icon: mdiHome,
		rating: 2,
		ratingText: 4
	},
	{
		serviceName: 'AC Repair',
		icon: mdiHome,
		rating: 3.5,
		ratingText: 4
	},
	{
		serviceName: 'TV Repair',
		icon: mdiHome,
		rating: 1,
		ratingText: 4
	}
];

export default function HomeTopServicesCard() {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(2);
	const myCard0 = document.getElementsByClassName('cardName0');
	const myCard1 = document.getElementsByClassName('cardName1');
	const myCard2 = document.getElementsByClassName('cardName2');
	const myCard3 = document.getElementsByClassName('cardName3');
	useEffect(() => {
		gsap.from(myCard0, {
			delay: 1.4,
			// scale: 1.1,
			x: '-100',
			opacity: '0',
			ease: 'ease-in',
			scrollTrigger: {
				trigger: myCard0,
				start: 'top 85%',
				end: 'bottom 60%'
			}
		});
		gsap.from(myCard1, {
			duration: 0.8,
			x: '-300',
			delay: 1,
			opacity: '0',
			ease: 'ease-in',
			scrollTrigger: {
				trigger: myCard1,
				start: 'top 85%',
				end: 'bottom 60%'
			}
		});
		gsap.from(myCard2, {
			duration: 0.8,
			x: '-500',
			delay: 0.7,
			opacity: '0',
			ease: 'ease-in',
			scrollTrigger: {
				trigger: myCard2,
				start: 'top 85%',
				end: 'bottom 60%'
			}
		});
		gsap.from(myCard3, {
			duration: 0.8,
			// scale: 1.1,
			x: '-700',
			delay: 0.2,
			opacity: '0',
			ease: 'ease-in',
			scrollTrigger: {
				trigger: myCard3,
				start: 'top 85%',
				end: 'bottom 60%'
			}
		});
	}, []);

	return (
		<div className={classes.root}>
			<Container>
				<h1 className={classes.heading}>TOP SERVICES</h1>
				<Grid container spacing={1}>
					{topServices.map((item, index) => (
						<Grid item xs={6} sm={3} key={index} className={'cardName' + index}>
							<Card style={{ padding: 40, textAlign: 'center', opacity: 1, marginBottom: 60 }}>
								<Icon path={item.icon} size={2} />
								<Typography style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}>
									{item.serviceName}
								</Typography>
								<Rating
									style={{ display: 'flex', justifyContent: 'center', alignItem: 'center' }}
									name="read-only"
									value={item.rating}
									readOnly
								/>
								<Typography>{item.ratingText}</Typography>
							</Card>
						</Grid>
					))}
				</Grid>
				{/* <div style={{ paddingTop: 60, paddingBottom: 60 }}>
					<Fab aria-label="forword" className={classes.arrowIcon}>
						<ArrowForward />
					</Fab>
				</div> */}
			</Container>
		</div>
	);
}

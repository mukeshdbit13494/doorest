import React, { useEffect, useState } from 'react';
import Layout from '../layouts/layout';
import Head from 'next/head';
import io from 'socket.io-client';
import { Card, Container, makeStyles, Paper, Typography } from '@material-ui/core';
import Dividers from '../components/divider';

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: theme.palette.secondary.light,
		color: '#f5f5f5',
		padding: 10
	},
	content: {
		marginTop: 40,
		marginBottom: 40
	},
	contentText: {
		color: theme.palette.primary.grey,
		fontSize: '1.2em'
	}
}));

export default function About() {
	const classes = useStyles();
	const socket = io('http://localhost:3000');
	useEffect(() => {
		if (socket) {
			socket.on('SOME_EVENT', handleEvent);
		}
	}, []);
	function handleEvent(payload) {
		console.log(payload);
	}
	return (
		<div>
			<Layout>
				<Head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<title>About | Doorest</title>
				</Head>
				<br />
				<Container>
					<Typography style={{ color: '#14A884', textAlign: 'center', fontSize: '2em' }}>About Us</Typography>
					<Dividers />
					{/* <Paper class={classes.root}>
						<Typography className={classes.heading} variant="h1">
							About Us
						</Typography>
					</Paper> */}
					<Card className={classes.content} elevation={0}>
						<Typography className={classes.contentText} style={{ lineHeight: '30px' }} variant="body2">
							Welcome everyone to Doorest page.First of all let us know what is "Doorest" and what its
							goals are. Durrest is a platform for service providers, service recipients and service
							beneficiaries who work to make their service available as per needs. This platform will be
							very helpful for all who are providing some services or seeking for some services in today's
							rush. Workers from urban, semi-urban and unorganized areas such as carpenters, plumber,
							electricians, drivers, beauticians, mehndi designers, ladies / gents tailor etc who are only
							able to extend their services to a limited area or limited range of people which is
							affecting their income and also difficulties in getting work, this platform will be a boon
							for all those workers and they will be able to extend their services to more and more people
							with their skills, which will improve their earning and strengthen their financial
							condition, which will result in the better livelihood of the family. They will be
							self-reliant and will be able to maintain a better lifestyle. For the service seekers, this
							platform will be an easy way to save time and directly contact all the service providers
							they need by sitting at home and can easily get rid of the commissions of middlemen, which
							will reduce their cost of service. The work will also be completed quickly with low cost.
							"Doorest" prime goal is to make the friendly environment so that service providers directly
							meet the service recipients, both save time, money and to get rid of middlemen, so that the
							skills can be used for the development of the country. They do not have to face any problem
							in carrying out tasks. Thank you
						</Typography>
					</Card>
					<Card className={classes.content} elevation={0}>
						<Typography className={classes.contentText} style={{ lineHeight: '30px' }} variant="body2">
							Doorest के पेज पर सभी का स्वागत है। आइए सबसे पहले जानते हैं कि "Doorest" क्या है और इसके
							लक्ष्य क्या हैं। Doorest सेवा प्रदाताओं, सेवा प्राप्तकर्ताओं और सेवा लाभार्थियों के लिए एक
							मंच है जो अपनी सेवा को आवश्यकतानुसार उपलब्ध कराने का काम करते हैं। यह प्लेटफ़ॉर्म उन सभी के
							लिए बहुत मददगार होगा जो आज की दौड़ में कुछ सेवा प्रदान कर रहे हैं या कुछ सेवा की माँग कर रहे
							हैं। शहरी, अर्ध-शहरी और असंगठित क्षेत्रों जैसे कि बढ़ई, प्लंबर, इलेक्ट्रीशियन, ड्राइवर,
							ब्यूटीशियन, मेहंदी डिजाइनर, लेडीज / जेंट्स टेलर आदि के कार्यकर्ता, जो केवल एक सीमित क्षेत्र
							में अपनी सेवा का विस्तार करने में सक्षम हैं या जो लोगों को प्रभावित कर रहे हैं। उनकी आय और
							काम पाने में भी मुश्किलें हैं, यह मंच उन सभी श्रमिकों के लिए एक वरदान होगा और वे अपनी सेवा
							को अपने कौशल से अधिक से अधिक लोगों तक पहुंचाने के लिए काम कर पाएंगे, जिससे उनकी कमाई में
							सुधार होगा और उनकी वित्तीय स्थिति मजबूत होगी , जिसके परिणामस्वरूप उनके बच्चों की शिक्षा और
							परिवार की बेहतर आजीविका होगी। वे आत्मनिर्भर होंगे और बेहतर जीवनशैली बनाए रखने में सक्षम
							होंगे। सेवा चाहने वालों के लिए, यह मंच समय बचाने के लिए एक आसान तरीका होगा और घर पर बैठे सभी
							सेवा प्रदाताओं से सीधे संपर्क कर सकता है और बिचौलियों के कमीशन से आसानी से छुटकारा पा सकता
							है, जिससे उनकी सेवा की लागत कम हो जाएगी। कम खर्च के साथ काम भी जल्दी पूरा होगा। "दुरेस्ट" का
							मुख्य लक्ष्य अनुकूल वातावरण बनाना है ताकि सेवा प्रदाता सीधे सेवा प्राप्तकर्ताओं से मिलें,
							समय, पैसा दोनों बचाएं और बिचौलियों से छुटकारा पाएं, ताकि कौशल का उपयोग देश के विकास के लिए
							किया जा सके। कार्यों को करने में उन्हें किसी समस्या का सामना नहीं करना पड़ता है। धन्यवाद
						</Typography>
					</Card>
				</Container>
			</Layout>
		</div>
	);
}

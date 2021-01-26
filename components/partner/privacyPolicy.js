import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
	root: {
		paddingTop: 50
	},
	aboutContent: {
		width: '100%',
		color: theme.palette.secondary.light
	},
	heading: {
		padding: 15,
		backgroundColor: theme.palette.secondary.light,
		color: '#ffffff'
	},
	content: {
		color: theme.palette.primary.grey,
		padding: 20,
		textAlign: 'left',
		lineHeight: '22px',
		fontSize: '1em'
	}
}));

export default function PrivacyPolicy() {
	//  Privacy Policy Component is for Privacy page

	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Card className={classes.aboutContent} elevation={1}>
				<Typography className={classes.heading} variant="h1">
					Privacy Policy
					{/* Heading */}
				</Typography>
				<CardContent>
					<Typography className={classes.content} variant="body2" color="textSecondary" component="p">
						There are many variations of passages of Lorem Ipsum available, but the majority have suffered
						alteration in some form, by injected humour, or randomised words which don't look even slightly
						believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
						anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the
						Internet tend to repeat predefined chunks as necessary, making this the first true generator on
						the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
						sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
						is therefore always free from repetition, injected humour, or non-characteristic words etc.
						There are many variations of passages of Lorem Ipsum available, but the majority have suffered
						alteration in some form, by injected humour, or randomised words which don't look even slightly
						believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't
						anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the
						Internet tend to repeat predefined chunks as necessary, making this the first true generator on
						the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model
						sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum
						is therefore always free from repetition, injected humour, or non-characteristic words etc.
						generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free
						from repetition, injected humour, or noncharacteristic words etc.
					</Typography>
				</CardContent>
			</Card>
		</div>
	);
}

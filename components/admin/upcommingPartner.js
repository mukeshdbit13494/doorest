import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import { Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1
	},
	paper: {
		padding: theme.spacing(2),
		margin: 'auto',
		maxWidth: '100%'
	},
	image: {
		width: 128,
		height: 128
	},
	img: {
		width: '100%',
		height: '100%'
	}
}));

export default function UpcommingPartner() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<Container>
				<Paper className={classes.paper}>
					<Grid container spacing={2}>
						<Grid item>
							<ButtonBase className={classes.image}>
								<img
									className={classes.img}
									alt="complex"
									src="https://i.pinimg.com/originals/7d/1a/3f/7d1a3f77eee9f34782c6f88e97a6c888.jpg"
								/>
							</ButtonBase>
						</Grid>
						<Grid item xs={12} sm container>
							<Grid item xs container direction="column" spacing={2}>
								<Grid item xs>
									<Typography gutterBottom variant="subtitle1">
										Amit Singh
									</Typography>
									<Typography variant="body2" gutterBottom>
										amitsingh992728@gmail.com
									</Typography>
									<Typography variant="body2">7300689054</Typography>
								</Grid>
								<Grid item>
									<Typography variant="body2">Plumber</Typography>
								</Grid>
							</Grid>
						</Grid>
					</Grid>
				</Paper>
			</Container>
		</div>
	);
}

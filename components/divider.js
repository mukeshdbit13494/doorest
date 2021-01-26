import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	// parent: {
	//     width: "100%",
	//     display: "flex",
	//     justifyContent: "center",
	//     marginBottom: 10,
	// },
	// dividerStyle: {
	//     height: 1,
	//     width: "98%",
	//     backgroundColor: 'black',
	// }
	parent: {
		width: '100%',
		display: 'flex',
		// justifyContent: 'center',
		marginBottom: 10
	},
	dividerStyle: {
		height: 1,
		width: '35%',
		backgroundColor: '#ffffff'
	}
}));

export default function Dividers() {
	const classes = useStyles();
	return (
		<div className={classes.parent}>
			<div className={classes.dividerStyle} />
		</div>
	);
}

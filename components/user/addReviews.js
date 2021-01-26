import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActions, TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Rating } from '@material-ui/lab';
import SpinnerButton from '../spinnerButton';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 40
    },
    heading: {
        fontSize: 25,
        color: theme.palette.secondary.light,
    },
    nameColor: {
        marginLeft: 20,
        color: theme.palette.secondary.light,
    },
    ratingStyle: {
        paddingTop: 10,
        marginLeft: 20,
    },
    textFieldStyle: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25
    },
}));


export default function AddReviews() {
    const classes = useStyles();
    const [value,] = React.useState(4);
    const [loading, setLoading] = React.useState(false);
    const [success, setSuccess] = React.useState(false);
    const timer = React.useRef();

    const handleButtonClick = () => {
        if (!loading) {
            setSuccess(false);
            setLoading(true);
            timer.current = window.setTimeout(() => {
                setSuccess(true);
                setLoading(false);
            }, 2000);
        }
    };

    return (
        <div className={classes.root}>
            <Card elevation={2}>
                <CardContent>
                    <Typography className={classes.heading} >
                        Add Reviews
                    </Typography>
                </CardContent>
                <Typography className={classes.nameColor}>Rating</Typography>
                <Rating className={classes.ratingStyle} name="read-only" value={value} readOnly />
                <div className={classes.textFieldStyle} >
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        placeholder={"Write..."}
                        variant="outlined"
                    />
                </div>
                <SpinnerButton click={handleButtonClick} loading={loading} success={success} fullWidth={true} />
            </Card>
        </div>
    );
}

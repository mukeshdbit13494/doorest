import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, Paper, TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button, Grid } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Rating } from '@material-ui/lab';
import Divider from "../divider"
import SpinnerButton from '../spinnerButton';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 40
    },
    media: {
        height: 0,
        paddingTop: '56.25%',
    },
    expand: {
        transform: 'rotate(0deg)',
        color: theme.palette.secondary.light,
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    },
    avatar: {
        backgroundColor: red[500],
    },
    nameColor: {
        marginLeft: 20,
        marginTop: 10,
        color: theme.palette.secondary.light,
    },
    details: {
        color: theme.palette.primary.grey,
    },
    descriptionContent: {
        padding: 10,
        marginTop: 20,
        color: theme.palette.secondary.light,
    },
    textFieldStyle: {
        paddingTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 25
    },
    ratingStyle: {
        paddingTop: 10,
        marginLeft: 20,
    },
    reviewHeading: {
        fontSize: "1.5em",
        paddingLeft: 20,
        paddingTop: 8,
        paddingBottom: 10,
        backgroundColor: theme.palette.secondary.light,
        color: "#ffffff"
    },
    containedPrimary: {
        background: theme.palette.secondary.light,
        color: "#ffffff"
    },
    cardStyle: {
        margin: 10,
        [theme.breakpoints.down('sm')]: {
            margin: 0,
        }
    }
}));


export default function WriteReviews() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState(4);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
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
            <Card elevation={2} className={classes.cardStyle}>
                {/* <CardContent> */}
                <Paper className={classes.reviewHeading}>Write Reviews</Paper>
                {/* </CardContent> */}
                <Typography className={classes.nameColor}>Rating</Typography>
                <Rating className={classes.ratingStyle} name="read-only" value={value} readOnly />
                <CardContent className={classes.textFieldStyle} >
                    <TextField
                        multiline
                        rows={6}
                        fullWidth
                        placeholder={"Write..."}
                        variant="outlined"
                    />
                </CardContent>
                <SpinnerButton click={handleButtonClick} loading={loading} success={success} fullWidth={true} />
            </Card>
        </div>
    );
}

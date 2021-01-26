import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Divider from "../divider"

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 40,
    },
    heading: {
        fontSize: 25,
        marginBottom: 20,
        color: theme.palette.secondary.light,
    },
    details: {
        color: theme.palette.primary.grey,
    },
    expand: {
        transform: 'rotate(0deg)',
        color: theme.palette.secondary.light,
        marginLeft: 'auto',
    },
}));

const Availablility = [
    {
        day: "Monday",
        time: "8 am - 6 pm"
    },
    {
        day: "Tuesday",
        time: "8 am - 6 pm"
    },
    {
        day: "Wednesday",
        time: "8 am - 6 pm"
    },
    {
        day: "Thursday",
        time: "8 am - 6 pm"
    },
    {
        day: "Friday",
        time: "8 am - 6 pm"
    },
    {
        day: "Saturday",
        time: "8 am - 6 pm"
    },
    {
        day: "Sunday",
        time: "8 am - 6 pm"
    },
]


export default function Availability() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.root}>
            <Card elevation={2}>
                <CardContent>
                    <Typography className={classes.heading} >
                        Availablility
                    </Typography>
                    <Divider />
                </CardContent>
                {Availablility.map((item, index) => (
                    <CardActions disableSpacing key={index}>
                        <Typography className={classes.details} >{item.day}</Typography>
                        <Typography className={classes.expand} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">{item.time}</Typography>
                    </CardActions>
                ))}
            </Card>
        </div>
    );
}

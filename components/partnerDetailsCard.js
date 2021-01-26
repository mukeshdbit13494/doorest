import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Grid } from '@material-ui/core';
import Divider from "../components/divider"


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 40,
        display: "flex",
        justifyContent: "center",
    },
    detailsSection: {
        display: 'flex',
    },
    media: {
        height: 0,
        paddingTop: '56.25%', // 16:9
    },
    expand: {
        transform: 'rotate(0deg)',
        color: theme.palette.secondary.light,
        marginLeft: 'auto',
    },
    expandOpen: {
    },
    avatar: {
        backgroundColor: red[500],
    },
    heading: {
        fontSize: 25,
        marginBottom: 20,
        color: theme.palette.secondary.light,
    },
    details: {
        color: theme.palette.primary.grey,
    },
    descriptionContent: {
        padding: 10,
        marginTop: 20,
        marginBottom: 18,
        color: theme.palette.secondary.light,
    },
}));

const Details = [
    {
        heading: "Charge",
        days: "500 / day"
    },
    {
        heading: "Experience",
        days: "5 Years"
    },
    {
        heading: "specilization",
        days: "Software Maintenance"
    },
]

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


export default function PartnerDetailsCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={4}>
                <Grid item xs={12} sm={6}>
                    <Card elevation={2}>
                        <CardContent>
                            <Typography className={classes.heading} >
                                Service Details
                                </Typography>
                            <Divider />
                        </CardContent>
                        {Details.map((item, index) => (
                            <CardActions disableSpacing key={index}>
                                <Typography className={classes.details} >{item.heading}</Typography>
                                <Typography className={classes.expand} onClick={handleExpandClick} aria-expanded={expanded} aria-label="show more">{item.days}</Typography>
                            </CardActions>
                        ))}
                        <CardActions disableSpacing>
                            <Typography className={classes.details} >Description</Typography>
                        </CardActions>
                        <Typography className={classes.descriptionContent} elevation={0}>
                            It is a long established fact that a reader will be distracted by the
                            readable content of a page when looking at its layout. It is a long
                            established fact that a reader will be distracted by the readable
                                </Typography>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
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
                </Grid>
            </Grid>
        </div>
    );
}

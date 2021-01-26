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


export default function ServiceDetails() {
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
        </div>
    );
}

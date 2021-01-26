import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, TextField } from '@material-ui/core';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import { Button, Grid } from '@material-ui/core';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import { Rating } from '@material-ui/lab';
import Divider from "./divider"


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
    heading: {
        fontSize: 25,
        color: theme.palette.secondary.light,
    },
    nameColor: {
        marginLeft: 20,
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
    buttonStyle: {
        margin: 20,
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        width: "93%",
        backgroundColor: "#14A884",
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
}));


export default function PartnerReviewsSectionCard() {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);
    const [value, setValue] = React.useState(4);

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
                                Reviews
                                </Typography>
                        </CardContent>
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                    </Avatar>
                            }
                            action={
                                <Typography className={classes.details}>12-09-2020</Typography>
                            }
                            title={
                                <Typography className={classes.nameColor}>Amit Singh Chauhan</Typography>
                            }
                            subheader={
                                <Rating name="read-only" value={value} readOnly />
                            }
                        />
                        <CardContent>
                            <Typography className={classes.details} variant="body2" color="textSecondary" component="p">
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                </Typography>
                        </CardContent>
                        <Divider />
                        <CardHeader
                            avatar={
                                <Avatar aria-label="recipe" className={classes.avatar}>
                                    R
                                    </Avatar>
                            }
                            action={
                                <Typography className={classes.details}>12-09-2020</Typography>
                            }
                            title={
                                <Typography className={classes.nameColor}>Mukesh Singh</Typography>
                            }
                            subheader={
                                <Rating name="read-only" value={value} readOnly />
                            }
                        />
                        <CardContent>
                            <Typography className={classes.details} variant="body2" color="textSecondary" component="p">
                                It is a long established fact that a reader will be distracted by the
                                readable content of a page when looking at its layout.
                                </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} sm={6}>
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
                        <div className={classes.buttonStyle}>
                            <Button variant="contained" style={{ backgroundColor: "#14A884", }} disableElevation>
                                Submit Review
                                </Button>
                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>
    );
}

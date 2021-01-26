import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 40,
    },
    aboutContent: {
        paddingTop: 20,
        width: "100%",
        color: theme.palette.secondary.light,
    },
    content: {
        marginTop: 20,
        color: theme.palette.primary.grey,
    },
}));


export default function AboutMe() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Card className={classes.aboutContent} elevation={1}>
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                        About Me
                    </Typography>
                    <Typography className={classes.content} variant="body2" color="textSecondary" component="p">
                        It is a long established fact that a reader will be distracted by the readable content of a page when
                        looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of
                        letters, as opposed to using 'Content here, content here', making it look like readable English.
                    </Typography>
                </CardContent>
            </Card>
        </div>
    );
}
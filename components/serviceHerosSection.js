import * as React from "react"
import Grid from '@material-ui/core/Grid';
import { Button, Card, CardActionArea, CardMedia, makeStyles, Typography } from "@material-ui/core";
import ReactCardCarousel from 'react-card-carousel';
import Link from "next/link";
import { useRouter } from 'next/router'
import { ArrowForward } from "@material-ui/icons";


const useStyle = makeStyles((theme) => ({
    heroDiv: {
        width: "100%",
    },
    heroImage: {
        height: 200,
        width: "100%",
        [theme.breakpoints.down('sm')]: {
            height: 250,
            width: "100%"
        },
    }
}))


function ServiceHerosSection(props) {
    const classes = useStyle();
    const router = useRouter();
    return (
        <div className={classes.heroDiv} >
            <img className={classes.heroImage} src="https://img.freepik.com/free-photo/dark-blue-glow-dust-particle-abstract-background_35672-1414.jpg?size=626&ext=jpg" alt="hero images" />
            <Button onClick={() => router.push("/partner")} color="secondary" variant="contained" style={{ borderRadius: 20, marginTop: -200, marginLeft: 20 }}>Registration</Button>
        </div>
    )
}

export default ServiceHerosSection;
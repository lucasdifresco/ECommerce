import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper';
import { Button, Typography, withTheme } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import '../../CSS/index.css';
import hero from '../../images/hero.jpg'
import greg from '../../images/Greg Thompson.jpg'
import jeff from '../../images/Jeff Jackson.jpg'
import matt from '../../images/Matt Chesterton.jpg'
import mindy from '../../images/Mindy Miller.jpg'
import olivia from '../../images/Olivia Dunnam.jpg'

const useStyles = makeStyles(() => ({
    container: {
        marginTop: 20,
    },
    imageContainer: {
        width: "100%",
        height: "70%",
        overflow: "hidden",
        position: "absolute",
        zIndex: "-1",
    },
    image: {
        width: "100%",
        filter: "brightness(70%)",
    },
    textContainer: {
        height: 600,
        paddingTop: "10%",
    },
    title: {
        color: "white",
    },
    subtitle: {
        textShadow: "0px 1px #FFFFFF",
        fontFamily: "'Norican', cursive",
    },
    body1: {
        fontFamily: "'Italianno', cursive",
        textAlign: "center",
        height: "100%",
        lineHeight: "100%",
    },
    paper: {
        margin: 30,
        padding: 20,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        height: "100%",
    },
}));

export default function Institutional() {
    const classes = useStyles();

    return (
        <div>
            <div className={classes.imageContainer}>
                <img src={hero} className={classes.image} />
            </div>
            <Container className={classes.textContainer}>
                <Typography gutterBottom variant="h1" component="h1" className={classes.title}>The Bookstore</Typography>
            </Container>
            <Container className={classes.container}>
                <Paper className={classes.paper}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}><Typography gutterBottom variant="h4" color="textPrimary" align="left">About Us</Typography></Grid>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h6" color="textPrimary" align="right">
                                The Bookstore is a leading international book retailer with a unique offer -- over 20 million books and free delivery worldwide (with no minimum spend). We ship thousands of books every day from our fulfillment centres in Gloucester, United Kingdom, and Melbourne, Australia, to more than 130 countries across the world. Our vision is to provide “All Books Available to All” by improving selection, access and affordability of books.
                            </Typography>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                    <Grid container spacing={1} direction="column">
                        <Grid item xs={12}><Typography gutterBottom variant="h4" color="textPrimary" align="left">Our Team</Typography></Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} direction="row" alignItems="center" justify="center">
                                <Grid item xs={3}></Grid>
                                <Grid item xs={3}>
                                    <Grid container spacing={1} direction="column" alignItems="center" justify="center">
                                        <Grid item xs={12}><Avatar style={{ height: '150px', width: '150px' }} alt="Greg Thompson" src={greg} /></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="h6" color="textPrimary" align="left">Greg Thompson</Typography></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="subtitle1" color="textSecondary" align="left">Chief Executive Officer</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}>
                                    <Grid container spacing={1} direction="column" alignItems="center" justify="center">
                                        <Grid item xs={12}><Avatar style={{ height: '150px', width: '150px' }} alt="Greg Thomson" src={jeff} /></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="h6" color="textPrimary" align="left">Jeff Jackson</Typography></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="subtitle1" color="textSecondary" align="left">Chief Financial Officer</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={3}></Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Grid container spacing={1} direction="row" alignItems="strech" justify="center">
                                <Grid item xs={4}>
                                    <Grid container spacing={1} direction="column" alignItems="center" justify="center">
                                        <Grid item xs={12}><Avatar style={{ height: '150px', width: '150px' }} alt="Greg Thomson" src={matt} /></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="h6" color="textPrimary" align="left">Matt Chesterton</Typography></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="subtitle1" color="textSecondary" align="left">Head of Marketing</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container spacing={1} direction="column" alignItems="center" justify="center">
                                        <Grid item xs={12}><Avatar style={{ height: '150px', width: '150px' }} alt="Greg Thomson" src={mindy} /></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="h6" color="textPrimary" align="left">Mindy Miller</Typography></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="subtitle1" color="textSecondary" align="left">Head of Human Resources</Typography></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={4}>
                                    <Grid container spacing={1} direction="column" alignItems="center" justify="center">
                                        <Grid item xs={12}><Avatar style={{ height: '150px', width: '150px' }} alt="Greg Thomson" src={olivia} /></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="h6" color="textPrimary" align="left">Olivia Dunnam</Typography></Grid>
                                        <Grid item xs={12}><Typography gutterBottom variant="subtitle1" color="textSecondary" align="left">Head of Sales</Typography></Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>

                <Paper className={classes.paper}>
                    <Grid container spacing={5}>
                        <Grid item xs={8}>
                            <Typography gutterBottom variant="h6" color="textPrimary">Search through the finnest online collection of books. Find the book you are looking for. Get the best prices on the market.</Typography>
                        </Grid>
                        <Grid item xs={4}>
                            <Link to="/shop" style={{ textDecoration: 'none' }}><Button fullWidth variant="contained" color="primary" className={classes.button}>Search</Button></Link>
                        </Grid>
                    </Grid>
                </Paper>
            </Container>
        </div>
    );
}
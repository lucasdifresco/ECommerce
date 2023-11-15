import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import { getOrdersItems } from '../Logic/logic.orders';
import { getOrders } from '../../Controllers/myApp';

const ordersStyles = makeStyles((theme) => ({
    gridContainer: {
        marginTop: 30,
        marginBottom: 20,
        background: '#3f51b5',
        color: 'white',
    },
    titleContainer: {
        padding: 20,
    },
}));
const itemStyles = makeStyles({
    root: {
        '&:hover': {
                background: '#3f51b5',
                color: 'white',
        },
    },
    filler: {
        flexGrow: 1,
    },
    spacer: {
        width: "20%",
        textAlign: "center",
    },
    price: {
        width: "20%",
        textAlign: "right",
    }
});
const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h7">{children}</Typography>
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: 500,
    },
}))(MuiDialogContent);

export default function Orders(props) {
    const orderClases = ordersStyles();
    const itemClasses = itemStyles();

    useEffect(() => { getOrders().then(() => { setOrders(getOrdersItems()); }); }, []);
    const [orders, setOrders] = React.useState(getOrdersItems());

    const validateUser = () => { if (props.user != 'user') { return (<Redirect to="/" />); } }

    const [currentOrder, setCurrentOrder] = React.useState({id: 0, status: '', total: 0, products:[]});
    const setOrder = (order) => { setCurrentOrder(order); }

    const [open, setOpen] = React.useState(false);
    const handleOpen = (order) => { setOrder(order); setOpen(true); };
    const handleClose = () => { setOpen(false); };

    
    return (
        <div>
            {validateUser()}
            <Container>
                <Card className={orderClases.gridContainer}>
                    <Grid container spacing={1} className={orderClases.titleContainer}>
                        <Grid item xs={4}><Typography variant="h5" align='left'>Order ID</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h5" align='center'>Order Status</Typography></Grid>
                        <Grid item xs={4}><Typography variant="h5" align='right'>Order Price</Typography></Grid>
                    </Grid>
                </Card>
                <Grid container spacing={1}>
                    {
                        orders.map(function (order) {
                            return (
                                <Grid item xs={12} >                             
                                    <Card className={itemClasses.root} onClick={() => { handleOpen(order); }}>
                                        <CardActions className={itemClasses.filler}>
                                            <Typography variant="h5">{order.id}</Typography>
                                            <div className={itemClasses.filler}></div>
                                            <Typography variant="h7" className={itemClasses.spacer}>{order.status}</Typography>
                                            <div className={itemClasses.spacer}></div>
                                            <Typography className={itemClasses.price} variant="h6">$ {(order.total).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                </Grid>

                <Card>
                    <Dialog onClose={handleClose} open={open}>
                        <DialogContent dividers>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}><Typography variant="h6" align='left'>Book Title</Typography></Grid>
                                    <Grid item xs={3}><Typography variant="h6" align='center'>Amount</Typography></Grid>
                                    <Grid item xs={3}><Typography variant="h6" align='right'>Price</Typography></Grid>
                                </Grid>
                                <Divider/>
                                {
                                    currentOrder.products.map(function (product) {
                                        return (
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}><Typography variant="h6" align='left'>{product.title}</Typography></Grid>
                                                <Grid item xs={3}><Typography variant="h6" align='center'>{product.amount}</Typography></Grid>
                                                <Grid item xs={3}><Typography variant="h6" align='right'>{product.price}</Typography></Grid>
                                            </Grid>
                                        );
                                    })
                                }
                            </CardContent>
                        </DialogContent>
                        <DialogTitle onClose={handleClose}>
                            <Grid container spacing={1}>
                                <Grid item xs={3}><Typography variant="subtitle1" align='left'>{currentOrder.id}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="h6" align='center'>{currentOrder.status}</Typography></Grid>
                                <Grid item xs={3}><Typography variant="h5" align='right'>$ {(currentOrder.total).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography></Grid>
                            </Grid>
                        </DialogTitle>
                    </Dialog>
                </Card>

            </Container>
        </div>
    );
}
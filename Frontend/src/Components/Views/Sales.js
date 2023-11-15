import React, { useEffect } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { Container, Divider } from '@material-ui/core';

import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router-dom';

import SearchIcon from '@material-ui/icons/Search';
import DoneIcon from '@material-ui/icons/DoneOutline';
import InfoIcon from '@material-ui/icons/Info';

import { getOrdersItems, getEmptyOrder } from '../Logic/logic.orders';
import { getAllOrders, modifyOrder } from '../../Controllers/myApp';

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
    formControl: {
        margin: theme.spacing(1),
        minWidth: 220,
    },
}));
const itemStyles = makeStyles({
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
    },
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

export default function Sales(props) {
    const itemClasses = itemStyles();
    const orderClases = ordersStyles();
    

    useEffect(() => { getAllOrders().then(() => { setOrders(getOrdersItems()); }); }, []);
    const [orders, setOrders] = React.useState(getOrdersItems());

    const validateUser = () => { if (props.user != 'admin') { return (<Redirect to="/" />); } }

    const [currentOrder, setCurrentOrder] = React.useState(getEmptyOrder());
    const setOrder = (order) => { setCurrentOrder(order); }

    const [openDetails, setOpenDetails] = React.useState(false);
    const handleOpenDetails = (order) => { setOrder(order); setOpenDetails(true); };
    const handleCloseDetails = () => { setOpenDetails(false); };

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = (order) => { setOrder(order); setOpenInfo(true); };
    const handleCloseInfo = () => { setOpenInfo(false); };

    const updateOrder = (id, status) => { modifyOrder({ id: id, status: status }).then(() => { getAllOrders().then(() => { setOrders(getOrdersItems()); }); }); }

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
                            const [status, setStatus] = React.useState(order.status);
                            const handleChange = (event) => { setStatus(event.target.value); };
                            return (
                                <Grid item xs={12} >
                                    <Card className={itemClasses.root}>
                                        <CardActions className={itemClasses.filler}>
                                            <Button size="small" color="primary" onClick={() => { handleOpenDetails(order); }}><SearchIcon /></Button>
                                            <Button size="small" color="primary" onClick={() => { handleOpenInfo(order); }}><InfoIcon /></Button>
                                            <Typography variant="h6" >{order.id}</Typography>
                                            <div className={itemClasses.filler}></div>
                                            
                                            <FormControl variant="outlined" className={orderClases.formControl}>
                                                <InputLabel>Status</InputLabel>
                                                <Select value={status} onChange={handleChange} label="Status">
                                                    <MenuItem value={"In Process"}>In Process</MenuItem>
                                                    <MenuItem value={"Shipped"}>Shipped</MenuItem>
                                                    <MenuItem value={"Delivered"}>Delivered</MenuItem>
                                                </Select>
                                            </FormControl>
                                            <Button size="small" color="primary" onClick={() => { updateOrder(order.id, status); }}><DoneIcon /></Button>
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
                    <Dialog onClose={handleCloseDetails} open={openDetails}>
                        <DialogContent dividers>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={6}><Typography variant="h6" align='left'>Book Title</Typography></Grid>
                                    <Grid item xs={3}><Typography variant="h6" align='center'>Amount</Typography></Grid>
                                    <Grid item xs={3}><Typography variant="h6" align='right'>Price</Typography></Grid>
                                </Grid>
                                <Divider />
                                {
                                    currentOrder.products.map(function (product) {
                                        return (
                                            <Grid container spacing={1}>
                                                <Grid item xs={6}><Typography variant="subtitle1" align='left'>{product.title}</Typography></Grid>
                                                <Grid item xs={3}><Typography variant="subtitle1" align='center'>{product.amount}</Typography></Grid>
                                                <Grid item xs={3}><Typography variant="subtitle1" align='right'>{product.price}</Typography></Grid>
                                            </Grid>
                                        );
                                    })
                                }
                            </CardContent>
                        </DialogContent>
                        <DialogTitle>
                            <Grid container spacing={1}>
                                <Grid item xs={3}><Typography variant="subtitle2" align='left'>{currentOrder.id}</Typography></Grid>
                                <Grid item xs={6}><Typography variant="subtitle1" align='center'>{currentOrder.status}</Typography></Grid>
                                <Grid item xs={3}><Typography variant="subtitle1" align='right'>$ {(currentOrder.total).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography></Grid>
                            </Grid>
                        </DialogTitle>
                    </Dialog>
                </Card>

                <Card>
                    <Dialog onClose={handleCloseInfo} open={openInfo}>
                        <DialogContent dividers>
                            <Grid container spacing={1} alignItems="stretch" justifyContent="center">
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="stretch" justifyContent="row">
                                        <Grid item xs={12}><Typography variant="h6" align="left" color="textSecondary">Contact Information</Typography></Grid>
                                        <Grid item xs={8}><Typography variant="subtitle1" align='left'>Name: {currentOrder.info.name} {currentOrder.info.surname}</Typography></Grid>
                                        <Grid item xs={4}><Typography variant="subtitle1" align='right'>Phone: {currentOrder.info.phone}</Typography></Grid>
                                        <Grid item xs={12}><Divider /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="stretch" justifyContent="row">
                                        <Grid item xs={12}><Typography variant="subtitle1" align="left" color="textSecondary">Delivery Information</Typography></Grid>
                                        <Grid item xs={12}><Typography variant="subtitle1" align='left'>Country: {currentOrder.info.country}</Typography></Grid>
                                        <Grid item xs={12}><Typography variant="subtitle1" align='left'>City: {currentOrder.info.city}</Typography></Grid>
                                        <Grid item xs={12}><Typography variant="subtitle1" align='left'>Street: {currentOrder.info.street}</Typography></Grid>
                                        <Grid item xs={12}><Typography variant="subtitle1" align='left'>Number: {currentOrder.info.streetNum}</Typography></Grid>
                                        <Grid item xs={12}><Typography variant="subtitle1" align='left'>Doorbell: {currentOrder.info.doorbell}</Typography></Grid>
                                        <Grid item xs={12}><Divider /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}><Typography variant="h6" align='left'>Comments: {currentOrder.info.comments}</Typography></Grid>
                            </Grid>
                        </DialogContent>
                    </Dialog>
                </Card>

            </Container>
        </div>
    );
}
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import item , { getBookById } from '../Logic/logic.shop';
import { emptyCart, getCart } from "../Logic/logic.cart";
import order, { prepareCartToOrder } from "../Logic/logic.orders";
import { createOrder, updateProduct } from "../../Controllers/myApp";
import Alert from '@material-ui/lab/Alert';
import { useEffect } from 'react';

import { getOrdersItems } from '../Logic/logic.orders';
import { getOrders } from '../../Controllers/myApp';

const useStyles = makeStyles({
    root: {
        minWidth: 500,
        marginTop: 30,
        padding: 30,
        
    },
    filler: {
        flexGrow: 1,
    },
    input: {
        display: 'none',
    },
});

export default function Checkout(props) {
    const classes = useStyles();
    const [validation, setValidation] = React.useState(false);
    
    
    useEffect(() => { getOrders().then(() => { setOrder(getLastOrder()); }); }, []);
    const getLastOrder = () => {
        const orders = getOrdersItems();
        console.log(orders[orders.length - 1]);
        return orders[orders.length - 1];
    }
    const [order, setOrder] = React.useState(getLastOrder());
    const [orderInfo, setOrderInfo] = React.useState({
        name: order.info.name,
        surname: order.info.surname,
        phone: order.info.phone,
        country: order.info.country,
        city: order.info.city,
        street: order.info.street,
        streetNum: order.info.streetNum,
        doorbell: order.info.doorbell,
        comments: ''
    });
    const changeHandler = (e) => { setOrderInfo(prevValues => { return ({ ...prevValues, [e.target.name]: e.target.value }); }) };

    const [nameError, setNameError] = React.useState(false);
    const [surnameError, setSurnameError] = React.useState(false);
    const [phoneError, setPhoneError] = React.useState(false);
    const [countryError, setCountryError] = React.useState(false);
    const [cityError, setCityError] = React.useState(false);
    const [streetError, setStreetError] = React.useState(false);
    const [streetNumError, setStreetNumError] = React.useState(false);
    
    const [nameHelper, setNameHelper] = React.useState('Please enter the name of the contact.');
    const [surnameHelper, setSurnameHelper] = React.useState('Please enter the surname of the contact.');
    const [phoneHelper, setPhoneHelper] = React.useState('Please enter a valid phone number.');
    const [countryHelper, setCountryHelper] = React.useState('Please enter a valid country.');
    const [cityHelper, setCityHelper] = React.useState('Please enter a valid city.');
    const [streetHelper, setStreetHelper] = React.useState('Please enter a valid street.');
    const [streetNumHelper, setStreetNumHelper] = React.useState('Please enter a valid street number.');
    const [doorbellHelper, setDoorbellHelper] = React.useState('If is a building please indicate wich doorbell to ring.');
    
    const onBlurName = (e) => { if (e.target.value == "") { setNameError(true); } else { setNameError(false); } }
    const onBlurSurname = (e) => { if (e.target.value == "") { setSurnameError(true); } else { setSurnameError(false); } }
    const onBlurPhone = (e) => { if (e.target.value == "") { setPhoneError(true); } else { setPhoneError(false); }}
    const onBlurCountry = (e) => { if (e.target.value == "") { setCountryError(true); } else { setCountryError(false); }}
    const onBlurCity = (e) => { if (e.target.value == "") { setCityError(true); } else { setCityError(false); }}
    const onBlurStreet = (e) => { if (e.target.value == "") { setStreetError(true); } else { setStreetError(false); }}
    const onBlurStreetNum = (e) => { if (e.target.value == "") { setStreetNumError(true); } else { setStreetNumError(false); }}

    const [alert, setAlert] = React.useState(false);
    const AlertMessage = () => { if (alert) { return <Alert severity="error">Please check the errors on the form.</Alert>; } }
    const validateUser = () =>
    {
        if (props.user != 'user') { return (<Redirect to="/" />); }
        else if (validation) { return (<Redirect to="/orders" />);}
    }
    const sendForm = () => {
        if (!nameError && !surnameError && !phoneError && !countryError && !cityError && !streetError && !streetNumError)
        {
            const order = prepareCartToOrder(orderInfo);
            createOrder(order).then(() => {
                getCart().map(function (item) {
                    const book = getBookById(item.product);
                    updateProduct({ id: book.id, stock: (book.stock - item.amount) });
                });
                emptyCart();
                setValidation(true);
            });
        }
        else { setAlert(true); }
    }
    
    return (
        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }} >
            {validateUser()}
            <Grid item xs={1} md={4}></Grid>
            <Grid item xs={10} md={4}>
                <Card className={classes.root}>
                    <Grid container spacing={3} alignItems="stretch" justifyContent="center" direction="column">
                        <Grid item xs={12}><Typography variant="h4" align="center">Checkout</Typography></Grid>
                        <Grid item xs={12}><Divider /></Grid>
                        
                        <Grid item xs={12}>
                            <Grid container spacing={1} alignItems="stretch" justifyContent="center">
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="stretch" justifyContent="row">
                                        <Grid item xs={12}><Typography variant="h6" align="left" color="textSecondary">Contact Information</Typography></Grid>
                                        <Grid item xs={4}><TextField fullWidth name='name' label="Name" defaultValue={order.info.name} helperText={nameHelper} onChange={changeHandler} onBlur={onBlurName} error={nameError}/></Grid>
                                        <Grid item xs={4}><TextField fullWidth name='surname' label="Surname" defaultValue={order.info.surname} helperText={surnameHelper} onChange={changeHandler} onBlur={onBlurSurname} error={surnameError}/></Grid>
                                        <Grid item xs={4}><TextField fullWidth name='phone' label="Phone" defaultValue={order.info.phone} helperText={phoneHelper} type="number" onChange={changeHandler} onBlur={onBlurPhone} error={phoneError}/></Grid>
                                        <Grid item xs={12}><Divider /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={1} alignItems="stretch" justifyContent="row">
                                        <Grid item xs={12}><Typography variant="h6" align="left" color="textSecondary">Delivery Information</Typography></Grid>
                                        <Grid item xs={6}><TextField fullWidth name='country' label="Country" defaultValue={order.info.country} helperText={countryHelper} onChange={changeHandler} onBlur={onBlurCountry} error={countryError}/></Grid>
                                        <Grid item xs={6}><TextField fullWidth name='city' label="City" defaultValue={order.info.city} helperText={cityHelper} onChange={changeHandler} onBlur={onBlurCity} error={cityError}/></Grid>
                                        <Grid item xs={6}><TextField fullWidth name='street' label="Street" defaultValue={order.info.street} helperText={streetHelper} onChange={changeHandler} onBlur={onBlurStreet} error={streetError}/></Grid>
                                        <Grid item xs={3}><TextField fullWidth name='streetNum' label="Street Number" defaultValue={order.info.streetNum} helperText={streetNumHelper} type="number" onChange={changeHandler} onBlur={onBlurStreetNum} error={streetNumError}/></Grid>
                                        <Grid item xs={3}><TextField fullWidth name='doorbell' label="Doorbell" defaultValue={order.info.doorbell} helperText={doorbellHelper} onChange={changeHandler}/></Grid>
                                        <Grid item xs={12}><Divider /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}><TextField fullWidth multiline rows={4} name='comments' label="Comments" helperText="Do you have any comments?" onChange={changeHandler}/></Grid>
                                <Grid item xs={12}>{AlertMessage()}</Grid>
                            </Grid>
                        </Grid>
                    
                        <Grid item xs={12}>
                            <Grid container spacing={0} alignItems="stretch" justifyContent="center" direction="row">
                                <Grid item xs={1}></Grid>
                                <Grid item xs={3}><Link to="/cart" style={{ textDecoration: 'none' }}><Button fullWidth variant="contained" color="primary">Cancel</Button></Link></Grid>
                                <Grid item xs={4}></Grid>
                                <Grid item xs={3}><Button fullWidth variant="contained" color="primary" onClick={sendForm}>Complete</Button></Grid>
                                <Grid item xs={1}></Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={1} md={4}></Grid>
        </Grid>
    );
}
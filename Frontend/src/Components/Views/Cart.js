import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import { Button, Container } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import RemoveItemIcon from '@material-ui/icons/RemoveShoppingCartOutlined';
import AddIcon from '@material-ui/icons/AddCircleOutline';
import RemoveIcon from '@material-ui/icons/RemoveCircleOutline';

import { getBookById, getEmpty } from "../Logic/logic.shop";
import { removeFromCart, addAmount, substractAmount, getCart } from "../Logic/logic.cart";

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    content: {
        height: '100%',
        width: 300,
        margin: 'auto',
    },
    filler: {
        flexGrow: 1,
    },
    spacer: {
        width: 64,
        textAlign: "center",
    },
    titelSpacer: {
        width: 216,
        textAlign: "center",
    },
    price: {
        width: 150,
    },
    container: {
        marginTop: 10,
    },
    gridContainer: {
        marginTop: 30,
        background: '#3f51b5',
        color: 'white',
    },
    titleContainer: {
      padding: 20,  
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
            {onClose ? (<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}><CloseIcon /></IconButton>) : null}
        </MuiDialogTitle>
    );
});
const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
        minWidth: 500,
    },
}))(MuiDialogContent);
function Alert(props) { return <MuiAlert elevation={6} variant="filled" {...props} />; }

export default function Cart(props) {
    const classes = useStyles();
    const [items, setItems] = React.useState(getCart());
    const update = () => { setItems(getCart()); updateTotal(); }

    const getBook = (product) => { return getBookById(product);}
    const remove = (id) => { removeFromCart(id); update(); }
    const add = (id) => { if (addAmount(id) == false) { openWarning();} update(); }
    const substract = (id) => { substractAmount(id); update(); }

    const [currentBook, setCurrentBook] = React.useState(getEmpty());
    const setBook = (book) => { setCurrentBook(book); }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    
    const [warning, setWarning] = React.useState(false);
    const openWarning = () => { setWarning(true); };
    const closeWarning = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setWarning(false);
    }

    const [total, setTotal] = React.useState(0);
    const updateTotal = () => {
        let sum = 0;
        getCart().forEach(item => {
            const book = getBookById(item.product);
            sum += (book.price * item.amount);
        });
        if (total != sum) { setTotal(sum);}
    }

    const [route, setRoute] = React.useState('/signIn');
    const validateUser = () => {
        if (props.user == 'guest') { if (route != '/signIn') { setRoute('/signIn'); } }
        else if (props.user == 'user') {
            if (items.length != 0) { if (route != '/checkout') { setRoute('/checkout'); } }
            else { if (route != '/shop') { setRoute('/shop'); }}
        }
        else if (props.user == 'admin') { return (<Redirect to="/" />); }
    }

    return (
        <div>
            {updateTotal()}
            {validateUser()}
            <Container>
                <Card className={classes.gridContainer}>
                    <CardActions className={classes.filler, classes.titleContainer}>
                        <Typography variant="h5" align='left'>Book Title</Typography><div className={classes.filler}></div>
                        <div className={classes.spacer}></div>
                        <Typography className={classes.titelSpacer} variant="h5" align='center'>Amount</Typography>
                        <div className={classes.spacer}></div>
                        <Typography className={classes.price} variant="h5" align='left'>Price</Typography>
                    </CardActions>
                </Card>
                <Grid container spacing={1} className={classes.container}>
                    {
                        items.map(function (item)
                        {
                            const book = getBook(item.product);
                            console.log(book);
                            return (
                                <Grid item xs={12} >
                                    <Card>
                                        <CardActions className={classes.filler}>
                                            <Button size="small" color="primary" onClick={() => { remove(item.id); }}><RemoveItemIcon /></Button>
                                            <Button size="small" color="primary" onClick={() => { setBook(book); handleClickOpen(); }} ><Typography variant="h7">{book.name}</Typography></Button>
                                            <div className={classes.filler}></div>
                                            <Button size="small" color="primary" onClick={() => { substract(item.id); }}><RemoveIcon /></Button>
                                            <Typography variant="h7" className={classes.spacer}>{item.amount.toLocaleString()} / {book.stock.toLocaleString()}</Typography>
                                            <Button size="small" color="primary" onClick={() => { add(item.id); }}><AddIcon /></Button>
                                            <div className={classes.spacer}></div>
                                            <Typography className={classes.price} variant="h6">$ {(book.price * item.amount).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                                        </CardActions>
                                    </Card>
                                </Grid>
                            );
                        })
                    }
                    <Grid item xs={12}>
                        <Grid container spacing={1}>
                            <Grid item xs={8}></Grid>
                            <Grid item xs={4}>
                                <Link to={route} style={{ textDecoration: 'none' }}>
                                    <Button fullWidth variant="contained" color="primary">
                                        <Typography variant="h6" noWrap>Place Order: $ {(total).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={0}></Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

            { /* Item Details */}
            <Card className={classes.root}>
                <Dialog onClose={handleClose} open={open}>
                    <DialogTitle onClose={handleClose}>{currentBook.name}</DialogTitle>
                    <DialogContent dividers>
                        <CardMedia component="img" image={currentBook.img} className={classes.content} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">{currentBook.author} ({currentBook.year})</Typography>
                            <Typography variant="h7" color="textSecondary" component="h3">{currentBook.category}</Typography>
                            <Typography variant="body2" color="textSecondary" component="p">{currentBook.description}</Typography>
                        </CardContent>
                        <CardActions className={classes.filler}>
                            <div className={classes.filler}></div>
                            <Typography variant="h7" component="h2">$ {(currentBook.price + 0).toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                        </CardActions>
                    </DialogContent>
                </Dialog>
            </Card>

            <Snackbar open={warning} autoHideDuration={2000} onClose={closeWarning}>
                <Alert onClose={closeWarning} severity="warning"> Out of stock! </Alert>
            </Snackbar>
        </div>
    );
}
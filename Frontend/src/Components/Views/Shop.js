import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import AddToCartIcon from '@material-ui/icons/AddShoppingCart';

import { getBooks, getEmpty } from '../Logic/logic.shop';
import { addToCart } from "../Logic/logic.cart";
import { getProducts } from '../../Controllers/myApp';

const useStyles = makeStyles((theme) => ({ gridContainer: { marginTop: "10px", }, }));
const itemStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    content: {
        height: 500,
    },
    filler: {
        flexGrow: 1,
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
const detailStyles = makeStyles({
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

export default function Shop(props) {
    const classes = useStyles();
    const itemClasses = itemStyles();
    const detailClasses = detailStyles();

    useEffect(() => { update(); }, []);
    const [items, setItems] = React.useState(getBooks(props.title));
    const update = () => { getProducts().then(() => { setItems(getBooks(props.title)); }); }

    const [warning, setWarning] = React.useState(false);
    const openWarning = () => { setWarning(true); };
    const closeWarning = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setWarning(false);
    }
    const add = (id) => {
        if (addToCart(id) != false) { props.badgeAdder(); }
        else { openWarning(); }
    };
    
    const [currentBook, setCurrentBook] = React.useState(getEmpty());
    const setBook = (book) => { setCurrentBook(book); console.log(book.name); }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };

    return (
        <div className={classes.root}>
            <Container>
                <Grid container spacing={3} className={classes.gridContainer}>
                    {
                        items.map(function (item)
                        {                        
                            return (
                                <Grid item xs={12} sm={6} md={4} lg={3} >
                                    {/*<ShopItem item={item} />*/}

                                    
                                    <Card className={itemClasses.root}>
                                        {/* Item */}
                                        <CardActionArea onClick={() => { setBook(item); handleClickOpen(); }} className={itemClasses.content}>
                                            <CardMedia component="img" height="400" image={item.img} />
                                            <CardContent>
                                                <Typography gutterBottom variant="h7" component="h3">{item.name}</Typography>
                                                <Typography variant="h7" color="textSecondary" component="h3">{item.author}</Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">{item.category}</Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions className={itemClasses.filler}>
                                            <Button size="small" color="primary" onClick={() => { add(item.id) }}><AddToCartIcon /></Button>
                                            <div className={itemClasses.filler}></div>
                                            <Typography variant="h7" component="h2">$ {item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                                        </CardActions>


                                    </Card>
                                </Grid>
                            );
                        })
                    }

                    

                    {/* Item Details*/}
                    <Card className={detailClasses.root}>
                        <Dialog onClose={handleClose} open={open}>
                            <DialogTitle onClose={handleClose}>{currentBook.name}</DialogTitle>
                            <DialogContent dividers>
                                <CardMedia component="img" image={currentBook.img} className={detailClasses.content} />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">{currentBook.author} ({currentBook.year})</Typography>
                                    <Typography variant="h7" color="textSecondary" component="h3">{currentBook.category}</Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">{currentBook.description}</Typography>
                                </CardContent>
                                <CardActions className={detailClasses.filler}>
                                    <Button size="small" color="primary" onClick={() => { add(currentBook.id); handleClose(); }}><AddToCartIcon /></Button>
                                    <div className={detailClasses.filler}></div>
                                    <Typography variant="h7" component="h2">$ {currentBook.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography>
                                </CardActions>
                            </DialogContent>
                        </Dialog>
                    </Card>

                </Grid>
            </Container>
            
            <Snackbar open={warning} autoHideDuration={2000} onClose={closeWarning}>
                <Alert onClose={closeWarning} severity="warning"> This Item is already in the Shopping Cart. </Alert>
            </Snackbar>
        </div>
    );
}
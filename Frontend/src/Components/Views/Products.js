import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Paper } from '@material-ui/core';

import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import DoneIcon from '@material-ui/icons/DoneOutline';
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import EditIcon from '@material-ui/icons/Edit';

import { getProducts, createProduct, modifyProduct, removeProduct, storeImgInServer, storeImgInCloud } from "../../Controllers/myApp";
import { getBooks, getEmpty } from '../Logic/logic.shop';

const useStyles = makeStyles((theme) => ({
    gridContainer: { marginTop: "10px", },
    paper: {
        height: 50,
        paddingTop: 20,
    },
    cardTitle: {
        marginTop: 10,
        padding: 20,
        background: '#3f51b5',
        color: 'white',
    }
}));
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
const productStyles = makeStyles({
    root: {
        maxWidth: 500,
    },
    filler: {
        flexGrow: 1,
    },
    input: {
        display: 'none',
    },
    camera: {
        height: "100%",
        width: "100%",
    }
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
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

export default function Products(props) {
    const classes = useStyles();
    const productClasses = productStyles();

    useEffect(() => { update(); }, []);
    const [items, setItems] = React.useState(getBooks(props.title));
    const update = () => { getProducts().then(() => { setItems(getBooks(props.title));}); }

    const validateUser = () => { if (props.user != 'admin') { return (<Redirect to="/" />); } }

    const [warning, setWarning] = React.useState(false);
    const openWarning = () => { setWarning(true); };
    const closeWarning = (event, reason) => {
        if (reason === 'clickaway') { return; }
        setWarning(false);
    }

    const [itemType, setItemType] = React.useState('new');
    const setNewItemType = () => { setItemType('new'); }
    const setEditItemType = () => { setItemType('edit'); }

    const [currentBook, setCurrentBook] = React.useState(getEmpty());
    const setBook = (book) => {
        setCurrentBook(book);
        setName(book.name);
        setAuthor(book.author);
        setCategory(book.category);
        setDescription(book.description);
        setPhoto(book.photo);
        setYear(book.year);
        setPrice(book.price);
        setStock(book.stock);
    }

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); };
    
    const handleImg = (e) => { saveImg(e.target.files[0]); }

    const [name, setName] = React.useState(currentBook.name);
    const [author, setAuthor] = React.useState(currentBook.author);
    const [category, setCategory] = React.useState(currentBook.category);
    const [description, setDescription] = React.useState(currentBook.description);
    const [photo, setPhoto] = React.useState(currentBook.img);
    const [year, setYear] = React.useState(currentBook.year);
    const [price, setPrice] = React.useState(currentBook.price);
    const [stock, setStock] = React.useState(currentBook.stock);
    const handleName = (event) => { setName(event.target.value); }
    const handleAuthor = (event) => { setAuthor(event.target.value); }
    const handleCategory = (event) => { setCategory(event.target.value); }
    const handleDescription = (event) => { setDescription(event.target.value); }
    const handlePhoto = (url) => { setPhoto(url); }
    const handleYear = (event) => {
        const year = Math.abs(Math.round(event.target.value));
        event.target.value = year;
        setYear(year);
    }
    const handlePrice = (event) => {
        const price = Math.abs(event.target.value);
        event.target.value = price;
        setPrice(price);
    }
    const handleStock = (event) => {
        const stock = Math.abs(Math.round(event.target.value));
        event.target.value = stock;
        setStock(stock);
    }


    const editAction = () => {
        if (itemType == "new") {
            if (name !== "" && author !== "" && category !== "" && year !== "" && price !== "" && stock !== "") { create(); }
            else { alert("Must complete all fields."); }
        }
        if (itemType == "edit") {
            if (name == "") { setName(Null); }
            if (author == "") { setAuthor(Null); }
            if (category == "") { setCategory(Null); }
            if (description == "") { setDescription(Null); }
            if (photo == "") { setPhoto(Null); }
            if (year == 0) { setYear(Null); }
            if (price == 0) { setPrice(Null); }
            if (stock == 0) { setStock(Null); }
            modify();
        }
        handleClose();
    }
    const deleteAction = () => {
        if (itemType == "edit") { remove(); }
        handleClose();
    }
    const create = async function () {
        let datos = { name: name, author: author, category: category, description: description, photo: photo, year: year, price: price, stock: stock }
        await createProduct(datos).then(() => { update(); });
    }
    const modify = async function () {
        let datos = { id: currentBook.id, name: name, author: author, category: category, description: description, photo: photo, year: year, price: price, stock: stock }
        await modifyProduct(datos).then(() => { update(); });
    }
    const remove = async function () {
        let datos = { id: currentBook.id }
        await removeProduct(datos).then(() => { update(); });
    }

    const quickRemove = async function (item) {
        let datos = { id: item.id }
        await removeProduct(datos).then(() => { update(); });
    }
    
    const saveImg = (img) => { uploadImg(img); }
    const uploadImg = async function (img) {
        if (img != null) {
            let file = img;
            let original = img.name;
            let extension = original.substring(original.indexOf('.'), original.length);
            let rand = Math.random().toString().substring(2, 15);
            let name = "img" + localStorage.getItem('nombre') + "_" + rand + extension;
            let newFile = await storeImgInServer(file, name);

            if (newFile.ok) {
                let response = await storeImgInCloud(name);
                if (response.ok) {
                    handlePhoto(response.result.url);
                    console.log(response.result.url, ": ", photo);
                    alert("Succesfully uploaded image.");
                }
                else { alert("Something went wrong while uploading the image to the cloud. Try again later.");}
            }
            else { alert("Something went wrong while uploading the image to the server. Try again later."); }
        }
    }

    const displayImg = () => {
        if (currentBook.img.length > 0) { return (<img src={currentBook.img} className={productClasses.camera} />); }
        else if (photo != undefined) { return (<img src={photo} className={productClasses.camera} />);}
        else { return (<IconButton color="primary" component="span"><PhotoCamera className={productClasses.camera} /></IconButton>); }
    }

    return (
        <div className={classes.root}>
            {validateUser()}
            <Container>
                <Grid container spacing={1} className={classes.gridContainer} alignItems="strech" direction="column" justifyContent="center">
                    <Grid item xs={12}>
                        <Card className={classes.cardTitle}>
                            <Grid container spacing={1} alignItems="center" justifyContent="center">
                                <Grid item xs={1}></Grid>
                                <Grid item xs={6}><Typography variant="h5" align='center'>Book Title</Typography></Grid>
                                <Grid item xs={2}><Typography variant="h5" align='center'>Stock</Typography></Grid>
                                <Grid item xs={2}><Typography variant="h5" align='center'>Price</Typography></Grid>
                                <Grid item xs={1}></Grid>
                                </Grid>
                        </Card>
                    </Grid>
                    {
                        items.map(function (item) {
                            return (
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}>
                                        <Grid container spacing={1} alignItems="center" justifyContent="center" direction="row" >
                                            <Grid item xs={1}><Button size="small" color="primary" onClick={() => { quickRemove(item) }}><DeleteIcon /></Button></Grid>
                                            <Grid item xs={6}><Typography variant="subtitle1">{item.name}</Typography></Grid>
                                            <Grid item xs={2}><Typography variant="h6" align="center">{item.stock.toLocaleString()}</Typography></Grid>
                                            <Grid item xs={2}><Typography variant="h6" align="center">$ {item.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</Typography></Grid>
                                            <Grid item xs={1}><Button size="small" color="primary" onClick={() => { setEditItemType(); setBook(item); handleClickOpen(); }}><EditIcon /></Button></Grid>
                                        </Grid>
                                    </Paper>
                                </Grid>
                            );
                        })
                    }
                    <Grid item xs={12}><Button size="large" color="primary" fullWidth variant="contained" onClick={() => { setNewItemType(); setBook(getEmpty()); handleClickOpen(); }}>Add New Book</Button></Grid>
                </Grid>
            </Container>

            <Card className={productClasses.root}>
                <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                    <DialogTitle id="customized-dialog-title" onClose={handleClose}>Item ID: {currentBook.id}</DialogTitle>
                    <DialogContent dividers>
                        <CardContent>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={6} xs={12}>
                                            <TextField fullWidth label="Book Name" defaultValue={currentBook.name} onChange={handleName} helperText="Please, provide the name of the book." />
                                            <TextField fullWidth label="Book Author" defaultValue={currentBook.author} onChange={handleAuthor} helperText="Please, provide the name of the author of the book." />
                                            <TextField fullWidth label="Book Category" defaultValue={currentBook.category} onChange={handleCategory} helperText="Please, provide the category of the book." />
                                        </Grid>
                                        <Grid item sm={6} xs={12}>
                                            <input accept="image/*" className={productClasses.input} id="icon-button-file" type="file" onChange={handleImg}/>
                                            <label htmlFor="icon-button-file">{displayImg()}</label>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <Grid container spacing={3}>
                                        <Grid item sm={4} xs={12}><TextField label="Year" type="number" defaultValue={currentBook.year} onChange={handleYear} InputLabelProps={{ shrink: true, }} /></Grid>
                                        <Grid item sm={4} xs={12}><TextField label="Price" type="number" defaultValue={currentBook.price} onChange={handlePrice} InputLabelProps={{ shrink: true, }} /></Grid>
                                        <Grid item sm={4} xs={12}><TextField label="Stock" type="number" defaultValue={currentBook.stock} onChange={handleStock} InputLabelProps={{ shrink: true, }} /></Grid>
                                    </Grid>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField fullWidth defaultValue={currentBook.description} onChange={handleDescription} label="Description" multiline rows={4} />
                                </Grid>
                            </Grid>
                        </CardContent>
                        <CardActions className={productClasses.filler}>
                            <Button size="small" color="primary" onClick={deleteAction}><DeleteIcon /></Button>
                            <div className={productClasses.filler}></div>
                            <Button size="small" color="primary" onClick={editAction}><DoneIcon /></Button>
                        </CardActions>
                    </DialogContent>
                </Dialog>
            </Card>


            <Snackbar open={warning} autoHideDuration={2000} onClose={closeWarning}>
                <Alert onClose={closeWarning} severity="warning"> This Item is already in the Shopping Cart. </Alert>
            </Snackbar>
        </div>
    );
}
import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';

import SearchIcon from '@material-ui/icons/Search';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import LockIcon from '@material-ui/icons/Lock';
import CartIcon from '@material-ui/icons/ShoppingCart';
import LocalShippingIcon from '@material-ui/icons/LocalShipping';
import StorefrontIcon from '@material-ui/icons/Storefront';

import Institutional from './Components/Views/Institutional';
import Shop from './Components/Views/Shop';
import ShopPreview from './Components/Views/ShopPreview';
import Cart from './Components/Views/Cart';
import Orders from './Components/Views/Orders';
import Checkout from './Components/Views/Checkout';
import Sales from './Components/Views/Sales';
import Products from './Components/Views/Products';
import SignIn from './Components/Views/SignIn';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { logout } from "./Controllers/myApp";

const useStyles = makeStyles((theme) => ({
  root: {

  },
  grow: {
    flexGrow: 1,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    flexGrow: 1,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 0),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'flex',
  },
}));

export default function App() {
  const classes = useStyles();
  
  const [title, setTitle] = React.useState("");
  const updateTitle = (newTitle) => {
    setTitle(newTitle);
    if (newTitle.key === "Enter") { newTitle.preventDefault(); }
  }

  const [user, setUser] = React.useState('guest');
  const logInUser = () => { setUser('user'); }
  const logInAdmin = () => { setUser('admin'); }
  const logOut = () => { setUser('guest'); logout(); }
  
  const validateUser = () => {
    const token = JSON.parse(localStorage.getItem('x'));
    if (token == null) { if (user != 'guest') { logOut();} }
    else {
      if (token.admin == false) { if (user != 'user') { logInUser(); } }
      else { if (user != 'admin') { logInAdmin(); } }
    }
    
    return (updateBar());
  }
  const updateBar = () => {
    switch (user) {
      case 'guest':
        return (
          <div className={classes.sectionDesktop}>
            <Link to="/shop" style={{ textDecoration: 'none' }}><IconButton color="default"><SearchIcon /></IconButton></Link>
            <Link to="/cart" style={{ textDecoration: 'none' }}><IconButton color="default" onClick={emptyBadge}><Badge badgeContent={badge} color="secondary"><CartIcon /></Badge></IconButton></Link>
            <Link to="/signIn" style={{ textDecoration: 'none' }}><IconButton color="default" ><LockIcon /></IconButton></Link>
          </div>
        );
      case 'user':
        return (
          <div className={classes.sectionDesktop}>
            <Link to="/shop" style={{ textDecoration: 'none' }}><IconButton color="default"><SearchIcon /></IconButton></Link>
            <Link to="/cart" style={{ textDecoration: 'none' }}><IconButton color="default" onClick={emptyBadge}><Badge badgeContent={badge} color="secondary"><CartIcon /></Badge></IconButton></Link>
            <Link to="/orders" style={{ textDecoration: 'none' }}><IconButton color="default"><LocalShippingIcon /></IconButton></Link>
            <Link to="/" style={{ textDecoration: 'none' }}><IconButton color="default" onClick={logOut}><LockOpenIcon /></IconButton></Link>
          </div>
        );
      case 'admin':
        return (
          <div className={classes.sectionDesktop}>
            <Link to="/shopPreview" style={{ textDecoration: 'none' }}><IconButton color="default"><SearchIcon /></IconButton></Link>
            <Link to="/products" style={{ textDecoration: 'none' }}><IconButton color="default"><StorefrontIcon /></IconButton></Link>
            <Link to="/sales" style={{ textDecoration: 'none' }}><IconButton color="default"><LocalShippingIcon /></IconButton></Link>
            <Link to="/" style={{ textDecoration: 'none' }}><IconButton color="default" onClick={logOut}><LockOpenIcon /></IconButton></Link>
          </div>
        );
    }
  }
  const [badge, setBadge] = React.useState(0);
  const emptyBadge = () => { setBadge(0); }
  const addBadge = () => { setBadge(badge + 1); }
  
  return (
    <BrowserRouter>
    <div className={classes.root}>
        <div className={classes.grow}>
          <AppBar position="static">
            <Toolbar>
              <Link to="/" style={{ textDecoration: 'none' }}><Button variant="contained" color="primary"><Typography className={classes.title} variant="h6" noWrap>The Bookstore</Typography></Button></Link>
              <div className={classes.search}>
                <InputBase
                placeholder="Search…"
                classes={{ root: classes.inputRoot, input: classes.inputInput, }}
                inputProps={{ 'aria-label': 'search' }}
                value={title}
                onChange={(e) => { updateTitle(e.target.value) }}
                onKeyPress={(e) => { updateTitle(e.target.value) }}
                />
              </div>
              {validateUser()}
            </Toolbar>
          </AppBar>
          <Switch>
            <Route path="/" exact component={Institutional} />
            <Route path="/shop" exact><Shop title={title} badgeAdder={addBadge}></Shop></Route>
            <Route path="/shopPreview" exact><ShopPreview title={title}></ShopPreview></Route>
            <Route path="/cart" exact><Cart user={user}></Cart></Route>
            <Route path="/orders" exact><Orders user={user}></Orders></Route>
            <Route path="/checkout" exact><Checkout user={user}></Checkout></Route>
            <Route path="/sales" exact><Sales user={user}></Sales></Route>
            <Route path="/products" exact><Products title={title} user={user}></Products></Route>
            <Route path="/signIn" exact><SignIn route="/" validation={validateUser}></SignIn></Route>
          </Switch>
        </div>
    </div>
    </BrowserRouter>
  );
}

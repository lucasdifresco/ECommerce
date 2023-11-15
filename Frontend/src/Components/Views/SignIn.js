import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import { Redirect } from 'react-router';

import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { login, signup } from "../../Controllers/myApp";
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles({
    root: {
        minWidth: 300,
        padding: 10,
    },
    filler: {
        flexGrow: 1,
    },
    input: {
        display: 'none',
    },
});

export default function LogInDialog(props) {
    const classes = useStyles();
    const [validation, setValidation] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailValidation, setEmailValidation] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passValidation, setPassValidation] = React.useState('');
    const [alert, setAlert] = React.useState(false);


    const handleEmail = (event) => { setEmail(event.target.value); }
    const handleEmailBlur = (event)=>{
        if (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(event.target.value)) { setEmailValidation(''); }
        else { setEmailValidation('Invalid email.'); }
    }
    const handlePassword = (event) => { setPassword(event.target.value); }
    const handlePassBlur = (event) => {
        if (event.target.value !== "" && event.target.value.length > 7) { setPassValidation(''); }
        else { setPassValidation('Invalid email.'); }
    }

    const newUser = () => {
        if (email != "" && password != "" && emailValidation.length == 0 && passValidation.length == 0) { registrarUsuario(); }
        else { setAlert(true); }
    }
    const registrarUsuario = async function () {
        
        let datos = { email: email, password: password }
        let getLogin = await signup(datos);
        if (getLogin.rdo === 0) { setValidation(true); props.validation();}
        if (getLogin.rdo === 1) { setAlert(true); }
    }

    //Valido campos y llamo endpoint
    const loginUser = () => {
        if (email != "" && password != "" && emailValidation.length == 0 && passValidation.length == 0) { validarLogin(); }
        else { setAlert(true); }
    }
    
    //Ejecuto el endopoint para validar login
    const validarLogin = async function () {
        let datos = { email: email, password: password }
        let getLogin = await login(datos);
        if (getLogin.rdo === 0) { setValidation(true); props.validation();}
        if (getLogin.rdo === 1) { setAlert(true); }
    }
    const validate = () => { if (validation) { return (<Redirect to={props.route} />);  } }
    const AlertMessage = () => { if (alert) { return <Alert severity="error">Invalid username or password. Please check re-enter your username and password.</Alert>; } }

    return (
        <Grid container spacing={1} direction="row" alignItems="center" justifyContent="center" style={{ minHeight: '80vh' }} >
            {validate()}
            <Grid item xs={1} md={4}></Grid>
            <Grid item xs={10} md={4}>
                <Card className={classes.root}>
                    <Grid container spacing={3} alignItems="stretch" justifyContent="center" direction="column">
                        <Grid item xs={12}><Typography variant="h4" align="center">Sign In</Typography></Grid>
                        <Grid item xs={12}><Divider/></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Username" placeholder="email@mail.com" error={emailValidation.length == 0 ? false : true} helperText={emailValidation} onChange={handleEmail} onBlur={handleEmailBlur}/></Grid>
                        <Grid item xs={12}><TextField fullWidth label="Password" placeholder="At least 8 characters long." type="password" autoComplete="current-password" onChange={handlePassword} error={passValidation.length == 0 ? false : true} helperText={passValidation} onBlur={handlePassBlur}/></Grid>
                        <Grid item xs={12}>{AlertMessage()}</Grid>
                        <Grid item xs={12}><Button fullWidth variant="contained" color="primary" onClick={loginUser}>Log In</Button></Grid>
                        <Grid item xs={12}><Button fullWidth variant="contained" color="primary" onClick={newUser}>Register</Button></Grid>
                    </Grid>
                </Card>
            </Grid>
            <Grid item xs={1} md={4}></Grid>
        </Grid>
    );
}
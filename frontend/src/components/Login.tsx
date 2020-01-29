import React from 'react';
import {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';


type props = {
}

type state = {    
}


const useStyles = makeStyles(theme => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: 200,
      },
    },
  }));

export default class Login extends Component{
    

    render(){
        return(
            <div>
                 <form className={useStyles().root} noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Usuario" />
                    <Button variant="contained" color="primary">
                        Ingresar
                    </Button>
                </form>
            </div>            
        );
    }
}
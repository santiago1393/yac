import React from 'react';
import { Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {try_login, try_signup, } from "./redux/actions/actions-login";
import { loadMessages } from "./redux/actions/actions-chat";
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';

type props = {  
  validate_user: (nickname) => void,
  register_user: (nickname) => void,
  loadMessages: () => void,
  isLogged: boolean,
  login_fail: boolean,
  sign_success: boolean,
  messages: {},
};
type state = {  
  nickname: string,
  new_message: string
};

class App extends Component<props, state>{

  private socket: any;

  constructor(props:props){
    super(props);
    this.state = {     
      nickname: '',
      new_message: '',
    }
    this.validate_user = this.validate_user.bind(this);
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangeMss = this.onChangeMss.bind(this);
    this.sendMss = this.sendMss.bind(this);
    this.socket_con = this.socket_con.bind(this);
  }

  onChangeMss(e:any){
    e.persist();
    this.setState(({new_message}) => {
      new_message = e.target.value;
      return {new_message};
    });
  }

  sendMss(){
    this.socket.emit('MESSAGE_SENDED', {user: this.state.nickname, message_text: this.state.new_message});
  }

  socket_con(){
    try {
      this.socket = SocketIOClient('https://melt-chat-backend.herokuapp.com',  {transports: ['websocket'], upgrade: false});      
      this.socket.emit('USER_ADDED', this.state.nickname);     
      this.socket.on('NEW_MESSAGE', data => {
        alert(`New msss ${data.message_text}`);
      });
    } catch (error) {
      console.log(error);
    }
  }

  validate_user(){  
    this.props.validate_user(this.state.nickname);
  }

  componentWillReceiveProps(nextProps:props){
    if(this.props.isLogged !== nextProps.isLogged){
      if(nextProps.isLogged === true){
        alert('Usuario logeado correctamente');
        this.props.loadMessages();
        this.socket_con();
      }
    }
    if(this.props.login_fail !== nextProps.login_fail){
      if(nextProps.login_fail === true){
        alert("Error, usuario invalido");
        const register = window.confirm("¿Desear Registrarte?");
        if(register){
          this.props.register_user(this.state.nickname);
        }
      }
    }
    if(this.props.sign_success !== nextProps.sign_success){
      if(nextProps.sign_success){
        alert("Registrado con exito");
      }
    }
  }

  onChangeUser(e:any){
    e.persist();
    this.setState(({nickname}) => {
      nickname = e.target.value;
      return {nickname};
    });
  }

  render(){
    if(this.props.isLogged){
      return(
        <div>
          <div>
            <h3>Mensajes</h3>
            {
              (this.props.messages === {} || this.props.messages === []) ? (
                <h4> No hay mensajes nuevos </h4>
              ) : (
                JSON.stringify(this.props.messages)
              )
            }
          </div>          
          <div>
            <h3>Nuevo</h3>
            <TextField value={this.state.new_message} onChange={(e) => this.onChangeMss(e)} id="standard-basic" label="Usuario" />
            <Button onClick={this.sendMss} variant="contained" color="primary">
              Enviar
            </Button>
          </div>
        </div>
      );
    }else{
      return(
        <div style={{alignContent: "center", alignItems: "center"}}>
          <h1>Melt Chat</h1>
          <TextField value={this.state.nickname} onChange={(e) => this.onChangeUser(e)} id="standard-basic" label="Usuario" />
          <Button onClick={this.validate_user} variant="contained" color="primary">
            Ingresar
          </Button>
        </div>
      );      
    }     
  }
}
  

const mapStateToProps = (state) => {
  return {
    isLogged: state.login.isLogged,    
    login_fail: state.login.login_fail,
    sign_success: state.login.sign_success,
    messages: state.chat.messages,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
      validate_user: (nickname) => dispatch(try_login(nickname)),
      register_user: (nickname) => dispatch(try_signup(nickname)),
      loadMessages: () => dispatch(loadMessages()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);



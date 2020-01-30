import React from 'react';
import { Component} from 'react';
import './App.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {try_login, try_signup, } from "./redux/actions/actions-login";
import { loadMessages } from "./redux/actions/actions-chat";
import { connect } from 'react-redux';
import SocketIOClient from 'socket.io-client/dist/socket.io.js';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from "axios";

type props = {  
  validate_user: (nickname) => void,
  register_user: (nickname) => void,
  loadMessages: () => void,
  isLogged: boolean,
  login_fail: boolean,
  sign_success: boolean,
  messages: [{user:string, message:string, date: Date}],
};
type state = {  
  nickname: string,
  new_message: string
};

type props_video = {
  video: string
}

type state_video = {
  url: string
}

class EmbedVideo extends Component<props_video, state_video>{
  constructor(props:props_video){
    super(props);
    this.state = {
      url: ''
    }
  }

  componentDidMount(){    
      axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${this.props.video}&maxResults=1&type=video&key=AIzaSyAthmy15RLCKmT6dWoy9VXVldL3udGIgEo`).then((result)=> {
        if (result.status === 200) {                      
            let res = result.data;       
            console.log(res);                            
            this.setState(({url}) => {
              url = res.items[0].id.videoId;              
              console.log(url);              
              return {url};
            });
          }
        }).catch(err => {
          console.log(err);          
        });      
  }

  render(){
    if(this.state.url === ''){
      return(
        <div>
          loading video
        </div>
      );
    }else{
      return(      
        <div>
          <iframe
            src={`https://www.youtube.com/embed/${this.state.url}`}
            frameBorder="1"
            allow="autoplay; encrypted-media"
            allowFullScreen
            title="video"
            width="100%"
        ></iframe>
        </div>
      );
    }
    }
}

class App extends Component<props, state>{

  private socket: any;  
  private inputRef:any;

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
    this.inputRef = React.createRef();
  }

  onChangeMss(e:any){
    e.persist();
    this.setState(({new_message}) => {
      new_message = e.target.value;
      return {new_message};
    });
  }

  sendMss(){
    if(this.state.new_message !== ''){
      const mss = this.state.new_message;
      this.socket.emit('MESSAGE_SENDED', {user: this.state.nickname, message_text: mss});
      this.setState(({new_message}) => {
        new_message = '';
        return {new_message};
      });
    }else{      
      this.inputRef.current.focus();
    }
  }

  socket_con(){
    try {
      this.socket = SocketIOClient('https://melt-chat-backend.herokuapp.com',  {transports: ['websocket'], upgrade: false});      
      this.socket.emit('USER_ADDED', this.state.nickname);     
      this.socket.on('NEW_MESSAGE', data => {        
        this.props.loadMessages();
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
        this.props.loadMessages();
        this.socket_con();
      }else{
        alert("Usuario invalido");        
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
        <Grid container spacing={3}>
           <Grid item xs={6}>
            <h3>Mensajes anteriores</h3>
            {
              (this.props.messages.length < 1) ? (
                <h4> No hay mensajes nuevos </h4>
              ) : (
                <List component="nav" aria-label="mensajes">
                  {
                  this.props.messages.sort((a, b) => {
                    return (a.date < b.date) ?  1 : -1;
                  }).map((val, index) => {
                    if(val !== null){
                      const date = new Date(val.date).toLocaleString();
                      if(val.message.startsWith('/youtube ') === true){
                        const search = val.message.slice(10);                                                
                        return(
                          <ListItem divider key={index}>
                            <ListItemText primary={val.message} secondary={`${val.user} at: ${date}`}/>
                            <EmbedVideo video={search}/>
                          </ListItem>
                        );
                      }else{
                        return(
                          <ListItem divider key={index}>
                            <ListItemText primary={val.message} secondary={`${val.user} at: ${date}`}/>
                          </ListItem>
                        );
                      }
                    }else{
                      return null;
                    }
                  })
                  }
                </List>                
              )
            }
          </Grid>          
          <Grid item xs={6}>
            <h3>Nuevo Mensaje</h3>
            <TextField inputRef={this.inputRef} value={this.state.new_message} onChange={(e) => this.onChangeMss(e)} id="standard-basic" label="Hola.." />
            <Button onClick={this.sendMss} variant="contained" color="primary">
              Enviar
            </Button>
          </Grid>
        </Grid>
      );
    }else{
      return(
        <Container fixed maxWidth="md">
          <h1>Melt Chat</h1>
          <TextField value={this.state.nickname} onChange={(e) => this.onChangeUser(e)} id="standard-basic" label="Usuario" />
          <Button onClick={this.validate_user} variant="contained" color="primary">
            Ingresar
          </Button>
        </Container>
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



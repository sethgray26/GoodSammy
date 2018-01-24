// requires as props: clientID, creatorID, helperID, requestID
// props userID, creatorID, helperID, requestID

import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import axios from 'axios';
import StayScrolled from 'react-stay-scrolled' ;
import Message from './Message';

// Material-UI //
import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';

const socketUrl = 'http://192.168.0.126:3005'; // server URL
const socket = io(socketUrl);

export default class Chat extends Component {    
    constructor(props) {
        super(props);
        this.state = {
            messageInput: "",
            socket: io('http://192.168.0.126:3005'),
            response: [],
            socketID: null,
            creatorID: 4,
            helperID: 2,
            userID: 2, // this will /later/ come from props props.userData.username
            requestID: 24, // this will come from props
            conversationID: null,
            requestDescription: null,
            username: {creator: null, helper: null}
        }
        
        socket.on('convo messages', response => { // messages for this conversation
            this.setState({ response })
        })
    }

    componentWillMount() {
        socket.emit('chat mounted');
        
        socket.on('socket id', id=>{
            console.log('Connected.\nSocket ID: ', id)
            const {socketID, userID, requestID, creatorID, helperID } = this.state
            axios.post('http://localhost:3005/chat/socketID', 
                {socketID: id, userID, requestID, creatorID, helperID})
                .then(res=>{
                    const conversationID = res.data.id
                    const requestDescription = res.data.description
                    this.setState({conversationID, requestDescription, socketID: id})
                    socket.emit('get messages', conversationID)
                })
            })
        // get usernames to display under messages
        const { creatorID, helperID } = this.state;
        axios.post('http://localhost:3005/chat/usernames', {creatorID, helperID})
            .then(res=>{
                this.setState({
                    username: {creator: res.data.sendMe.creator, helper: res.data.sendMe.helper}
                })
            })
    }
   
    getDateString = function(){
        let d = new Date()
        let hours = '0'+d.getHours()
        hours = hours.substring(hours.length -2)
        let minutes = '0'+d.getMinutes()
        minutes = minutes.substring(minutes.length -2)
        let seconds = '0'+d.getSeconds()
        seconds = seconds.substring(seconds.length -2)
        let timestamp = ''
        timestamp = hours + ':' + minutes + ':' + seconds
        return timestamp
    }

    handleChange = (e) => {
        this.setState({ messageInput: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { conversationID, messageInput, userID } = this.state;
        const timestamp = this.getDateString();

        socket.emit('emit message', {conversationID, messageInput, userID, timestamp});

        this.setState({ messageInput: '' })
    }

    render() {
        
        const { messageInput, socket, requestDescription, userID, username, helperID } = this.state;
        return (
            <div className="chat-container" style={{ padding: "8px" }}>
                
                <Paper zDepth={1} style={{ padding: "20px" }}>
                <h3>Regarding Request: {requestDescription}</h3>
                <h3>coversationID: {this.state.conversationID}</h3>

                    <StayScrolled component="div" style={{height:"40vh", overflowWrap:"break-word",
                        overflowY:"scroll", overflowX:"hidden"}}>
                        {
                            this.state.response.map((message, index)=>(
                                <div key={index} style={message.user_id === userID ? {textAlign:"right"} : {textAlign:"left"}} >
                                    <Message text={message.body}/>
                                    <div style={{ color: "gray", fontSize: ".8em" }}>
                                        {message.user_id === helperID ? username.helper : username.creator} | {message.time_stamp}
                                    </div> 
                                </div>
                            ))
                        }
                    </StayScrolled>

                    <div className="message-input">
                        <form onSubmit={this.handleSubmit} className="login-form" >
                            <label htmlFor="message">
                                <TextField
                                    multiLine={false}
                                    fullWidth={true}
                                    ref={(input) => { this.textInput = input }}
                                    type="text"
                                    id="message-input"
                                    value={messageInput}
                                    onChange={this.handleChange}
                                    placeholder={"your message here"}
                                />

                            </label>
                        </form>
                    </div>
                </Paper>
            </div>
        )
    }
}
Chat.propTypes = {
    userID: PropTypes.number,
    requestID: PropTypes.number,
    creatorID: PropTypes.number,
    helperID: PropTypes.number
}
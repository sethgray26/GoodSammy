// TAKES USER ID AS PROP this.props.userID
// TAKES REQUEST ID AS PROP this.props.requestID


import React, { Component } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import axios from 'axios';
import StayScrolled from 'react-stay-scrolled';
import Message from './Message';

import Divider from 'material-ui/Divider';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';


const socketUrl = 'http://192.168.0.126:3005';
const socket = io(socketUrl);




export default class Chat extends Component {
    // pass in message array through props
    constructor(props) {
        super(props);

        this.state = {
            messageInput: "",
            socket: null,
            response: [],
            socketID: null,
            userID: 3, // this will /later/ come from props from redux user object.
            requestID: 22, // this will come from props
            conversationID: null
        }
        socket.on('convo messages', response => {
            console.log(response)
            this.setState({ response: response })
        })
        
    }

    componentWillMount() {
        // const {requestId, requesterId, helperId} = this.props
        socket.on('socket id', id=>{
            console.log('socket id: ', id)
            this.setState({socketID: id})
            axios.post('http://localhost:3005/chat/socketID', 
                {socketID: id, userID: this.state.userID, requestID: this.state.requestID})
                .then(res=>{
                    const conversationID = res.data
                    this.setState({conversationID})
                    socket.emit('get messages', conversationID)
                })
            //update socket id on user db table. 
            //create conversation


            /// TODO get messages of proper conversation . . . store messages to proper conversaion


        })
        
        
        // alert('conversationid, socketid: ', this.state.conversationID, ' ', this.state.socketID)
        // axios.post('http://localhost:3005/newchat', { requestId: 1, requesterId: 1, helperId: 2 }) // passed in through props
    }

    handleChange = (e) => {
        this.setState({ messageInput: e.target.value })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {conversationID, messageInput} = this.state;
        console.log( 'cid, mid: ',conversationID, ' ', messageInput)
        socket.emit('emit message', {conversationID, messageInput});

        this.setState({ messageInput: '' })

    }
    render() {
        
        const { messageInput, socket } = this.state;
        console.log('response: ', this.state.response)
        return (
            <div className="chat-container" style={{ margin: "4vw", padding: "8px" }}>
                
                <Paper zDepth={2} style={{ padding: "20px" }}>
                <h3>Regarding Request: Help with Car</h3>
                <h3>coversationID: {this.state.conversationID}</h3>

                    <StayScrolled component="div" style={{height:"40vh", overflowWrap:"break-word",
                        overflowY:"scroll", overflowX:"hidden", textAlign:"right"}}>
                        {
                        
                        this.state.response.map((item, index)=>(
                            <div key={index}>
                            <div style={{ color: "gray", fontSize: ".8em" }}>user 1 | timestamp</div>
                            <Message text={item.body}/>
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
    requestID: PropTypes.number
}
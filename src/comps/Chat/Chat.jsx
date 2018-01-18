import React, { Component } from 'react';
import io from 'socket.io-client';
const socketUrl = 'http://192.168.0.126:3005';
const socket = io(socketUrl);
export default class Chat extends Component{
    // pass in message array through props
    constructor(props){
        super(props);

        this.state={
            messageInput:"",
            socket:null,
            response:[]
        }
        socket.on('generate response', response=>{
            console.log(response)
            this.setState({response: response})
        
        })       
    }
    componentWillMount(){
        socket.emit('emit message', null);
    }
    
    handleChange = (e)=>{
        this.setState({messageInput: e.target.value})
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        socket.emit('emit message', this.state.messageInput);
        
        this.setState({messageInput:''})
        
    }
    render(){
        const { messageInput, socket } = this.state;
        return(
            <div className="chat-container">
                <div className="message-box">
                {/* main window in which messages are displayed */}

                </div>
                <div className="message-input">
                <form onSubmit={this.handleSubmit} className="login-form" >
                    <label htmlFor="nickname">
                        <h2>Got a nickname?</h2>
                        <input
                            ref={(input) => { this.textInput = input }}
                            type="text"
                            id="nickname"
                            value={messageInput}
                            onChange={this.handleChange}
                            placeholder={"mycool username"}

                        />
                        
                    </label>
                </form>
            </div>
            {this.state.response.map((item, index)=>(
                <div key={index}>{item.body}</div>
            ))}
            
            </div>
        )
    }
}
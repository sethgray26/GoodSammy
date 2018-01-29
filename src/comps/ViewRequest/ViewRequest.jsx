import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton  from 'material-ui/RaisedButton';  
import TextField from 'material-ui/TextField';
import { lightGreen300 } from 'material-ui/styles/colors';
import {lightGreen500} from 'material-ui/styles/colors';  
import {Link} from 'react-router-dom';  

import './ViewRequest.css'
import { white } from 'material-ui/styles/colors';


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: null,
                disable: true,
                clientID: null
            }
            
    }
    enableStatus = () => {
        this.setState({
            disable: !this.state.disable
        })
    }
    saveChanges = () => {
        let updates = {
            description: this.refs.description.value,
            request_id: this.state.request.id
        }
        // console.log(updates);
        
        axios.put('/update', updates)
    }
    saveAndDisable = () => {
        this.saveChanges()
        this.enableStatus()
    }

    handleCommit = () =>{

        let sammy = {
            help_id: this.state.clientID,
            request_id: this.state.request.id
        }
        axios.put('/commit', sammy)
        
        this.setState({
            request: Object.assign({}, this.state.request, {help_id: this.state.clientID})
        })        
    }

    removeHelper = () => {
        let removed = {
            request_id: this.state.request.id
        }
        axios.put('/removeHelp', removed)
    }

    deleteRequest = () => {
        
        axios.delete(`/delete/+${this.props.match.params.id}`)
    }

    componentDidMount(){
        axios.get('auth/me').then((res)=>{ // get clientID from session
            this.setState({clientID: res.data.user})
        })
        axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
            this.setState({
                request: res.data[0]
            })            
        })
    }
    render() {
        return this.state.request ?
        (
            <div>
                <button onClick={()=>this.props.history.push('/reqlist')}>back</button>
                <p>clientID from state:{this.state.clientID}</p>
                {this.state.request.user_id === this.state.clientID ?

                    <div className="view_wrapper">
                        {/* own view */}
                        <div className="map_wrapper">
                            <Map  
                                lat={+this.state.request.lat} 
                                lng ={+this.state.request.long}
                            />
                        </div>
                        
                        <div className="text_wrapper">
                            <textarea className="text_area"
                                name="" 
                                id="" 
                                cols="30" 
                                rows="10" 
                                disabled={this.state.disable} 
                                ref='description' 
                                defaultValue={this.state.request.description}>
                            </textarea>
                        </div>
                        
                        <div className="text_button_wrapper">
                            <RaisedButton 
                                label ='Edit Information' 
                                onClick={this.enableStatus} 
                                primary = {true} 
                            />
                            <RaisedButton 
                            label ='Save!' 
                            disabled={this.state.disable} 
                            onClick={this.saveAndDisable} 
                            secondary={true} 
                            style={{marginLeft: 13}}
                            />
                        </div>

                        {this.state.request.help_id &&
                        <div className="chat_wrapper">
                            <Chat 
                                userID={this.state.clientID} 
                                creatorID={this.state.request.user_id} 
                                helperID={this.state.request.help_id} 
                                requestID={this.state.request.id}
                            />
                        </div>}
                        
                        <div className="close_wrapper">
                            <RaisedButton 
                                label='Close Request'
                                labelColor={white}
                                backgroundColor={ lightGreen300 }
                                style ={{ width:150 }}
                                onClick={this.deleteRequest}
                            />
                        </div>
                        
                    </div>
                :

                    <div className="view_wrapper">
                        {/* other view */}
                        <div className="map_wrapper">
                            <Map  
                                lat={+this.state.request.lat} 
                                lng ={+this.state.request.long}
                            />
                        </div>
                        
                        <div className="desc_wrapper">
                            <span>{this.state.request.description}</span>
                        </div>

                        {/* if someone is already helping */}

                        {this.state.request.help_id !== this.state.clientID || this.state.request.help_id === null ?
                        
                            <div className="commit_button_wrapper">
                                <RaisedButton 
                                    label='Commit to help' 
                                    onClick ={this.handleCommit} 
                                    backgroundColor={ lightGreen300 } 
                                />
                            </div>
                            
                    
                        :

                        <div>
                             {this.state.request.help_id &&   
                            <div className="chat_wrapper">
                                <Chat 
                                    userID={this.state.clientID} 
                                    creatorID={this.state.request.user_id} 
                                    helperID={this.state.request.help_id} 
                                    requestID={this.state.request.id}
                                />

                            </div>}

                            
                                <Link to ='/reqList'>
                                    <RaisedButton 
                                        label = 'Stop helping' 
                                        style={{ marginBottom: 15 }}
                                        primary={true}
                                        onClick={this.removeHelper}
                                    />
                                </Link>
                            

                        </div>
                    }

                        <Link to='/reqList'>
                            <RaisedButton 
                                label ='Return to List' 
                                backgroundColor={ lightGreen500 }
                            />
                        </Link>

                    </div>
            }
            </div>
        )
                    // this.state.request
                :
             (
                <div>
                    <br/><br/><br/> {/*  display loading circle until have request ARR */}
                    <CircularProgress size={80} thickness={5}/>
                </div>
            )        
    }
}


export default ViewRequest;

import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'

import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton  from 'material-ui/RaisedButton';  
import FlatButton from 'material-ui/FlatButton';  
import TextField from 'material-ui/TextField';
import { lightGreen300 } from 'material-ui/styles/colors';
import {lightGreen500} from 'material-ui/styles/colors';  
import {Link} from 'react-router-dom';  
import Dialog from 'material-ui/Dialog'; 

import './ViewRequest.css'
import { white } from 'material-ui/styles/colors';


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: null,
                disable: true,
                open: false,
                clientID: null,
                urlParam: null
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

    handleAmerica = () => {
        this.setState({
            open: !this.state.open
        })
    }

    async componentDidMount(){
        await axios.get('auth/me').then((res)=>{ // get clientID from session
            this.setState({clientID: res.data.user})
        })
        await axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
            let urlParam=null;
            if(this.state.clientID==res.data[0].user_id || this.state.clientID==res.data[0].help_id) {
                urlParam = 'assigned'
            } else {
                urlParam = 'unassigned'
            }
            this.setState({
                request: res.data[0],
                urlParam: urlParam
            })            
        })
        
    }
    render() {
        const actions = [
            <FlatButton 
            label = "Cancel"
            primary={true}
            keyboardFocused={true}
            onClick = {this.handleAmerica}
            />,
            <Link to ='/Home'>
                <FlatButton 
                label = "Delete"
                primary={true}
                onClick={this.deleteRequest}
                />
            </Link>
        ]

        return this.state.request  ?
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
                                onClick={this.handleAmerica}
                            />
                            <Link to={`/reqlist/${this.state.urlParam}`}>
                            <RaisedButton 
                                label ={`Return to List`} 
                                backgroundColor={ lightGreen500 }
                            />
                            </Link>
                            <div>
                                <Dialog
                                    title = "Are you sure want to close this request?"
                                    actions = {actions}
                                    modal={false}
                                    open={this.state.open}
                                    onRequestClose={this.handleAmerica}
                                >
                                    Click on the "Delete" button if you no longer need help 
                                </Dialog>
                            </div>
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

                        <Link to={`/reqlist/${this.state.urlParam}`}>
                            <RaisedButton 
                                label ={`Return to List`} 
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
                   <br/><br/><br/> <CircularProgress size={80} thickness={5} />
                </div>
            )        
    }
}


export default ViewRequest;

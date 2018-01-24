import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'

import RaisedButton  from 'material-ui/RaisedButton';  
import { lightGreen300 } from 'material-ui/styles/colors';
// import {Link} from 'react-router-dom';  

import './ViewRequest.css'
import { white } from 'material-ui/styles/colors';


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: [],
                disable: true
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
            request_id: this.state.request[0].id
        }
        // console.log(updates);
        
        axios.put('/update', updates)
    }
    saveAndDisable = () => {
        this.saveChanges()
        this.enableStatus()
    }
    componentDidMount(){
        
        axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
            this.setState({
                request: res.data
            })
            
        })
    }

    render() {
        console.log('this.props: ',this.props)
        return this.state.request[0] ?
        (
            <div>
                {/* false ternary placeholder, Redux to be implented */}
                {this.state.request.user_id === this.state.help_id ?
                <div className="view_wrapper">
                    {/* own view */}

                    <div className="map_wrapper">
                        <Map  
                            lat={+this.state.request[0].lat} 
                            lng ={+this.state.request[0].long}
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
                            defaultValue={this.state.request[0].description}>
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
                    
                    <div className="chat_wrapper">
                        <Chat/>
                    </div>
                    

                    <div className="close_wrapper">
                        <RaisedButton 
                            label='Close Request'
                            labelColor={white}
                            backgroundColor={ lightGreen300 }
                            style ={{ width:150 }}
                        />
                    </div>
                    

                </div>
                :
                <div className="view_wrapper">
                    {/* other view */}

                    <div className="map_wrapper">
                        <Map  
                            lat={+this.state.request[0].lat} 
                            lng ={+this.state.request[0].long}
                        />
                    </div>

                    <div className="desc_wrapper">
                        <span>{this.state.request[0].description}</span>
                    </div>

                    <div className="commit_button_wrapper">
                        <RaisedButton 
                            label='Commit to help'
                            backgroundColor={ lightGreen300 }
                        />
                    </div>

                    <div className="chat_wrapper">
                        <Chat/>
                    </div>
                </div>
            }
            </div>
        )
        :
             (
                <div>Uh oh! Looks like something went wrong!</div>
                // <Link to='/'>Home</Link>
            )
        
    }
}
function mapStateToProps(state){
    return state
}

export default connect(mapStateToProps)(ViewRequest);
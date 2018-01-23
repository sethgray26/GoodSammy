import React, { Component } from 'react';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'

import RaisedButton  from 'material-ui/RaisedButton';  
import { RadioButton } from 'material-ui';
import { lightGreen500, lightGreen400, lightGreen300, blue500, lightBlue500 } from 'material-ui/styles/colors';
// import {Link} from 'react-router-dom';  

import './ViewRequest.css'


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
            category: this.refs.category.value,
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
                        style={{marginLeft: 13}}
                        label ='Save!' 
                        disabled={this.state.disable} 
                        onClick={this.saveAndDisable} 
                        secondary={true} 
                        />

                    </div>
                    
                    <div className="chat_wrapper">
                        <Chat/>
                    </div>
                    

                    <RaisedButton 
                        label='Close Request'
                        backgroundColor={ lightGreen300 }
                    />

                </div>
                :
                <div>
                    {/* other view */}
                    <Map/>
                    <span>request.description</span>
                    <RaisedButton label='Commit to help'/>
                    <Chat/> 
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

export default ViewRequest;
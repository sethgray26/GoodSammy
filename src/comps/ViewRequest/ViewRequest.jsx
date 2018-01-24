import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'
import RaisedButton  from 'material-ui/RaisedButton';  
import { RadioButton } from 'material-ui';
import {Link} from 'react-router-dom';  


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: [],
                disable: true,
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
            request_id: this.state.request.id
        }
        axios.put('/update', updates)
    }
    saveAndDisable = () => {
        this.saveChanges()
        this.enableStatus()
    }

    handleCommit = () =>{
        console.log('ClientId ist',this.props.clientID)

        let sammy = {
            help_id: this.props.clientID,
            request_id: this.state.request.id
        }
        axios.put('/commit', sammy)
        
        this.setState({
            request: Object.assign({}, this.state.request, {help_id: this.props.clientID})
        })
        
    }

    removeHelper = () => {
        let removed = {
            request_id: this.state.request.id
        }
        axios.put('/removeHelp', removed)
    }


    componentDidMount(){
        
        axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
            this.setState({
                request: res.data[0]
            })
            console.log(res.data[0]);
            
        })
    }

    render() {
            
        return this.state.request ?
        (
            <div>
                {/* false ternary placeholder: If user id matches who is signed in */}
                {this.state.request.user_id === this.props.clientID ?
                <div>
                    {/* own view */}
                    <Map lat={+this.state.request.lat} lng ={+this.state.request.long}/>
                    <RaisedButton label ='Edit Information' onClick={this.enableStatus} primary = {true} />
                    <textarea name="" id="" cols="30" rows="10" disabled={this.state.disable} ref='description' defaultValue={this.state.request.description}></textarea>
                    <select name="" id="" disabled={this.state.disable} ref='category'>
                        <option value="1">Automotive</option>
                    </select>
                    <RaisedButton label ='Save!' onClick={this.saveAndDisable} secondary={true} />
                    <Chat userID={this.props.clientID} creatorID={this.state.request.user_id} 
                    helperID={this.state.request.help_id} requestID={this.state.request.id}/> 
                    <RaisedButton label='Close Request'/>

                </div>
                :
                <div>
                    {/* other view */}
                    <Map lat={+this.state.request.lat} lng={+this.state.request.long}/>
                    <br/>
                    <p>{this.state.request.description}</p>
                    <br/>
                    {/* If someone is already helping */}
                    {this.state.request.help_id === null ?
                    <RaisedButton label='Commit to help' onClick ={this.handleCommit} primary ={true} />
                    :
                    <div>
                        <Chat userID={this.props.clientID} creatorID={this.state.request.user_id} 
                        helperID={this.state.request.help_id} requestID={this.state.request.id}/>
                        <Link to ='/reqList'><RaisedButton label = 'Cancel' onClick={this.removeHelper}/></Link>
                    </div>
                    
                }
                <Link to='/reqList'><RaisedButton label ='Return to List' secondary={true} /></Link>
                </div>
            }
            </div>
        )
        :
             (
                <div>Uh oh! Looks like something went wrong!  
                     <Link to='/'><RaisedButton label ='Home Page' primary ={true}/></Link>
                </div>
            )
        
    }
}
function mapStateToProps(state){
    return {
        clientID : state.users.userID
    }
}

export default connect(mapStateToProps)(ViewRequest);
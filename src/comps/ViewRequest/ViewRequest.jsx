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
            request_id: this.state.request[0].id
        }
        axios.put('/update', updates)
    }
    saveAndDisable = () => {
        this.saveChanges()
        this.enableStatus()
    }

    handleCommit = () =>{
        let sammy = {
            help_id: '',
            request_id: this.state.request[0].id
        }
        axios.put('/commit', sammy)
        // this.setState({
        //     request: this.state.request[0]
        // })
        // console.log(this.state.request);
        
    }

    removeHelper = () => {
        let removed = {
            request_id: this.state.request[0].id
        }
        axios.put('/removeHelp', removed)
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
                {/* false ternary placeholder: If user id matches who is signed in */}
                {this.state.request.user_id !== this.state.help_id ?
                <div>
                    {/* own view */}
                    <Map lat={+this.state.request[0].lat} lng ={+this.state.request[0].long}/>
                    <RaisedButton label ='Edit Information' onClick={this.enableStatus} primary = {true} />
                    <textarea name="" id="" cols="30" rows="10" disabled={this.state.disable} ref='description' defaultValue={this.state.request[0].description}></textarea>
                    <select name="" id="" disabled={this.state.disable} ref='category'>
                        <option value="1">Automotive</option>
                    </select>
                    <RaisedButton label ='Save!' disabled={this.state.disable} onClick={this.saveAndDisable} secondary={true} />
                    <Chat/>
                    <RaisedButton label='Close Request'/>

                </div>
                :
                <div>
                    {/* other view */}
                    <Map lat={+this.state.request[0].lat} lng={+this.state.request[0].long}/>
                    <br/>
                    <p>{this.state.request[0].description}</p>
                    <br/>
                    {/* If someone is already helping */}
                    {this.state.request[0].help_id === null ?
                    <RaisedButton label='Commit to help' onClick ={this.handleCommit} primary ={true} />
                    :
                    <div>
                        <Chat/>
                        <Link to ='/reqList'><RaisedButton label = 'quit' onClick={this.removeHelper}/></Link>
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
    return state
}

export default connect(mapStateToProps)(ViewRequest);
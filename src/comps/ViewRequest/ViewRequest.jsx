import React, { Component } from 'react';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'
import RaisedButton  from 'material-ui/RaisedButton';  
import { RadioButton } from 'material-ui';


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
                <div>
                    {/* own view */}
                    <Map/>
                    <RaisedButton label ='Edit Information' onClick={this.enableStatus} primary = {true} />
                    <textarea name="" id="" cols="30" rows="10" disabled={this.state.disable} ref='description' defaultValue={this.state.request[0].description}></textarea>
                    <select name="" id="" disabled={this.state.disable} ref='category'>
                        <option value="1">Automotive</option>
                    </select>
                    <RaisedButton label ='Save!' onClick={this.saveAndDisable} secondary={true} />
                    <Chat/>


                </div>
                :
                <div>
                    {/* other view */}
                    <Map/>
                    <span>request.description</span>
                    <Chat/> 
                </div>
            }
            </div>
        )
        :
             (
                <div>Something went terribly wrong...</div>
            )
        
    }
}

export default ViewRequest;
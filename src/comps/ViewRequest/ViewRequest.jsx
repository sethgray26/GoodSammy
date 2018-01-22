import React, { Component } from 'react';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'
import RaisedButton  from 'material-ui/RaisedButton';  


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: []
            }
            
    }

    componentDidMount(){
        
        axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
            // console.log(res)
            this.setState({
                request: res.data
            })
            let userId = this.state.user_id
            console.log(this.state.request[0]);
            
        })
    }

    render() {
        console.log(this.state.request);
        
        return (
            <div>
                {/* false ternary placeholder, Redux to be implented */}
                {this.state.request.user_id === this.state.help_id ?
                <div>
                    {/* own view */}
                    <Map/>
                    <RaisedButton label ='Edit Description'/>
                    
                    <span>{this.state.request.description}</span>
                    <RaisedButton label ='Edit Category'/>
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
        );
    }
}

export default ViewRequest;
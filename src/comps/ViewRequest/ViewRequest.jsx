import React, { Component } from 'react';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: {}
            }
    }

    componentDidMount(){
        axios.get('/request').then((res) => {
            console.log(res)
            this.setState({
                request: res.data
            })
            let userId = this.state.user_id
        })
    }

    render() {
        return (
            <div>
                {this.state.request.user_id === this.state.help_id ?
                <div>
                    {/* own view */}
                    <Map/>
                    <span>{this.request.description}</span>
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
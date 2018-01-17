import React, { Component } from 'react';
import Map from '../Map/Map';  
import axios from 'axios'


class RequestList extends Component {
    constructor(){
        super()
            this.state = {
                requestArr: [],
                distance: ''
            }
        
    }

    componentDidMount(){
        axios.get('/request').then((res) => {
            //test #2
            this.setState({
                requestArr: res.data
            })
        })

    }

    componentWillReceiveProps(){
        
    }
    
    render() {
        const request = this.state.requestArr.map(request => {
            return(
                <div>
                    Faye need a ride to Walgreens {this.state.distance} away! 
                    <button>View Details</button>
                    <button>I will help</button>
                </div>
            )
        })
        return (
            <div>
                <Map/>
                <section>People Need Help!</section>
                <section>{request}</section>
                
            </div>
        );
    }
}

export default RequestList;
import React, { Component } from 'react';
import Map from '../Map/Map';  
import RepeatedRequest from './../RepeatedList/repeatedList';  
import axios from 'axios'
import repeatedList from './../RepeatedList/repeatedList';

import blue_hand from './blueHand.png'


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
                <RepeatedRequest
                 key = {request.id}
                 description = {request.description}
                 category = {request.category}
                 distance = {this.state.distance}
                 username = {request.user_id}

                />
            )
        })
        return (
            <div>
                <div className="home_header">
                    <img src={blue_hand} alt='blue_hand'/>
                </div>

                <Map/>
                <section>People Need Help!</section>
                <br/>
                <section>{request}</section>
                
            </div>
        );
    }
}

export default RequestList;
import React, { Component } from 'react';
import Map from '../Map/Map';  
import RepeatedRequest from './../RepeatedList/repeatedList';  
import axios from 'axios'
import repeatedList from './../RepeatedList/repeatedList';


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
                    distance = {this.state.distance}
                    category = {request.category}
                    username = {request.user_id}
                    requestID = {request.id}
                />
            )
        })
        return (
            <div>
                <Map/>
                <strong>People Need help!</strong>

                <section>{request}</section>
                
            </div>
        );
    }
}

export default RequestList;
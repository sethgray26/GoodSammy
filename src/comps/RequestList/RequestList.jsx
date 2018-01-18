import React, { Component } from 'react';
import RepeatedRequest from './../RepeatedList/repeatedList';  
import repeatedList from './../RepeatedList/repeatedList';
import Map from './../Map/Map'
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
                <RepeatedRequest
                    key = {request.id}
                    description = {request.description}
                    distance = {this.state.distance}
                    category = {request.category}
                    username = {request.username}
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
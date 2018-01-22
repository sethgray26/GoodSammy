import React, { Component } from 'react';
import RepeatedRequest from './../RepeatedList/repeatedList';  
import repeatedList from './../RepeatedList/repeatedList';
import Map from './../Map/Map'
import './RequstList.css'
import axios from 'axios'


class RequestList extends Component {
    constructor(){
        super()
            this.state = {
                requestArr: [],
                distance: '', 
                long: '',
                lat: ''
            }
        
    }

    componentDidMount(){
        axios.get('/request').then((res) => {
            //test #2
            console.log(res.data, res.data.lat);
            
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
            <div className='body-content' >
                    {this.state.requestArr.length !== 0 ?
                    <div>
                    <strong>People Need help!</strong>
                    <section>{request}</section>
                    </div>
                    :
                    <div>Looks like no one needs help! </div>}
            </div>
        );
    }
}

export default RequestList;
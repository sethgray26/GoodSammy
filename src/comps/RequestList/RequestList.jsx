import React, { Component } from 'react';
import Map from '../Map/Map';
import RepeatedRequest from './../RepeatedList/repeatedList';
import { setLocationState } from '../../ducks/reducers/maps';
import { connect } from 'react-redux';
import axios from 'axios';

class RequestList extends Component {
    constructor() {
        super()
        this.state = {
            requestArr: []
        }

    }

    //Get the Geolocation of the user
    componentDidMount() {
        if (navigator.geolocation) {
            console.log('supported in browser')
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                this.props.setLocationState(lat, lng)
            })
        }
        else {
            console.log('not supported in browser')
        }
        axios.get('/request').then((res) => {
            this.setState({
                requestArr: res.data
            })
        })
    }

    componentWillReceiveProps(nextprops) {
        //Calc distance and push to requestArr
        const lat = nextprops.lat
        const lng = nextprops.lng
        this.distance(lat, lng)
        console.log('myLocation', lat, lng)
    }

    distance = (lat1, lon1) => {
        let arr = this.state.requestArr
        console.log('arr', arr)
        let newArr = []
        for (var i = 0; i < arr.length; i++) {
            console.log('req lat', arr[i].lat, 'req long',arr[i].long)
            console.log('user lat', lat1, 'user long',lon1)
            let type = 'imperial'
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=${type}&origins=${lat1},${lon1}&destinations=${arr[i].lat},${arr[i].long}&key=AIzaSyCIIg2weQK6p4wUTy6nXrCj4-hPGgA40xI`
            console.log(url)    
            // axios.get(url).then( res => {
            //     return console.log('res',res.data.rows[0].elements[0].distance.text)}) 
            newArr.push(axios.get(url))
        }
        console.log('array of promise:', newArr)
        Promise.all(newArr).then(res => {
            let requestArr = this.state.requestArr
            let newState = {}
            for (var j = 0; j < requestArr.length; j++) {
                requestArr[j].distance = res[j].data.rows[0].elements[0].distance.text
                console.log(`distance for index ${j}`,res[j].data.rows[0].elements[0].distance.text)
            }
            this.setState({requestArr})
        })

    }

    render() {
        const request = this.state.requestArr.map(request => {
            return (
                <RepeatedRequest
                    key = {request.id}
                    description = {request.description}
                    category = {request.category_name}
                    username = {request.username}
                    requestID = {request.id}
                    distance={request.distance}
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

function mapStateToProps(state) {
    return {
        lat: state.maps.lat,
        lng: state.maps.lng
    };
}

export default connect(mapStateToProps, { setLocationState })(RequestList)
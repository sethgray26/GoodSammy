import React, { Component } from 'react';
import Map from '../Map/Map';
import RepeatedRequest from './../RepeatedList/repeatedList';
import repeatedList from './../RepeatedList/repeatedList';
import { setLocationState } from '../../ducks/reducers/maps';
import { connect } from 'react-redux';
import axios from 'axios';

class RequestList extends Component {
    constructor() {
        super()
        this.state = {
            requestArr: [],
            distance: ''
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
            //test #2
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
    }

    distance = (lat1, lon1) => {
        let arr = this.state.requestArr
        console.log('arr', arr)
        for (var i = 0; i < arr.length; i++) {
            let type = 'imperial'
            const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=${type}&origins=${lat1},${lon1}&destinations=${arr[i].lat},${arr[i].long}&key=AIzaSyCIIg2weQK6p4wUTy6nXrCj4-hPGgA40xI`
            console.log(url)
            // axios({
            //     method: 'GET',
            //     url: url,
            //     headers: {
            //         'Access-Control-Allow-Origin': '*'
            //     }
            axios.get(url)
            .then(res => {
                console.log('res.data', res.data.rows[0].elements[0].distance.text)
                //set state
                //arr[i].distance = res.data.rows[0].elements[0].distance.text
            })
        }
        console.log('loop done:', arr)
    }

    render() {
        const request = this.state.requestArr.map(request => {
            return (
                <RepeatedRequest
                    key={request.id}
                    description={request.description}
                    category={request.category}
                    distance={this.state.distance}
                    username={request.user_id}
                />
            )
        })
        return (
            <div>
                <Map />
                <section>People Need Help!</section>
                <br />
                <section>{request}</section>

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
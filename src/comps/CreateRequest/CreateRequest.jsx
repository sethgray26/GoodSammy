import React, { Component } from 'react';
import './CreateRequest.css'
import axios from 'axios'
import { setLocationState } from '../../ducks/reducers/maps';
import { createRequest } from '../../ducks/reducers/request';
import { connect } from 'react-redux';
import Map from '../Map/Map';

class CreateRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            lng: props.lng,
            lat: props.lat,
        }
    }

     componentDidMount() {
        if (navigator.geolocation) {
            console.log('supported in browser')
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                this.props.setLocationState(lat,lng)
                //this.props.setLocation(2, lat, lng)
            })
        }
        else {
            console.log('not supported in browser')
        }
        console.log('state after comp mount',this.state)
    }

    componentWillReceiveProps(nextprops) {
        let newState = {}
        newState['lat'] = Number(nextprops.lat)
        newState['lng'] = Number(nextprops.lng)
        this.setState(newState)
      }

    requestCreator = () => {
        //Post request
        //User_id, cat_id, desc, long, lat

        let generated = {
            user_id:2,
            category_id: this.refs.category.value,
            decription: this.refs.description.value,
            lat: this.props.lat,
            lng: this.props.lng
        }
        console.log(generated)
        this.props.CreateRequest(generated)
    }

    render() {

        return (
            <div className='generate-request-body' >
                <br />
                <section  >
                    <strong>What do you need help with?</strong>
                    <div>Select a category:
                         <select name="Category selection" id="" ref='category' >
                            <option value="1" >Automotive</option>
                            <option value="2" >Life</option>
                            <option value="3">Spritual</option>
                            <option value="4">Money</option>
                            <option value="5">Moving</option>
                            <option value="6">Errands</option>
                            <option value="7">Love</option>
                            <option value="8">Coding</option>
                            <option value="9">Construction</option>
                            <option value="10">Baking</option>
                        </select>
                    </div>
                </section>
                <br />
                <section className='request-description'>
                    <span>Please tell Faye your a brief description of your woes</span>
                    <textarea
                        name="Request Description"
                        id="" cols="40" rows="10"
                        ref='description'
                        placeholder='I need help to change a tire!'
                    ></textarea>
                </section>
                <br />
                <div className="map">
                    <Map lat={this.state.lat} lng={this.state.lng}/>
                </div>
                <section className='buttons' >
                    <button className='Request-help-button' onClick={this.requestCreator} >Request Help</button>
                    <a href="http://google.com">
                        <button className='Cancel-request'>Cancel</button>
                    </a>
                </section>
                <section>
                    <input type="range" min='1' max='5' className='rating-slider' />
                </section>
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
  
export default connect(mapStateToProps, { setLocationState, createRequest })(CreateRequest)
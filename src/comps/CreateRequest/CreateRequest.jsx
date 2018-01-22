import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './CreateRequest.css'
import blue_hand from './blueHand.png'

import { setLocationState } from '../../ducks/reducers/maps';
import { createRequest } from '../../ducks/reducers/requests';
import { connect } from 'react-redux';

import{ SelectField, TextField, MenuItem, RaisedButton } from 'material-ui';
import { blue500, lightGreen500, red400 } from 'material-ui/styles/colors';


import Map from '../Map/Map';

class CreateRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            lng: props.lng,
            lat: props.lat,
            value: null,
            category: "",
            description: "",
            userData: undefined
        }

        this.handleChange = this.handleChange.bind(this)
        this.requestToState = this.requestToState.bind(this)
    }

    requestToState(e, index, value){
        if( e.target.id === 'category'){
            this.setState({
                category: value
            //   category: e.target.innerHTML
            })
          } else if ( e.target.id === 'description'){
            this.setState({
              description: e.target.value,
            //   value: value
            })
        }

        console.log("target", this.state.category )
    }


    handleChange(event, index, value){
        console.log("value", value)
        this.setState({ 
            category: value,
            value: value 
        })

    }

     componentDidMount() {
        if (navigator.geolocation) {
            // console.log('supported in browser')
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

        axios.get('/auth/me')
            .then( res => {
                this.setState({
                    userData: res.data.user
                })
                console.log("user",res.data.user)
            })
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
            console.log("value",this.state.description)
        let generated = {
            user_id:this.state.userData,
            category_id: this.state.category,
            description: this.state.description,
            lat: this.props.lat,
            long: this.props.lng
        }

        console.log("request",generated)
        this.props.createRequest(generated)
    }

    render() {

        return (
            <div className='create_req' >
                {/*<div className='create_req_header'>
                    <img src={blue_hand} alt='blue_hand'/>
                </div>*/}

                <div className='create_req_body'>
                    <h1>Good Sammy's here to help!</h1>

                    <div className='create_req_category'>
                        <SelectField
                            name="category"
                            id="category"
                            ref='category'
                            value={this.state.value}
                            onChange={this.handleChange}
                            onClick={this.requestToState}
                            style={{margin: 5}}
                            floatingLabelText="Select a Category"
                            floatingLabelStyle={{color: 'red', left: 10, color: blue500}}
                        >
                            <MenuItem key={1} value={1} primaryText="Automotive" />
                            <MenuItem key={2} value={2} primaryText="Spiritual" />
                            <MenuItem key={3} value={3} primaryText="Life" />
                            <MenuItem key={4} value={4} primaryText="Errends" />
                            <MenuItem key={5} value={5} primaryText="handyman" />

                        </SelectField>
                    </div>
                
                    <h2>How can a Good Sammy help you?</h2>

                    <div className='create_req_desc'>
                        <TextField
                            name="Request Description"
                            id="description"
                            ref='description'
                            multiLine={ true }
                            fullWidth={false}
                            style={{ margin: 10, marginTop: -10 }}
                            rows={ 8 }
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            // underlineStyle={styles.underlineStyle}
                            underlineFocusStyle={styles.underlineFocusStyle}
                            floatingLabelText="Give a brief Description"
                            onChange={this.requestToState}
                            value={this.state.description}
                        />
                    </div>

                </div>
                <br />
                <div className="map">
                    <Map lat={this.state.lat} lng={this.state.lng}/>
                </div>

                <div className='buttons'>
                    <RaisedButton label='Request Help' 
                        backgroundColor={ lightGreen500 } 
                        style={ styles.logandsign }
                        onClick={this.requestCreator}
                    />

                    <Link to='/Home'><RaisedButton label='Cancel' 
                        backgroundColor={ red400 } 
                        style={ styles.logandsign }
                        onClick={this.requestCreator}
                    /></Link>
                </div>
            </div>
        );
    }
}

const items = [
    <MenuItem key={1} value="1" primaryText="Automotive" />,
    <MenuItem key={2} value={2} primaryText="Spiritual" />,
    <MenuItem key={3} value={3} primaryText="Life" />,
    <MenuItem key={4} value={4} primaryText="Errends" />,
    <MenuItem key={5} value={5} primaryText="handyman" />,
  ];

  const styles = {
    needHelp: {
        margin: 12,
        marginTop: 30,
        height: 150,
        width: 250,
        borderRadius: 25
        
    },
    helpsomeone: {
        height: 150,
        width: 250,
        borderRadius: 25
    },

    logandsign: {
        margin: 12,
        marginTop: 13
    },
    underlineStyle: {
        borderColor: blue500,
        // left: 10,
      },
    underlineFocusStyle: {
        borderColor: blue500,
        // margin: 10,
        // right: -15
    },
    floatingLabelStyle: {
        color: blue500,
        // marginTop: -30,
        left: 4
      },
    floatingLabelFocusStyle: {
        color: blue500,
      },
}

function mapStateToProps(state) {
    return {
        lat: state.maps.lat,
        lng: state.maps.lng
    };
  }
  
export default connect(mapStateToProps, { setLocationState, createRequest })(CreateRequest)
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'

import './CreateRequest.css'
import ConfirmDialog from '../Dialog/Dialog'
import white_hand_logo from './white_hand_logo.png'


import { setLocationState } from '../../ducks/reducers/maps';
import { createRequest } from '../../ducks/reducers/requests';
import { connect } from 'react-redux';

import{ SelectField, TextField, MenuItem, RaisedButton, SvgIcon, FontIcon } from 'material-ui';
import { blue500, blue400, lightGreen300, red400, black, white, grey200, grey600, grey700, transparent } from 'material-ui/styles/colors';


import './CreateRequest.css'

class CreateRequest extends Component {
    constructor(props){
        super(props);
        this.state = {
            lng: props.lng,
            lat: props.lat,
            value: null,
            category: "",
            description: "",
            userData: undefined,
            dialogToggle : false
        }

        this.handleChange = this.handleChange.bind(this)
        this.requestToState = this.requestToState.bind(this)
        this.toggleDialog = this.toggleDialog.bind(this)
        this.requestCreator = this.requestCreator.bind(this)
    }

    toggleDialog(){
        this.setState({dialogToggle:!this.state.dialogToggle})
        this.props.history.push('/Home')
    }

    requestToState(e){
        console.log('e.target.innerHTML',e.target.innerHTML)
        const{id, innerHTML} = e.target
            this.setState({
                [id]: [e.target.value]
            //   category: e.target.innerHTML
            })
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
                console.log("clientID",res.data.user)
            })
    }

    componentWillReceiveProps(nextprops) {
        let newState = {}
        newState['lat'] = Number(nextprops.lat)
        newState['lng'] = Number(nextprops.lng)
        this.setState(newState)
      }

    requestCreator () {
        //Post request
        //User_id, cat_id, desc, long, lat
        //Ensure location coordinates on req object
        if ( !this.props.lat || this.props.lat === ""){
            console.log("Unable to callect location data!")
            alert("Unable to collect location data for this device. This is required to submit a request.")
            return;
        }
        console.log('generating request . . .')
        let generated = {
            user_id:this.state.userData,
            category_id: this.state.category,
            description: this.state.description[0],
            lat: this.props.lat,
            long: this.props.lng
        }
        // call ConfirmDialog here
        this.props.createRequest(generated)
        this.setState({dialogToggle:true})
    }

    render() {

        return (
            
            <div className='create_req' >
                
                <div className='create_req_header'>
                    <img src={white_hand_logo} alt='white_hand'/>
                </div>

                <div className='create_req_body'>
                    <h1>Need a Hi Five?</h1>

                    <div className='create_req_category'>
                        <SelectField
                            name="category"
                            id="category"
                            ref='category'
                            value={this.state.value}
                            onChange={this.handleChange}
                            onClick={this.requestToState}
                            menuItemStyle={{color: white}}
                            listStyle={{backgroundColor: grey600}}
                            labelStyle={{color: white}}
                            selectedMenuItemStyle={{color: black}}
                            // menuStyle={{}}
                            style={{margin: 5}}
                            floatingLabelText="Select a Category"
                            floatingLabelStyle={{left: 10, color: white}}
                        >
                            <MenuItem key={1} value={1} primaryText="Automotive"/>
                            <MenuItem key={2} value={2} primaryText="Spiritual" />
                            <MenuItem key={3} value={3} primaryText="Life" />
                            <MenuItem key={4} value={4} primaryText="Errands" />
                            <MenuItem key={5} value={5} primaryText="Handyman" />

                        </SelectField>
                    </div>
                
                    {/* <h2>How can a Good Sammy help you?</h2> */}

                    <div className='create_req_desc'>
                        <TextField
                            name="Request Description"
                            id="description"
                            ref='description'
                            multiLine={true}
                            fullWidth={false}
                            style={{ margin: 10, marginTop: -10}}
                            rows={ 1 }
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            textareaStyle={{ color: white}}
                            underlineFocusStyle={styles.underlineFocusStyle}
                            floatingLabelText="Give a brief Description"
                            onChange={this.requestToState}
                            value={this.state.description}
                        />
                    </div>

                </div>
                <br />
                {/*                 
                <div className="map">
                    <Map lat={this.state.lat} lng={this.state.lng}/>
                </div> */}

                <div className='buttons'>
                    <RaisedButton 
                        label='Request Help'
                        labelStyle={{color: white}}
                        backgroundColor={transparent} 
                        style={ styles.logandsign }
                        onClick={ this.requestCreator }>

                    </RaisedButton>

                    <Link to='/Home'>
                            <RaisedButton 
                                label='Cancel' 
                                labelStyle={{color: white }}
                                backgroundColor={transparent} 
                                style={ styles.logandsign }
                                // onClick={this.requestCreator}
                                >
                            </RaisedButton>
                    </Link>
                </div>
                <ConfirmDialog open={this.state.dialogToggle} toggleDialog={this.toggleDialog}/>
                {/* <p>client ID from state: {this.state.userData} </p> */}
            </div>
        );
    }
}


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
        // height: 60,
        margin: 12,
        marginTop: 13,
        backgroundColor: transparent,
        opacity: 0.9,
    },
    underlineStyle: {
        borderColor: white,
        // left: 10,
      },
    underlineFocusStyle: {
        borderColor: white,
        // margin: 10,
        // right: -15
    },
    floatingLabelStyle: {
        color: white,
        // marginTop: -30,
        left: 4
      },
    floatingLabelFocusStyle: {
        color: white,
      },
}

function mapStateToProps(state) {
    return {
        lat: state.maps.lat,
        lng: state.maps.lng
    };
  }
  
export default connect(mapStateToProps, { setLocationState, createRequest })(CreateRequest)
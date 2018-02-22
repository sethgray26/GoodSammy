import React, { Component } from 'react'

import './Demo.css'

import blue_hand from'./blueHand.png'
import google_map from './Google-Maps.png'
import login from './login.png'
import login_vid from './login_vid.mov'
import home_vid from './home_vid.mov'
import create_vid from './create_vid.mov'
import list_vid from './list_vid.mov'

import { Dialog, TextField, RaisedButton } from 'material-ui'
import { lightGreen500, blue500 } from 'material-ui/styles/colors';
import { lightBlue500, white } from 'material-ui/styles/colors';


export default class Demo extends Component {
    constructor(){
        super()
        this.state={
            openDemo: false,
        }

    }

    handleDemoOpen = () => {
        this.setState({openDemo: true});
    };

    handleDemoClose = () => {
        this.setState({openDemo: false});
    };


    render (){

        const actions =[
            <div className="demo_button_wrapper">
                <RaisedButton
                        label="Close Demo"
                        backgroundColor={ lightBlue500 }
                        style={{margin: 3}}
                        onClick={this.handleDemoClose}
                />
            </div>
        ]

        return(
            <div className="Demo">

                <h1>Portfolio Walkthrough</h1>

                <div className='arrow_wrapper'>
                    <div className='arrow bounce'>
                    </div>
                </div>
                

                <div>
                    <RaisedButton 
                        label='About this App' 
                        labelStyle={{color: white}}
                        backgroundColor={ lightBlue500 } 
                        style={ styles.logandsign }
                        onClick={this.handleDemoOpen}
                    />
                </div>

                    
                <Dialog
                    className='demo'
                    title='About "HI FIVE"'
                    titleStyle={styles.title}
                    actions={ actions }
                    modal={true}
                    open={this.state.openDemo}
                    contentStyle={styles.customContentStyle}
                    autoDetectWindowHeight={true}
                    autoScrollBodyContent={true}>

                    <div className='demo'>
                        <p>Hi Five is a React.js Application designed for mobile use, it utilized the Google Maps
                            API to generate real time locations of the users and distace to other users. 
                        </p>

                        <img src={google_map} alt="google"/>

                        <p>Logging in (or signing up) saves the users ID on the dadabase and 
                            takes the user to Hi Five's Home page. </p>

                        <br/>

                        <video autoPlay={true} loop={true} src={login_vid} />

                        <br/>

                        <p>The user then has the option to create a "Hi Five" request
                            OR go view other users needing a "Hi Five". They can also logOut and end the sesson.</p>
                        
                        <br/>

                        <video autoPlay={true} loop={true} src={home_vid} />

                        <br/>

                        <p>On the create "Hi Five" screen the user select's the category of help they need
                            and enter more details about the request. When the request is made it is then sent to the "Hi Five" view screen.</p>
                        
                        <br/>

                        <video autoPlay={true} loop={true} src={create_vid} />

                        <br/>

                        <p>Here the user can view and select "Hi Five" request from other users. The list also displays a realtime distance to other users current location. From here the user can select a request and choose to view it in detail where they can commit to helping another user. </p>
                        
                        <br/>

                        <video autoPlay={true} loop={true} src={list_vid} />
                        

                    </div>
                       
                </Dialog>
                
                
            </div>
        )
    }
}





const styles = {

    customContentStyle: {
        height: 700 ,
        width: '90%',
        maxWidth: 'none',
    },

    logandsign: {
        margin: 4,
        marginTop: 4,
        height: 55
    },
    

    title: {
        fontFamily: 'Gloria Hallelujah',
        textAlign: 'center',
        letterSpacing: 1.5
    }
}
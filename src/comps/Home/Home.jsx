import React, { Component } from 'react'
// import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Home.css'

import blue_hand from'./blueHand.png'


import { RaisedButton } from 'material-ui'
import { lightGreen500, blue500 } from 'material-ui/styles/colors';
import { lightBlue500 } from 'material-ui/styles/colors';

export default class Home extends Component {
    constructor(){
        super()
        this.state={

        }

    }


    render(){

        return (
            <div className='home'>
                <div className="home_header">
                    <img src={blue_hand} alt='blue_hand'/>
                </div>

                <div className='home_body'>
                    <Link to='/createReq'><RaisedButton 
                        label='Need Help?' 
                        primary={true} buttonStyle={{ borderRadius: 25 }} 
                        style={ styles.needHelp } 
                    /></Link>

                    <Link to='/reqList'><RaisedButton 
                        label='Help Someone' 
                        backgroundColor={ lightGreen500 } 
                        buttonStyle={{ borderRadius: 25 }} 
                        style={ styles.helpsomeone }
                    /></Link>

                    <a href={process.env.REACT_APP_LOGOUT}><RaisedButton label='LOGOUT' 
                        backgroundColor={ lightGreen500 } 
                        style={ styles.logandsign }
                    /></a>

                </div>

              
            </div>
        )
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
        margin: 12,
        marginTop: 18
    },
    underlineStyle: {
        borderColor: blue500,
      },
    floatingLabelStyle: {
        color: blue500
      },
    floatingLabelFocusStyle: {
        color: blue500,
      },
}
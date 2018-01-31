import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Home.css'

import blue_hand from'./blueHand.png'


import { RaisedButton } from 'material-ui'
import { lightGreen500, blue500 } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

export default class Home extends Component {
    constructor(){
        super()
        this.state={
            clientID: null
        }
    }
    componentDidMount(){  // get client ID from session
        axios.get('auth/me').then((res)=>{
            console.log('======>res.data.user (clientID)',res.data.user)
            this.setState({clientID: res.data.user})
        })
    }

    render(){

        return (
            <div className='home'>
                <div className="home_header">
                    <img src={blue_hand} alt='blue_hand'/>
                </div>

                <div className='home_body'>

                    <div> 
                    <Link id='button' to='/createReq'>
                        <RaisedButton 
                            label='Need Help?' 
                            primary={true} buttonStyle={{ borderRadius: 25 }} 
                            style={ styles.needHelp } 
                        />
                    </Link>
                    </div>

                    <div>
                    <Link id='button' to='/reqList/unassigned'>
                        <RaisedButton 
                            label='Help Someone' 
                            labelStyle={{color: white}}
                            backgroundColor={ lightGreen500 } 
                            buttonStyle={{ borderRadius: 25 }} 
                            style={ styles.helpsomeone }
                        />
                    </Link>
                    </div>
                    <div>
                    <Link id='button' to='/reqList/assigned'>
                        <RaisedButton 
                            label='My Requests' 
                            backgroundColor={ lightGreen500 } 
                            buttonStyle={{ borderRadius: 25 }} 
                            style={ styles.helpsomeone }
                        />
                    </Link>
                    </div>

                    <div>
                    <a href={process.env.REACT_APP_LOGOUT}>
                        <RaisedButton label='LOGOUT' 
                            labelStyle={{color: white}}
                            backgroundColor={ lightGreen500 } 
                            style={ styles.logandsign }
                    /></a>
                    </div>

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

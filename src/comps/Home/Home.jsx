import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Home.css'

import white_hand_logo from './white_hand_logo.png'



import { RaisedButton } from 'material-ui'
import { lightGreen500, blue500, transparent, white, grey200, grey50, white500, white400, white100, grey500, grey700 } from 'material-ui/styles/colors';
import { grey100, fullWhite } from 'material-ui/styles/colors';
import { black } from 'material-ui/styles/colors';
import { grey800 } from 'material-ui/styles/colors';

export default class Home extends Component {
    constructor(){
        super()
        this.state={
            clientID: null
        }
    }
    componentDidMount(){  // get client ID from session
        axios.get('auth/me').then((res)=>{
            this.setState({clientID: res.data.user})
        })
    }

    render(){

        return (
            <div className='home'>
                <div className="home_header">
                    <img src={white_hand_logo} alt='white_hand'/>
                </div>

                <div className='home_body'>

                    <div> 
                        <Link id='button' to='/createReq'>
                            <RaisedButton 
                                label='Need Help?' 
                                labelStyle={{color: white, fontWeight: 900, fontSize: 18, letterSpacing: 1.5}}
                                backgroundColor={transparent}
                                buttonStyle={{ borderRadius: 25, border: '2px', borderStyle: 'outset', color: white }}
                                // overlayStyle={{border: 2, borderColor: white }}
                                style={ styles.needHelp } 
                            />
                        </Link>
                    </div>

                    <div>
                        <Link id='button' to='/reqList/unassigned'>
                            <RaisedButton 
                                label='Help Someone' 
                                labelStyle={{color: white, fontWeight: 900, fontSize: 18, letterSpacing: 1.5}}
                                backgroundColor={ transparent } 
                                buttonStyle={{ borderRadius: 25, border: '2px', borderStyle: 'outset', color: white }}
                                style={ styles.helpsomeone }
                            />
                        </Link>
                    </div>

                    <div>
                        <Link id='button' to='/reqList/assigned'>
                            <RaisedButton 
                                label='My Requests' 
                                labelStyle={{color: white, fontWeight: 900, fontSize: 18, letterSpacing: 1.5}}
                                backgroundColor={transparent} 
                                buttonStyle={{ borderRadius: 25, border: '2px', borderStyle: 'outset', color: white }} 
                                style={ styles.helpsomeone }
                            />
                        </Link>
                    </div>

                    <div>
                        <a href={process.env.REACT_APP_LOGOUT}>
                            <RaisedButton 
                                label='LOGOUT' 
                                labelStyle={{fontWeight: 900, fontSize: 16, letterSpacing: 1.5}}
                                backgroundColor={ white } 
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
        margin: 5,
        marginTop: 30,
        height: 150,
        width: 250,
        borderRadius: 25,
        backgroundColor: transparent,
        // bordercolor: black,
        // opacity: 2.1,
        
    },
    helpsomeone: {
        height: 150,
        width: 250,
        margin: 5,
        borderRadius: 25,
        // border: 0.1,
        color: white,
        backgroundColor: transparent,
        background: transparent,
        // opacity: 1.9,
    },

    logandsign: {
        margin: 8,
        marginTop: 10,
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

import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import './Landing.css'
import Demo from '../Demo/Demo.jsx'

import { createUsers, updateUser } from '../../ducks/reducers/users.jsx'

import blue_hand from'./blueHand.png'
import White_hand_logo from './white_hand_logo.png'

import { Dialog, TextField, RaisedButton } from 'material-ui'
import { lightGreen500, blue500, white, lightBlue100, grey100, grey500 } from 'material-ui/styles/colors';
import { lightBlue500 } from 'material-ui/styles/colors';
import { transparent } from 'material-ui/styles/colors';
import { fullWhite } from 'material-ui/styles/colors';
// import Chat from './../Chat/Chat.jsx'


class Landing extends Component {
    constructor(){
        super()
        this.state={
            openSignUp: false,
            username: "",
            password: "",
            confirmPassword: "",
            phone: "",
            error:{
                username:null,
                password:null
            }            
        }

        this.createUser = this.createUser.bind(this)
        this.login = this.login.bind(this)
        this.inputSubmit = this.inputSubmit.bind(this)
    }

    handleOpen = () => {
        this.setState({openSignUp: true});
    };

    handleClose = () => {
        this.setState({openSignUp: false});
    };



    handleDemoOpen = () => {
        this.setState({openDemo: true});
    };

    handleDemoClose = () => {
        this.setState({openDemo: false});
    };



    inputChange(e) {
        let { name, value } = e.target
        let newState = {}
        newState[name] = value
        this.setState(newState)
    }s

    createUser(){
        let { username, password, confirmPassword, phone } = this.state

        if ( password === confirmPassword ){
            this.props.createUsers({ username, password, phone })
            .then(res => {
                this.handleClose()
            })
        }else {
            return "Passwords do not match"
        }
        
    }

    inputSubmit(e){
        if( e.key === "Enter" && e.target.value.length < 0 ){
            this.login()
        }
    }

    login(  ) {
        let errors = {username:null, password:null};
        if(!this.state.username) {errors.username = "required field"}
        if(!this.state.password) {errors.password = "required field"}
        
        if (errors.username || errors.password) {
            
            this.setState({error:errors})
            return
        } 
        axios.put(`/checkLogin/${this.state.username}`, { txtPassword: this.state.password })
        .then(res => {
            if (res.data.id) {
                //redirect to dashboard
                // put res.data.id on redux as client's userIDselese
                this.props.updateUser(res.data.id)
                this.props.history.push('/Home')
            }
            else {
                //stay on log in p
                //TODO make this an inline error instead of alert
                //setstatewith error message
                this.setState({error :{username:"Incorrect username or password",
                                    password:null}
                                })
            }
        }).catch(error => {            
        });
    }

    render (){

        const actions = [
            <div className="dialog_button_wrapper">
                <RaisedButton
                    label="Cancel"
                    labelColor={white}
                    backgroundColor={transparent}
                    style={styles.logandsign}
                    onClick={this.handleClose}
                />

                <RaisedButton
                    label="Submit"
                    labelColor={white}
                    backgroundColor={transparent}
                    style={styles.logandsign}
                    onClick={() => this.createUser()}
                /> 
            </div>
        ];

        

        return(
            <div className="landing">
                <div className="landing_header">
                    <img src={White_hand_logo} alt='blue_hand'/>
                </div>


                <div className='landing_footer'>

                    <div className="login_text_wrapper">

                    <TextField
                            name='username'
                            value={this.state.username}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={false}
                            multiLine={false}
                            inputStyle={{color: white}}
                            floatingLabelText="USERNAME"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        /><br />

                        <TextField
                            name='password'
                            value={this.state.password}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={false}
                            multiLine={false}
                            inputStyle={{color: white}}
                            type='password'
                            floatingLabelText="PASSWORD"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            onKeyPress={this.inputSubmit}
                        /><br />

                    </div>

                    
                    <div className="login_button_wrapper">

                    <RaisedButton 
                            label='LOGIN'
                            labelColor={white} 
                            backgroundColor={transparent} 
                            buttonStyle={{ border: '1px', borderStyle: 'outset', color: white }}
                            style={styles.logandsign}
                            onClick={(e) => this.login(e)}
                        />
                        <RaisedButton 
                            label='SIGN UP' 
                            labelColor={white}
                            backgroundColor={transparent}
                            buttonStyle={{ border: '1px', borderStyle: 'outset', color: white }} 
                            style={styles.logandsign}
                            onClick={this.handleOpen}/>

                    </div>

                    <div className="demo_wrapper">

                        <Demo/>

                    </div>
                    
                    <Dialog
                        title='SIGN UP!'
                        titleStyle={styles.title}
                        actions={ actions }
                        modal={true}
                        open={this.state.openSignUp}
                        actionsContainerStyle={{backgroundColor: grey500}}
                        bodyStyle={{backgroundColor: grey500}}>

                        <TextField
                            name='username'
                            value={this.state.username}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={false}
                            inputStyle={{color: white}}
                            floatingLabelText="Create a Username"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}                                floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />

                        <TextField
                            name="password"
                            type="password"
                            value={this.state.password}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={false}
                            inputStyle={{color: white}}
                            // multiLine={true}
                            floatingLabelText="Create a Password"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />

                        <TextField
                            name='confirmPassword'
                            type='password'
                            value={this.state.confirmPassword}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={false}
                            inputStyle={{color: white}}
                            // multiLine={true}
                            floatingLabelText="Confirm Password"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />

                        <TextField
                            name='phone'
                            value={this.state.phone}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={false}
                            inputStyle={{color: white}}
                            floatingLabelText="Phone Number"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        />

                    </Dialog>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps( state ){
    
    return {
        userData: state.users.userData,
        userID: state.users.userID
    }
}

export default connect( mapStateToProps, { createUsers, updateUser }) ( Landing )


const styles = {
    needHelp: {
        margin: 12,
        marginTop: 30,
        height: 150,
        width: 250,
        borderRadius: 25,
      
        
    },
    helpsomeone: {
        height: 150,
        width: 250,
        borderRadius: 25
    },

    logandsign: {
        margin: 8,
        marginTop: 13,
        backgroundColor: transparent,
        opacity: 0.9,
    },
    underlineStyle: {
        color: white,
        borderColor: white,
      },
    floatingLabelStyle: {
        color: white,
        fontFamily: 'Roboto',
        fontSize: 20,
        letterSpacing: 2 
      },
    floatingLabelFocusStyle: {
        color: white,
        fontFamily: 'Roboto',
      },
    inputStyle: {
        color: white,
        fontFamily: 'Roboto',
    },

    title: {
        fontFamily: 'Roboto',
        color: white,
        backgroundColor: grey500
    }
}


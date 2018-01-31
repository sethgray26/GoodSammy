import React, { Component } from 'react'
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import axios from 'axios'

import './Landing.css'
import Demo from './Demo'

import { createUsers, updateUser } from '../../ducks/reducers/users.jsx'

import blue_hand from'./blueHandLogo.png'

import { Dialog, TextField, RaisedButton } from 'material-ui'
import { lightGreen500, blue500 } from 'material-ui/styles/colors';
import { lightBlue500, white } from 'material-ui/styles/colors';
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
            console.log('got error')
            console.log(errors)
            this.setState({error:errors})
            return
        } 
        axios.put(`/checkLogin/${this.state.username}`, { txtPassword: this.state.password })
        .then(res => {
            console.log('res==>',res)
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
                console.log('wrong pw or username')
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
                    primary={true}
                    style={{margin: 3}}
                    onClick={this.handleClose}
                />

                <RaisedButton
                    label="Submit"
                    primary={true}
                    style={{margin: 3}}
                    onClick={() => this.createUser()}
                /> 
            </div>
        ];

        

        return(
            <div className="landing">
                <div className="landing_header">
                    <img src={blue_hand} alt='blue_hand'/>
                </div>


                <div className='landing_footer'>

                    <div className="login_text_wrapper">

                        <TextField
                            name='username'
                            errorText={this.state.error.username}
                            value={this.state.username}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={false}
                            multiLine={false}
                            floatingLabelText="Username"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        /><br />

                        <TextField
                            name='password'
                            errorText={this.state.error.password}
                            value={this.state.password}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={false}
                            multiLine={false}
                            type='password'
                            floatingLabelText="Password"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                            onKeyPress={this.inputSubmit}
                        /><br />

                    </div>

                    
                    <div className="login_button_wrapper">

                        <RaisedButton 
                            label='LOGIN' 
                            labelStyle={{color: white}}
                            backgroundColor={ lightGreen500 } 
                            style={ styles.logandsign }
                            onClick={ (e) => this.login(e)}
                        />
                        <RaisedButton 
                            label='SIGN UP' 
                            labelStyle={{color: white}}
                            backgroundColor={ lightBlue500 } 
                            style={ styles.logandsign }
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
                        open={this.state.openSignUp}>

                        <TextField
                            name='username'
                            value={this.state.username}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={true}
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
                            multiLine={true}
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
        borderRadius: 25
        
    },
    helpsomeone: {
        height: 150,
        width: 250,
        borderRadius: 25
    },

    logandsign: {
        margin: 8,
        marginTop: 13
    },
    underlineStyle: {
        borderColor: blue500,
      },
    floatingLabelStyle: {
        color: blue500,
        fontFamily: 'Gloria Hallelujah',
        fontSize: 20,
        letterSpacing: 2 
      },
    floatingLabelFocusStyle: {
        color: blue500,
      },

    title: {
        fontFamily: 'Gloria Hallelujah',
    }
}


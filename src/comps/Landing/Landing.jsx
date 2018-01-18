import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Landing.css'

import { createUsers } from '../../ducks/reducers/users.jsx'

import blue_hand from'./blueHand.png'

import { Dialog, TextField, RaisedButton } from 'material-ui'
import { lightGreen500, blue500 } from 'material-ui/styles/colors';
import { lightBlue500 } from 'material-ui/styles/colors';


class Landing extends Component {
    constructor(){
        super()
        this.state={
            openSignUp: false,
            username: "",
            password: "",
            confirmPassword: "",
            phone: ""
            
        }

        this.createUser = this.createUser.bind(this)
        this.login = this.login.bind(this)
    }

    handleOpen = () => {
        this.setState({openSignUp: true});
    };

    handleClose = () => {
        this.setState({openSignUp: false});
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

    login() {
        console.log('hit')
        axios.put(`/checkLogin/${this.state.username}`, { txtPassword: this.state.password })
        .then(res => {
            if (res.data === true) {
                //redirect to dashboard
                this.props.history.push('/Home')
            }
            else {
                //stay on log in p
                alert('Incorrect username or password, please try again!')
            }
        }).catch(error => {
            
        });
    }




    render (){
        const actions = [
            <RaisedButton
              label="Cancel"
              primary={true}
              onClick={this.handleClose}
            />,
            <RaisedButton
              label="Submit"
              primary={true}
              onClick={() => this.createUser()}
            /> 
        ];

        return(
            <div className="landing">
                <div className="landing_header">
                    <img src={blue_hand} alt='blue_hand'/>
                </div>

                {/*<div className='landing_body'>
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

                </div>*/}

                <div className='landing_footer'>

                    <TextField
                        name='username'
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
                        value={this.state.password}
                        onChange={(e) => this.inputChange(e)}
                        fullWidth={false}
                        multiLine={false}
                        type='password'
                        floatingLabelText="Password"
                        underlineFocusStyle={styles.underlineStyle}
                        floatingLabelStyle={styles.floatingLabelStyle}
                        floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                    /><br />

                    <RaisedButton label='LOGIN' 
                        backgroundColor={ lightGreen500 } 
                        style={ styles.logandsign }
                        onClick={ () => this.login()}
                    />
                    <RaisedButton label='SIGN UP' 
                        backgroundColor={ lightBlue500 } 
                        style={ styles.logandsign }
                        onClick={this.handleOpen}/>

                    <Dialog
                        title='SIGN UP!'
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
                        /><br />

                        <TextField
                            name='password'
                            value={this.state.password}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={true}
                            floatingLabelText="Create a Password"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        /><br />

                        <TextField
                            name='confirmPassword'
                            value={this.state.confirmPassword}
                            onChange={(e) => this.inputChange(e)}
                            fullWidth={true}
                            multiLine={true}
                            floatingLabelText="Confirm Password"
                            underlineFocusStyle={styles.underlineStyle}
                            floatingLabelStyle={styles.floatingLabelStyle}
                            floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                        /><br />

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
                        /><br />



                    </Dialog>
                </div>
                
            </div>
        )
    }
}

function mapStateToProps( state ){
    
    return {
        userData: state.users.userData
    }
}

export default connect( mapStateToProps, { createUsers }) ( Landing )


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
        margin: 12
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


import React, { Component } from 'react';
import { connect } from 'react-redux';
import Map from '../Map/Map'
import Chat from '../Chat/Chat'
import axios from 'axios'

import RaisedButton  from 'material-ui/RaisedButton';  
import TextField from 'material-ui/TextField';
import { lightGreen300 } from 'material-ui/styles/colors';
import {Link} from 'react-router-dom';  

import './ViewRequest.css'
import { white } from 'material-ui/styles/colors';


class ViewRequest extends Component {
    constructor(){
        super()
            this.state = {
                request: null,
                disable: true,
                andrewsIdea:'Sucks at the foos'
            }
            
    }
    enableStatus = () => {
        this.setState({
            disable: !this.state.disable
        })
    }
    saveChanges = () => {
        let updates = {
            description: this.refs.description.value,
            request_id: this.state.request.id
        }
        // console.log(updates);
        
        axios.put('/update', updates)
    }
    saveAndDisable = () => {
        this.saveChanges()
        this.enableStatus()
    }

    handleCommit = () =>{
        console.log('ClientId ist',this.props.clientID)

        let sammy = {
            help_id: this.props.clientID,
            request_id: this.state.request.id
        }
        axios.put('/commit', sammy)
        
        this.setState({
            request: Object.assign({}, this.state.request, {help_id: this.props.clientID})
        })
        
    }

    removeHelper = () => {
        let removed = {
            request_id: this.state.request.id
        }
        axios.put('/removeHelp', removed)
    }


    componentDidMount(){
        
        axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
            this.setState({
                request: res.data[0]
            })
            console.log('logging state', this.state.request);
            
            
        })
    }

    render() {
        console.log('this.props: ',this.props)
        
        return this.state.request ?
        (
            <div>
                {/* false ternary placeholder, Redux to be implented */}
                {this.state.request.user_id === this.props.clientID ?

                    <div className="view_wrapper">
                        {/* own view */}
                        <div className="map_wrapper">
                            <Map  
                                lat={+this.state.request.lat} 
                                lng ={+this.state.request.long}
                            />
                        </div>
                        
                        <div className="text_wrapper">
                            <textarea className="text_area"
                                name="" 
                                id="" 
                                cols="30" 
                                rows="10" 
                                disabled={this.state.disable} 
                                ref='description' 
                                defaultValue={this.state.request.description}>
                            </textarea>
                        </div>
                        
                        <div className="text_button_wrapper">
                            <RaisedButton 
                                label ='Edit Information' 
                                onClick={this.enableStatus} 
                                primary = {true} 
                            />
                            <RaisedButton 
                            label ='Save!' 
                            disabled={this.state.disable} 
                            onClick={this.saveAndDisable} 
                            secondary={true} 
                            style={{marginLeft: 13}}
                            />
                        </div>
                        
                        <div className="chat_wrapper">
                            <Chat 
                                userID={this.props.clientID} 
                                creatorID={this.state.request.user_id} 
                                helperID={this.state.request.help_id} 
                                requestID={this.state.request.id}
                            />
                        </div>
                        
                        <div className="close_wrapper">
                            <RaisedButton 
                                label='Close Request'
                                labelColor={white}
                                backgroundColor={ lightGreen300 }
                                style ={{ width:150 }}
                            />
                        </div>
                        
                    </div>

                :

                    <div className="view_wrapper">
                        {/* other view */}
                        <div className="map_wrapper">
                            <Map  
                                lat={+this.state.request.lat} 
                                lng ={+this.state.request.long}
                            />
                        </div>
                        <div className="desc_wrapper">
                            <span>{this.state.request.description}</span>
                        </div>

                        {/* if someone is already helping */}

                        {this.state.request.help_id === null ?
                        
                            <RaisedButton 
                                label='Commit to help' 
                                onClick ={this.handleCommit} 
                                backgroundColor={ lightGreen300 } 
                            />
                    
                        :

                        <div>
                            <div className="chat_wrapper">

                                <Chat 
                                    userID={this.props.clientID} 
                                    creatorID={this.state.request.user_id} 
                                    helperID={this.state.request.help_id} 
                                    requestID={this.state.request.id}
                                />

                            </div>

                            <Link to ='/reqList'><RaisedButton label = 'Stop helping' onClick={this.removeHelper}/></Link>
                        </div>
                    }

                        <Link to='/reqList'><RaisedButton label ='Return to List' secondary={true} /></Link>

                    </div>
            }
            </div>
        )

                :
             (
                <div>Uh oh! Looks like something went wrong!  
                    <Link to='/'><RaisedButton label ='Home Page' primary ={true}/></Link>
                </div>
            )
        
    }
}
function mapStateToProps(state){
    return {
        clientID : state.users.userID
    }
}

export default connect(mapStateToProps)(ViewRequest);

























// import React, { Component } from 'react';
// import { connect } from 'react-redux';
// import Map from '../Map/Map'
// import Chat from '../Chat/Chat'
// import axios from 'axios'

// import RaisedButton  from 'material-ui/RaisedButton';  
// import { lightGreen300 } from 'material-ui/styles/colors';
// // import {Link} from 'react-router-dom';  
// import { RadioButton } from 'material-ui';
// import {Link} from 'react-router-dom';  

// import './ViewRequest.css'
// import { white } from 'material-ui/styles/colors';


// class ViewRequest extends Component {
//     constructor(){
//         super()
//             this.state = {
//                 request: [],
//                 disable: true,
//             }
            
//     }
//     enableStatus = () => {
//         this.setState({
//             disable: !this.state.disable
//         })
//     }
//     saveChanges = () => {
//         let updates = {
//             description: this.refs.description.value,
//             request_id: this.state.request[0].id
//         }
//         axios.put('/update', updates)
//     }
//     saveAndDisable = () => {
//         this.saveChanges()
//         this.enableStatus()
//     }

//     handleCommit = () =>{
//         console.log('ClientId ist',this.props.clientID)

//         let sammy = {
//             help_id: this.props.clientID,
//             request_id: this.state.request.id
//         }
//         axios.put('/commit', sammy)
        
//         this.setState({
//             request: Object.assign({}, this.state.request, {help_id: this.props.clientID})
//         })
        
//     }

//     removeHelper = () => {
//         let removed = {
//             request_id: this.state.request.id
//         }
//         axios.put('/removeHelp', removed)
//     }


//     componentDidMount(){
//         console.log('params',this.props.match.params.id)
//         axios.get(`/request/+${this.props.match.params.id}`).then((res) => {
//             this.setState({
//                 request: res.data[0]
//             })
//         })
        
//     }

//     // componentWillReceiveProps(nextProps){
//     //     console.log("state",this.state.request)
//     // }
//     render() {
            
//         return this.state.request ?
//         (
//             <div>
//                 {/* false ternary placeholder, Redux to be implented */}

//                 {this.state.request.user_id === this.props.clientID ?

//                     <div className="view_wrapper">
//                         {/* own view */}

//                         <div className="map_wrapper">
//                             <Map  
//                                 lat={+this.state.request[0].lat} 
//                                 lng ={+this.state.request[0].long}
//                             />
//                         </div>
                        
//                         <div className="text_wrapper">
//                             <textarea className="text_area"
//                                 name="" 
//                                 id="" 
//                                 cols="30" 
//                                 rows="10" 
//                                 disabled={this.state.disable} 
//                                 ref='description' 
//                                 defaultValue={this.state.request[0].description}>
//                             </textarea>
//                         </div>
                        

//                         <div className="text_button_wrapper">
//                             <RaisedButton 
//                                 label ='Edit Information' 
//                                 onClick={this.enableStatus} 
//                                 primary = {true} 
//                             />

//                             <RaisedButton 
//                             label ='Save!' 
//                             disabled={this.state.disable} 
//                             onClick={this.saveAndDisable} 
//                             secondary={true} 
//                             style={{marginLeft: 13}}
//                             />
//                         </div>
                        
//                         <div className="chat_wrapper">
//                             <Chat 
//                                 userID={this.props.clientID} 
//                                 creatorID={this.state.request.user_id}
//                                 helperID={this.state.request.help_id}
//                                 requestID={this.state.request.id}/>
//                         </div>
                        

//                         <div className="close_wrapper">
//                             <RaisedButton 
//                                 label='Close Request'
//                                 labelColor={white}
//                                 backgroundColor={ lightGreen300 }
//                                 style ={{ width:150 }}
//                             />
//                         </div>
//                     </div>    
                
//                 :

//                 <div className="view_wrapper">
//                         {/* helper view */}

//                         <div className="map_wrapper">
//                             <Map  
//                                 lat={+this.state.request[0].lat}
//                                 lng ={+this.state.request[0].long}
//                             />
//                         </div>

//                         <div className="desc_wrapper">
//                             <span>{this.state.request[0].description}</span>
//                         </div>

//                         {this.state.request.help_id === null ?

//                             <RaisedButton 
//                                 label='Commit to help' 
//                                 onClick ={this.handleCommit} 
//                                 primary ={true} 
//                             />
//                      :
//                         <div>
//                             <Chat 
//                                 userID={this.props.clientID} 
//                                 creatorID={this.state.request.user_id} 
//                                 helperID={this.state.request.help_id} 
//                                 requestID={this.state.request.id}
//                             />

//                             <Link to ='/reqList'><RaisedButton label = 'Cancel' onClick={this.removeHelper}/></Link>
//                         </div>
                    
//                       }

//                         {/* <div className="commit_button_wrapper">
//                             <RaisedButton 
//                                 label='Commit to help'
//                                 backgroundColor={ lightGreen300 }
//                             />
//                         </div> */}

//                         {/* <div className="chat_wrapper">
//                            <Chat 
//                                 userID={this.props.clientID} 
//                                 creatorID={this.state.request.user_id}
//                                 helperID={this.state.request.help_id}
//                                 requestID={this.state.request.id}
//                             />
//                         </div> */}

//                         {/* <Map lat={+this.state.request.lat} lng={+this.state.request.long}/>
//                         <br/> */}

//                         {/* <p>{this.state.request.description}</p>
//                         <br/> */}

//                         {/* If someone is already helping */}

//                         {/* {this.state.request.help_id === null ?
//                         <RaisedButton label='Commit to help' onClick ={this.handleCommit} primary ={true} />
//                         :
//                         <div>
//                             <Chat userID={this.props.clientID} creatorID={this.state.request.user_id} 
//                             helperID={this.state.request.help_id} requestID={this.state.request.id}/>
//                             <Link to ='/reqList'><RaisedButton label = 'Cancel' onClick={this.removeHelper}/></Link>
//                         </div> */}
                    
                        
//                     <Link to='/reqList'><RaisedButton label ='Return to List' secondary={true} /></Link>
//                 </div>
//             }
//             </div>
//         )

//         :
//              (
//                 <div>Uh oh! Looks like something went wrong!  
//                      <Link to='/'><RaisedButton label ='Home Page' primary ={true}/></Link>
//                 </div>
//             )
        
//     }
// }

// function mapStateToProps(state){
//     return {
//         clientID : state.users.userID
//     }
// }

// export default connect(mapStateToProps)(ViewRequest);
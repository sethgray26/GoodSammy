// req.match.params.id = assigned || unassigned 

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import axios from 'axios';

import RepeatedRequest from './../RepeatedList/repeatedList';
import CircularProgress from 'material-ui/CircularProgress';
import { setLocationState, storeDistances } from '../../ducks/reducers/maps';

import white_hand_logo from '../Home/white_hand_logo.png'
import './RequestList.css'

import { RaisedButton } from 'material-ui'
import { lightBlue500, transparent, white } from 'material-ui/styles/colors';

class RequestList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            requestArr: [],
            clientID: null,
            userNames: [],
            isTop: true, 
        }
    }

    //Get the Geolocation of the user
    async componentDidMount() {

        await axios.get('auth/me').then(res=>{  // get client ID
            this.setState({ clientID:res.data.user }) })
        {this.props.match.params.id === "unassigned" 
        ?   // requests not pertaning to client
            await axios.get(`/allrequests/${this.state.clientID}`).then((res) => { //get request array
                this.setState({
                    requestArr: res.data
                })
            })
        :   // requeests pertaining to client
            await axios.get(`/myrequests/${this.state.clientID}`).then((res) => { //get request array
                this.setState({
                    requestArr: res.data
                })
            })
        }

        // await axios.get('/userslist').then((res)=>{  // get list of usernames
        //     let arr = res.data
        //     this.setState({userNames: arr})
        // })
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                this.props.setLocationState(lat, lng)
                this.distance(lat, lng)
            })
        }
        else {
            console.log('not supported in browser')
        }
        
    }

    componentWillMount(){
        document.addEventListener('scroll', () => {
            const isTop = window.scrollY < 100;
            if (isTop !== this.state.isTop) {
                this.setState({ isTop })
            }
          });
    }

    componentWillReceiveProps(nextprops) {
        //Calc distance and push to requestArr
        const lat = nextprops.lat
        const lng = nextprops.lng 
        // this.distance(lat, lng)  // *********
    }

    distance = (lat1, lon1) => {
        //if already have distance values for every request on state, no need to run, just get values from 
        //this.props.distanceArr
        // loop through this.props.distanceArr and assign distance values to state.requestArr

        
        let arr = this.state.requestArr;
        let marker = false;
        arr.forEach(item=>{
            this.props.distanceArr.forEach(propItem=>{
                if(item.id===propItem.id){
                    item.distance=propItem.distance
                }
            })
            if (!item.distance) {
                // carry on with the function and get new values
                // otherwise, we are done ! 
                marker=true;
            }
        })
        // console.log('__________________marker=',marker)
        if(marker){
        
        
        
        let newArr = []
        for (var i = 0; i < arr.length; i++) {
            let type = 'imperial'
            //const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=${type}&origins=${lat1},${lon1}&destinations=${arr[i].lat},${arr[i].long}&key=AIzaSyCIIg2weQK6p4wUTy6nXrCj4-hPGgA40xI`
           
            //newArr.push(axios.get(url))
            newArr.push(axios.put('/getDistance',{type:type, lat1: lat1, lon1: lon1, lat2:arr[i].lat, lon2: arr[i].long}))
        }
        
      
        Promise.all(newArr).then(res => {
            let requestArr = this.state.requestArr
            let distanceArr = this.props.distanceArr;
            for (var j = 0; j < requestArr.length; j++) {
                requestArr[j].distance = res[j].data.rows[0].elements[0].distance.text
                // if matching id on distance arr, update value, otherwise create new obj. 
                let flag = 0;
                distanceArr.forEach(item=>{
                    if (item.id===requestArr[j].id){
                        item.distance=res[j].data.rows[0].elements[0].distance.text
                        flag = 1;
                    }
                })
                if (!flag){
                    distanceArr.push({
                        id: requestArr[j].id, 
                        distance: res[j].data.rows[0].elements[0].distance.text
                    })
                }                
            }

            this.props.storeDistances(distanceArr)
            this.setState({requestArr})  //store on props ? 
        })
    } else {
        this.setState({requestArr:arr})
    }
    }

    render() {
        const request = this.state.requestArr.map(request => {
            return (
                
                <RepeatedRequest
                    key={request.id}
                    description={request.description}
                    category={request.cat_name}
                    distance={request.distance}
                    username={request.username}  // does this exist ? there's no username on the request table in the DB...
                    requestID={request.id}
                    creatorID={request.user_id}
                    helpID={request.help_id}
                    clientID={this.state.clientID}
                    userNames={this.state.userNames}
                    listType={this.props.match.params.id}
                />
            )
        })
        return (
            <div className='page'>
                { this.state.requestArr.length === 0 ? 
                    <div>
                        <br/><br/><br/> {/*  display loading circle until have request ARR */}
                        <CircularProgress size={80} thickness={5} color={white}/>
                    </div>
                :
                <div className='body-content' >
                
                        <div className="list_header">
                            <img style={{height: 70, width: 175 }} src={white_hand_logo} alt='blue_hand'/>
                        </div>
                        

                        {this.state.requestArr.length !== 0  ?

                        <div>
                            <h3>HI FIVE Sombody!</h3>

                                    <Link  to='/Home'>
                                        <RaisedButton 
                                            label='Home'
                                            labelColor={white} 
                                            backgroundColor={ transparent }
                                            buttonStyle={{backgroundColor: transparent,  border: '1px', borderStyle: 'outset', color: white,}}
                                            // buttonStyle={{ borderRadius: 25 }} 
                                            style={ styles.logandsign } 
                                        />
                                    </Link>

                                    <section>{request}</section>
                                
                        </div>                        
                        :
                        <div>Looks like no one needs help! </div>}
                </div>
                }
            </div>
        );
    }
}

const styles = {
    logandsign: {
        margin: 0,
        marginTop: 0,
        backgroundColor: transparent
    }
}

function mapStateToProps(state) {
    return {
        lat: state.maps.lat,
        lng: state.maps.lng,
        distanceArr: state.maps.distanceArr
    };
}

export default connect(mapStateToProps, { setLocationState, storeDistances })(RequestList)
// this props.listType = 'assigned'  || 'unassigned'
import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'

import { lightBlue500, transparent } from 'material-ui/styles/colors';
import { white } from 'material-ui/styles/colors';

class RepeatedRequest extends Component {
    constructor(props){
        super(props)
        this.state={
            username:{
                creator:null,
                helper:null
            }
        }
    }
 
    render() {
        return (
            <div>
                <Card 
                    style = {style.card}
                >
                    <CardHeader 
                        backgroundcolor={transparent}
                        className = 'repeated-request'
                        title = {this.props.category.toUpperCase() }
                        titleStyle = {{ float: 'left', color: white, letterSpacing:1, fontSize: 15 }}
                        subtitle = {this.props.listType === "unassigned" ?  (`${this.props.distance} from you`) : this.props.listType === "assigned" && this.props.clientID === this.props.helpID ? (`${this.props.distance} from you`) : this.props.helpID ? "Your request, someone is helping" : "Your request, looking for helpers" } // gnarliest of ternary strings *shrugs shoulders* hey, it works.
                        subtitleStyle ={{ float: 'right', marginLeft: 20 , color: white}}
                        iconStyle={{color:white}}
                        actAsExpander = {true}
                        showExpandableButton = {true}
                    />
                    <CardText expandable = {true} >
                        <p style={{marginBottom: 15, lineHeight: 1.2, textAlign: 'left', fontSize: 17, letterSpacing: 1, color: white }}>
                            Description: {this.props.description}</p>
                        <br/>
                        <p style={{ marginBottom: 8, fontSize: 19, fontWeight: 300, letterSpacing: 1, color: white}}>Distance from you: {this.props.distance}</p>
                    <CardActions>
                        <Link to={`/viewrequest/${this.props.requestID}`} >
                            <RaisedButton 
                                label="View Details"
                                labelColor={white}
                                backgroundColor={transparent}
                                style={{backgroundColor: transparent}}
                                buttonStyle={{backgroundColor: transparent,  border: '1px', borderStyle: 'solid', color: white,}}
                                />
                        </Link>
                    </CardActions>
                    </CardText>
                </Card>
                    
            </div>
        );
    }
}

export default RepeatedRequest;

const style = {
    card: {
        margin: 10,
        background: transparent,
        border: '1px',
        borderStyle: 'solid',
        color: white,
    },

    CardHeader: {
        display: 'inline',
        backgroundcolor: transparent
    }


}

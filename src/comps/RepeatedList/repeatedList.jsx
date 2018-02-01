// this props.listType = 'assigned'  || 'unassigned'
import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'

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
                <Card style = {style.card}>
                    <CardHeader 
                        className = 'repeated-request'
                        title = {this.props.category.toUpperCase() }
                        titleStyle = {{ float: 'left' }}
                        subtitle = {this.props.listType === "unassigned" ?  (`${this.props.distance} from you`) : this.props.listType === "assigned" && this.props.clientID === this.props.helpID ? (`${this.props.distance} from you`) : this.props.helpID ? "Your request, someone is helping" : "Your request, looking for helpers" } // gnarliest of ternary strings *shrugs shoulders* hey, it works.
                        subtitleStyle ={{ float: 'right', marginLeft: 20 }}
                        actAsExpander = {true}
                        showExpandableButton = {true}
                    />
                    <CardText expandable = {true} >
                        <p style={{marginBottom: 15, lineHeight: 1.2, textAlign: 'left', fontSize: 15 }}>
                            Description: {this.props.description}</p>
                        <br/>
                        <p style={{ marginBottom: 8, fontSize: 18, fontWeight: 300}}>Distance from you: {this.props.distance}</p>
                    <CardActions>
                        <Link to={`/viewrequest/${this.props.requestID}`} >
                            <RaisedButton label="View Details" primary={true} />
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
        margin: 10
    },

    CardHeader: {
        display: 'inline',
    }


}

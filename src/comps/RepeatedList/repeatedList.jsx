import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardTitle, CardActions} from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import { Link } from 'react-router-dom'


class RepeatedRequest extends Component {
    render() {
        return (
            <div>
                <Card>
                    <CardHeader 
                        className = 'repeated-request'
                        title = {this.props.category}
                        subtitle = {this.props.username}
                        actAsExpander = {true}
                        showExpandableButton = {true}
                    />
                    <CardText expandable = {true} >
                        {this.props.description}
                        <CardActions>
                            <Link to ={`/request/${this.props.requestID}`} >
                                <RaisedButton label = "View Details" primary ={true}/>
                            </Link>
                        </CardActions>
                    </CardText>
                </Card>
                    
            </div>
        );
    }
}

export default RepeatedRequest;
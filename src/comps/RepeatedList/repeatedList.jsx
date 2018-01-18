import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardTitle, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

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
                        <FlatButton label = "View Details"/>
                        <FlatButton/>
                    </CardActions>
                    </CardText>
                </Card>
                    
            </div>
        );
    }
}

  
export default RepeatedRequest
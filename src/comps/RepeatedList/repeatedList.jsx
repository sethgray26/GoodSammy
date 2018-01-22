import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardTitle, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'


class RepeatedRequest extends Component {
    render() {
        return (
            <div>
                <Card style = {style.card}>
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
                        <RaisedButton primary = {true} label = "View Details"/>
                        {/*<RaisedButton/>*/}
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


}
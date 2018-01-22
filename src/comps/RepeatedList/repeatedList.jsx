import React, { Component } from 'react';
import {Card, CardHeader, CardText, CardTitle, CardActions} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import {Link} from 'react-router-dom'

class RepeatedRequest extends Component {

    componentWillReceiveProps(nextprops){
        console.log('props',nextprops)
    }


    render() {
        return (
            <div>
                <Card style = {style.card}>
                    <CardHeader 
                        className = 'repeated-request'
                        title = {this.props.category.toUpperCase() }
                        titleStyle = {{ float: 'left' }}
                        subtitle = {`${this.props.distance} from you`}
                        subtitleStyle ={{ float: 'right', marginLeft: 20 }}
                        actAsExpander = {true}
                        showExpandableButton = {true}
                    />
                    <CardText expandable = {true} >
                        <p style={{marginBottom: 15, lineHeight: 1.2, textAlign: 'left', fontSize: 15 }}>
                            Desc: {this.props.description}</p>
                        <br/>
                        <p style={{ marginBottom: 8, fontSize: 18, fontWeight: 300}}>Disance from you: {this.props.distance}</p>
                    <CardActions>
                        <Link to='/reqDetail'><RaisedButton primary = {true} label = "View Details"/></Link>
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

    CardHeader: {
        display: 'inline',
    }


}

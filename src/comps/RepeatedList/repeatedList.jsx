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
            },
            subtitleString: ''
        }
    }
    componentDidMount(){
        // get username for creator and helper from this.props.userNames
        

    }

    componentWillReceiveProps(nextprops){
        // console.log('props',nextprops)
        // has usernames array on this.props.userNames
        let helperName=null
        let creatorName=null
        nextprops.userNames.map(item=>{
            if(item.id===this.props.creatorID){
                creatorName=item.username
            } else if (item.id===this.props.helpID){
                helperName=item.username
            }
        })
        console.log('helperName, creatorName: ',helperName, creatorName)
        let subtitleString = `${this.props.distance} from You. Creator: ${creatorName}`
        if (helperName) subtitleString+=` | Helper: ${helperName}`;
        this.setState({subtitleString:subtitleString})
    }


    render() {
        return (
            <div>
                <Card style = {style.card}>
                    <CardHeader 
                        className = 'repeated-request'
                        title = {this.props.category.toUpperCase() }
                        titleStyle = {{ float: 'left' }}
                        subtitle = {this.state.subtitleString}// here we want to display names instead of id's
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

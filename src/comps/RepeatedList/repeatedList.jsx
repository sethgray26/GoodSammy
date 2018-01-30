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
    componentDidMount(){
        // get username for creator and helper from this.props.userNames
        let helperName=null
        let creatorName=null
        this.props.userNames.map(item=>{
            if(item.id===this.props.creatorID){
                creatorName=item.username
            } else if (item.id===this.props.helpID){
                creatorName=item.username
            }
        })
        this.setState({
            username:{
                creator:[creatorName],
                helper:[helperName]
            }
        })

    }

    componentWillReceiveProps(nextprops){
        // console.log('props',nextprops)
        // has usernames array on this.props.userNames
    }


    render() {
        return (
            <div>
                <Card style = {style.card}>
                    <CardHeader 
                        className = 'repeated-request'
                        title = {this.props.category.toUpperCase() }
                        titleStyle = {{ float: 'left' }}
                        subtitle = {`${this.props.distance} from you. Creator: ${this.state.username.creator} | Helper: ${this.state.username.helper}`} // here we want to display names instead of id's
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
                        <Link to={`/request/${this.props.requestID}`} >
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

import React, { Component } from 'react';

class RepeatedRequest extends Component {
    render() {
        return (
            <div>
               {this.props.username} needs help {this.props.distance} away! 
                <p>
                {this.props.description} 
                {/* {this.props.description} is the toggled portion. Will add in accordion shortly */}
                </p>
            </div>
        );
    }
}

export default RepeatedRequest;
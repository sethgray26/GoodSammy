import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

export default class ConfirmDialog extends React.Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        // reroute to requestList 
        this.setState({open:false})
    }


render() {
    const actions = [
        <FlatButton
            label="Cancel"
            primary={true}
            onClick={this.handleClose}
        />,
        <FlatButton
            label="Submit"
            primary={true}
            keyboardFocused={true}
            onClick={this.handleClose}
        />
    ];

    return ( 
        <div>
            <RaisedButton label="Dialog" onClick={this.handleOpen} />
            <Dialog
                title="Confirmation Dialog"
                actions={actions}
                modal={false}
                open={this.state.open}
                onRequestClose={this.handleClose}
            >
                Request submitted! Hang in there!
            </Dialog>
        </div>
    );
}
}
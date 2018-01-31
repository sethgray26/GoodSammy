import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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
            label="Confirm"
            primary={true}
            keyboardFocused={true}
            onClick={this.props.toggleDialog}
        />
    ];

    return ( 
        <div>
            <Dialog
                title="Confirmation Dialog"
                actions={actions}
                modal={false}
                open={this.props.open}
                onRequestClose={this.props.toggleDialog}
            >
                Request submitted! Hang in there!
            </Dialog>
        </div>
    );
}
}
            
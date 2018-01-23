// message.jsx
import React, { Component, propTypes } from 'react';
import { scrolled } from 'react-stay-scrolled';
import PropTypes from 'prop-types';
 
class Message extends Component {
  static propTypes = {
    stayScrolled: PropTypes.func,
    scrollBottom: PropTypes.func,
  }
 
  componentDidMount() {
    const { stayScrolled, scrollBottom } = this.props;
 
    // Make the parent StayScrolled component scroll down if it was already scrolled
    stayScrolled();
 
    // Make the parent StayScrolled component scroll down, even if not completely scrolled down
    // scrollBottom();
  }
 
  render() {
    return (<div>{this.props.text}</div>);
  }
}
 
export default scrolled(Message);


// <div style={{ color: "gray", fontSize: ".8em" }}>user 1 | timestamp</div><br />
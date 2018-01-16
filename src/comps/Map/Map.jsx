import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { setLocation } from '../../ducks/reducers/maps';
import { connect } from 'react-redux';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      lat: '',
      lng: '',
      isMarkerShown: false,
    }
  }


  componentDidMount() {
    if (navigator.geolocation) {
      console.log('supported in browser')
      navigator.geolocation.getCurrentPosition((position) => {
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        console.log('lat', position.coords.latitude)
        console.log('lng', position.coords.longitude)
        console.log(this)
        this.props.setLocation(lat,lng)
      })
    }
    else {
      console.log('not supported in browser')
    }
    this.delayedShowMarker()
  }

  componentWillReceiveProps(nextprops){
    console.log('next props',nextprops)
    let newState = {}
    newState['lat'] = Number(nextprops.lat)
    newState['lng'] = Number(nextprops.lng)
    this.setState(newState)
    console.log('new State', newState)
  }

  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker()
  }

  render() {

    const MyMapComponent = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `400px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.state.lat, lng: this.state.lng}}
      >
        {props.isMarkerShown && <Marker position={{ lat: this.state.lat, lng: this.state.lng }} onClick={props.onMarkerClick} />}
      </GoogleMap>
      )

    return (
      <div className="Map">
      <h1>lat: {this.state.lat}</h1>
      <h1>lng: {this.state.lng}</h1>
        <MyMapComponent
          isMarkerShown={this.state.isMarkerShown}
          onMarkerClick={this.handleMarkerClick}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('mapped:', state)
  return {
      lat: state.maps.lat,
      lng: state.maps.lng
  };
}

export default connect(mapStateToProps, { setLocation })(Map)


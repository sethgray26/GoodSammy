import React, { Component } from 'react';
import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
// import { setLocation } from '../../ducks/reducers/maps';
// import { connect } from 'react-redux';

class Map extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isMarkerShown: false,
    }
  }

  componentDidMount() {
    this.delayedShowMarker()
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
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyCIIg2weQK6p4wUTy6nXrCj4-hPGgA40xI&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: `100%` }} />,
        containerElement: <div style={{ height: `250px` }} />,
        mapElement: <div style={{ height: `100%` }} />,
      }),
      withScriptjs,
      withGoogleMap
    )((props) =>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
      >
        {props.isMarkerShown && <Marker position={{ lat: this.props.lat, lng: this.props.lng }} onClick={props.onMarkerClick} />}
      </GoogleMap>
      )

    return (

      <div className="Map">
        {this.props.lat && this.props.lng ?
          <div>
            <MyMapComponent
              isMarkerShown={this.state.isMarkerShown}
              onMarkerClick={this.handleMarkerClick}
            />
          </div>
          :
          <div> No position available </div>}
      </div>
    );
  }
}

export default Map
import React, {Component} from 'react';
import {View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import GeoLocation from 'react-native-geolocation-service';
import {CommonStyles} from '../../../app-theme';

class Location extends Component{
  constructor(props){
    super(props);
    this.state = {
      indian_region:{
        latitude: 21.7679,
        longitude: 78.8718,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    };
  }
  componentDidMount(){
    console.log('FETCHING');
    // GeoLocation.getCurrentPosition(
    //   position => {
    //     console.log('POSITION :', position);
    //   },
    //   error => {
    //     Alert.alert(error.message.toString());
    //   },
    //   {
    //     showLocationDialog: true,
    //     enableHighAccuracy: true,
    //     timeout: 20000,
    //     maximumAge: 0
    //   }
    // );
  }
  render(){
    return(
      <View style={CommonStyles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion = {this.state.indian_region}
          showsUserLocation={true}
          zoomEnabled={true}
        >
          <Marker coordinate={this.state.indian_region} />
        </MapView>
      </View>
    )
  }
};

export default Location;
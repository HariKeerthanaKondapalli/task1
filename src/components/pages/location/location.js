import React, {Component} from 'react';
import {ToastAndroid, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

import {CommonStyles, Colors} from '../../../app-theme';

class Location extends Component{
  constructor(props){
    super(props);
    this.handleUserLocation = this.handleUserLocation.bind(this);
    this.state = {
      initial_region:{
        latitude: 21.7679,
        longitude: 78.8718,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      current_region:{
        latitude: 21.7679,
        longitude: 78.8718,
      },
    };
  }
  componentDidMount(){
    this.handleUserLocation();
  }
  handleUserLocation(){
    Geolocation.getCurrentPosition(pos =>{
      this.map.animateToRegion({
        ...this.state.initial_region,
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude
      },2000);
      this.setState({
        current_region:{
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        }
      });
    },
    err => {
      ToastAndroid.show('Unable to identify the location', ToastAndroid.SHORT);
    });
  }
  render(){
    return(
      <View style={CommonStyles.container}>
        <MapView
          ref = {ref => this.map = ref}
          provider={PROVIDER_GOOGLE}
          style={{flex: 1}}
          initialRegion = {this.state.initial_region}
          showsUserLocation={true}
          zoomEnabled={true}
        >
          <Marker pinColor={Colors.active} coordinate={this.state.current_region} />
        </MapView>
      </View>
    )
  }
};

export default Location;
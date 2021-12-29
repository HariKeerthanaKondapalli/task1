import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { CommonStyles, Colors } from '../../../app-theme';

class Camera extends Component{
  render(){
    return(
      <View style={CommonStyles.container}>
        <Text style={{color:Colors.textColor}}>In Camera Screen</Text>
      </View>
    )
  }
};

export default Camera;
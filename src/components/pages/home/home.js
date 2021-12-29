import React, {Component} from 'react';
import {View, Text} from 'react-native';
import { Colors, CommonStyles } from '../../../app-theme';

class Home extends Component{
  render(){
    return(
      <View style={CommonStyles.container}>
        <Text style={{color:Colors.textColor}}>In Home Screen</Text>
      </View>
    );
  }
};

export default Home;
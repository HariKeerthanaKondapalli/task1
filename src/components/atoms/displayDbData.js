import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { Colors } from '../../app-theme';

class DisplayDbData extends Component{
  render(){
    return(
      <View style={[Styles.itemView, {backgroundColor:this.props.color}]}>
        <Text style={Styles.text}>{this.props.user.name}</Text>
        <Text style={Styles.text}>{this.props.user.username}</Text>
        <Text style={Styles.text}>{this.props.user.website}</Text>
      </View>
    )
  }
};

const Styles = StyleSheet.create({
  itemView: {
    flexDirection:'row',
    padding:'2%'
  },
  text: {
    flex:1,
    fontSize: 15,
    fontWeight: '500',
    textAlign:'center',
    alignSelf:'center',
    color: Colors.textColor,
  }
});

export default DisplayDbData;
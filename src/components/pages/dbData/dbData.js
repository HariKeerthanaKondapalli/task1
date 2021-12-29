import React, {Component} from 'react';
import {View, Text, ActivityIndicator, ScrollView, StyleSheet, ToastAndroid} from 'react-native';

import DisplayDbData from '../../atoms/displayDbData';
import http from '../../../http-common';
import {Colors, CommonStyles} from '../../../app-theme';

class DbData extends Component{
  constructor(props){
    super(props);
    this.state={
      data : [],
      isLoading: true,
    }
  }
  async componentDidMount(){
    http.get('/users')
    .then((response) => {
      if(response && response.data) {
        this.setState({data: response.data});
      }
      this.setState({isLoading: false});
    })
    .catch((error) => {
      this.setState({isLoading: false});
      ToastAndroid.show(error.toString(), ToastAndroid.SHORT);
    })
  }
  render(){
    return(
      <ScrollView style={CommonStyles.container}>
        {this.state.isLoading && <ActivityIndicator size={30} color={Colors.active} />}
        {!this.state.isLoading && (
          this.state.data.length !== 0 ? (
            <>
              <View style={[Styles.itemView, {backgroundColor:this.props.color}]}>
                <Text style={Styles.text}>Name</Text>
                <Text style={Styles.text}>User Name</Text>
                <Text style={Styles.text}>WebSite</Text>
              </View>
              {this.state.data.map((user,i)=>(
                <DisplayDbData user={user} key={i} color={i%2 !== 0 ? Colors.active: 'white'}/>
              ))}
            </>
          ) : (
            <Text>No Data</Text>
          )
        )}
      </ScrollView>
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
    fontSize: 20,
    fontWeight: '500',
    textAlign:'center',
    alignSelf:'center',
    color: Colors.textColor,
  }
});
export default DbData;
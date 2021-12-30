import React, {Component} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  RefreshControl
} from 'react-native';

import DisplayDbData from '../../atoms/displayDbData';
import http from '../../../http-common';
import {Colors, CommonStyles} from '../../../app-theme';

class DbData extends Component{
  constructor(props){
    super(props);
    this.refresh = this.refresh.bind(this);
    this.state={
      data : [],
      isLoading: true,
    }
  }
  componentDidMount(){
    this.refresh();
  }
  refresh(){
    this.setState({isLoading: true});
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
    });
  }
  render(){
    return(
      <ScrollView 
        style={CommonStyles.container} 
        refreshControl={
          <RefreshControl refreshing={this.state.isLoading} onRefresh={this.refresh}/>
        }>
        {!this.state.isLoading && (
          this.state.data.length !== 0 ? (
            <>
              <View style={[Styles.itemView, {backgroundColor: this.props.color}]}>
                <Text style={Styles.text}>Name</Text>
                <Text style={Styles.text}>User Name</Text>
                <Text style={Styles.text}>WebSite</Text>
              </View>
              {this.state.data.map((user,i)=>(
                <DisplayDbData user={user} key={i} color={i%2 !== 0 ? Colors.active: 'white'}/>
              ))}
            </>
          ) : (
            <Text style={Styles.text}>No Data</Text>
          )
        )}
      </ScrollView>
    )
  }
};

const Styles = StyleSheet.create({
  itemView: {
    flexDirection: 'row',
    padding: '2%'
  },
  text: {
    flex: 1,
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    alignSelf: 'center',
    color: Colors.textColor,
  }
});
export default DbData;
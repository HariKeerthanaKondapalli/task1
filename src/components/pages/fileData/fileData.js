import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ScrollView, ToastAndroid, Alert, RefreshControl} from 'react-native';
import RNFS from 'react-native-fs';

import {CommonStyles, Colors} from '../../../app-theme';
import Data from './md_data.json';

class FileData extends Component{
  constructor(props){
    super(props);
    this.saveToStorage = this.saveToStorage.bind(this);
    this.fetchFromStorage = this.fetchFromStorage.bind(this);
    this.refresh = this.refresh.bind(this);
    this.state = {saved: false, dataFromFile: [], loading: false};
  }
  saveToStorage(){
    RNFS.exists(`${RNFS.DownloadDirectoryPath}/md_data1.json`)
    .then((result)=>{
      if(!result){
        RNFS.writeFile(`${RNFS.DownloadDirectoryPath}/md_data1.json`,JSON.stringify(Data),'utf8')
        .then((success)=>{
          Alert.alert('Saved','Saved Successfully in Downloads',
          [{
            text: 'OK',
            onPress: () =>{this.setState({saved: true});}
          }],
          {cancelable: false}
          );
        })
        .catch((error)=>{
          Alert.alert('Failed','Failed to save',
          [{
            text: 'OK',
            onPress: () => {this.setState({saved: false});}
          }],
          {cancelable: false}
          );
        });
      }
      else{
        Alert.alert('Saved', 'File Already Exists',
        [{
          text:'OK', onPress: ()=> {this.setState({saved: true})}
        }],
        {cancelable: false});
      }
    })
    .catch((error)=>{
      ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
    });
  }
  fetchFromStorage(){
    RNFS.exists(`${RNFS.DownloadDirectoryPath}/md_data1.json`)
    .then((result)=>{
      if(result){
        this.setState({loading: true});
        RNFS.readFile(`${RNFS.DownloadDirectoryPath}/md_data1.json`,'utf8')
        .then((content)=>{
          var data = JSON.parse(content);
          this.setState({dataFromFile: data, loading: false});
        })
        .catch((error)=>{
          Alert.alert('Failed','Failed to read file',
          [{
            text: 'OK',
            onPress: () => {this.setState({dataFromFile: [], loading: false});}
          }],
          {cancelable: false}
          );
        });
      }
      else{
        Alert.alert('No File', "File doesn't exists",
        [{
          text:'OK', onPress: ()=> {this.setState({saved: false, dataFromFile: []})}
        }],
        {cancelable: false});
      }
    })
    .catch((error)=>{
      ToastAndroid.show(error.toString(),ToastAndroid.SHORT);
    });
  }
  refresh(){
    this.setState({loading: true});
    if(this.state.saved === true){
      this.fetchFromStorage();
    }
    else{
      this.setState({loading: false});
    }
  }
  render(){
    var fileData = this.state.dataFromFile;
    return(
      <ScrollView contentContainerStyle={[CommonStyles.container,{flexDirection:'column'}]}>
        <ScrollView style={{flex: 1}}
          refreshControl={
          <RefreshControl refreshing={this.state.loading} onRefresh={this.refresh}/>
        }>
          {fileData.length > 0 ? fileData.map((item,i)=>(
            <View key={i} style={Styles.itemView}>
              <Text style={Styles.itemText}>{item.title}</Text>
            </View>)
          ) : (
            <Text style={Styles.text}>No Data</Text>
          )}
        </ScrollView>
        <View style={Styles.buttonsView}>
          <TouchableOpacity activeOpacity={0.5} onPress={this.saveToStorage}>
            <View style={[Styles.buttonView]}>
              <Text style={Styles.buttonText}>Save To Storage</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} onPress={this.fetchFromStorage} disabled={!this.state.saved}>
            <View style={[Styles.buttonView, {opacity: !this.state.saved? 0.4 : 1 }]}>
              <Text style={Styles.buttonText}>Fetch from Storage</Text>
            </View>
          </TouchableOpacity>
        </View> 
      </ScrollView>
    )
  }
};

const Styles = StyleSheet.create({
  itemView: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: '1%',
    margin: '1%',
  },
  itemText:{
    fontSize: 15,
    fontWeight: '400',
    color: Colors.textColor,
  },
  buttonsView: {
    flex: 1,
    flexDirection: 'row',
    padding: '2%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    maxHeight: 80, 
  },
  buttonView:{
    backgroundColor: Colors.inactive,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: '2%',
  },
  buttonText:{ 
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    padding: '5%',
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
export default FileData;
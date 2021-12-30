import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {RNCamera} from 'react-native-camera';

import { CommonStyles, Colors } from '../../../app-theme';

class Camera extends Component{
  constructor(props){
    super(props);
    this.takePicture = this.takePicture.bind(this);
    this.showCamera = this.showCamera.bind(this);
    this.state = {picture: null, showCamera: true}
  }
  showCamera(){
    this.setState({
      showCamera:true,
    })
  };
  async takePicture(){
    if (this.camera) {
      const options = { quality: 1, base64: true, fixOrientation: true, 
        exif: true, mirrorImage: true};
      await this.camera.takePictureAsync(options).then(photo => {
          photo.exif.Orientation = 1;   
          this.setState({
            picture: photo,
            showCamera: false,
          })
      });
    }
  }
  render(){
    return(
      <View style={[CommonStyles.container,{flexDirection:'column'}]}>
        {this.state.showCamera && (
          <>
          <RNCamera 
            type='front'
            ref={ref => {
              this.camera = ref;
            }}
            captureAudio={false}
            style={{flex: 1}}
          />
          <TouchableOpacity activeOpacity={0.8} onPress={this.takePicture}>
            <View style={{alignContent:'center',alignItems:'center', justifyContent:'center'}}>
              <Text style={Styles.buttonText}>CAPTURE</Text>
            </View>
          </TouchableOpacity>
          </>
        )}
        {!this.state.showCamera && (
          <>
          <Image source={this.state.picture} style={{flex:1,width:'100%'}} />
          <TouchableOpacity activeOpacity={0.8} onPress={this.showCamera}>
            <View style={{alignContent:'center',alignItems:'center', justifyContent:'center'}}>
              <Text style={Styles.buttonText}>BACK TO CAMERA</Text>
            </View>
          </TouchableOpacity>
          </>
        )}
      </View>
    )
  }
};

const Styles = StyleSheet.create({
  buttonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: '500',
    padding: '3%',
    borderRadius: 10,
    backgroundColor: Colors.inactive,
  }
});
export default Camera;
import React, {Component} from 'react';
import {View, Text, ImageBackground, Image, ScrollView, StyleSheet, Dimensions} from 'react-native';

import {CommonStyles, Colors} from '../../../app-theme';
import {home, wear_mask, wash_hands, use_disinfectant, keep_distance, stay_home} from '../../../assets';

const { width: screenWidth } = Dimensions.get('window');
const images = [
  {Name: 'Wear Mask', src: wear_mask},
  {Name: 'Wash Hands', src: wash_hands},
  {Name: 'Use Disinfectant', src: use_disinfectant},
  {Name: 'Keep Distance', src: keep_distance},
  {Name: 'Stay Home', src: stay_home}
];

class Home extends Component{
  constructor(props){
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {activeIndex : 0};

  }
  onChange(e){
    const active = Math.round(
      e.nativeEvent.contentOffset.x / e.nativeEvent.layoutMeasurement.width
    );
    this.setState({activeIndex: active});
  }
  render(){
    return(
      <View style={CommonStyles.container}>
        <ImageBackground source={home} style={Styles.backgroundImage}>
          <ScrollView 
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={Styles.imagesView}
            onMomentumScrollEnd={this.onChange}
          >    
            {images.length > 0 && images.map((image,i)=>(
              <View key={i} style={[Styles.imageView, {marginStart: Math.round(10/(i+1))}]}>
                <Image source={image.src}/>
                <Text style={Styles.text}>{image.Name}</Text>
              </View>
            ))} 
          </ScrollView>
          <View style={Styles.dotsView}>
            {images.length>0 && images.map((k, i) => (
              <View
                key={i}
                style={[Styles.dot, {backgroundColor: i === this.state.activeIndex ? Colors.active : Colors.inactive}]}
              />
            ))}
          </View>
        </ImageBackground>
      </View>
    );
  }
};

const Styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
    height: '38%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imagesView:{
    alignItems: 'center', 
    marginTop: '45%',
    alignContent: 'center',
    justifyContent: 'center'
  },
  imageView:{
    flex: 1,
    width: screenWidth,
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 20,
    fontWeight: '500',
    textAlign: 'center',
    color: Colors.textColor,
    margin:'2%'
  },
  dotsView:{
    flexDirection:'row'
  },
  dot:{
    height: 10,
    width: 10,
    margin: 8,
    borderRadius: 6,
  },
});
export default Home;
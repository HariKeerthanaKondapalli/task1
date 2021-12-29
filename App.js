import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import {Home, Camera, Location, FileData, DbData} from './src/components/pages';
import {Colors, Screens} from './src/app-theme';

const Tab = createBottomTabNavigator();

class App extends Component{
  render(){
    return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName={Screens.Home}>
          <Tab.Screen name={Screens.Home} component={Home}
            options={navigationOptions={tabBarLabel:'', tabBarIcon: (tabInfo) => (<Entypo name="home" size={25} color={tabInfo.focused ? Colors.active : Colors.inactive}/>)}}
          />
          <Tab.Screen name={Screens.Camera} component={Camera}
            options={navigationOptions={tabBarLabel:'', tabBarIcon: (tabInfo) => (<Entypo name="camera" size={25} color={tabInfo.focused ? Colors.active : Colors.inactive}/>)}}
          />
          <Tab.Screen name={Screens.Location} component={Location}
            options={navigationOptions={tabBarLabel:'', tabBarIcon: (tabInfo) => (<Entypo name="location" size={25} color={tabInfo.focused ? Colors.active : Colors.inactive}/>)}}
          />
          <Tab.Screen name={Screens.FileData} component={FileData}
            options={navigationOptions={tabBarLabel:'', tabBarIcon: (tabInfo) => (<FontAwesome name="file" size={25} color={tabInfo.focused ? Colors.active : Colors.inactive}/>)}}
          />
          <Tab.Screen name={Screens.DbData} component={DbData}
            options={navigationOptions={tabBarLabel:'', tabBarIcon: (tabInfo) => (<Entypo name="database" size={25} color={tabInfo.focused ? Colors.active : Colors.inactive}/>)}}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;
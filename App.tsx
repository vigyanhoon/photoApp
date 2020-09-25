import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import Home from './views/Home'

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CameraView from './views/CameraView';
import GalleryView from './views/GalleryView';
import ImageView from './views/ImageView';

const Stack = createStackNavigator();

const App: () => React.ReactNode = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Camera" component={CameraView} />
          <Stack.Screen name="Gallery" component={GalleryView} />
          <Stack.Screen name="Image" component={ImageView} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;

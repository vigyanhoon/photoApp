import React from 'react';
import {
  StyleSheet,
} from 'react-native';

import { Provider } from 'react-redux'
import { store } from './reducers/store';

import Home from './views/Home'
import CameraView from './views/CameraView';
import GalleryView from './views/GalleryView';
import ImageView from './views/ImageView';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


const Stack = createStackNavigator();

const App: () => React.ReactNode = () => {
  return (
    <>
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Camera" component={CameraView} />
            <Stack.Screen name="Gallery" component={GalleryView} />
            <Stack.Screen name="Image" component={ImageView} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
});

export default App;

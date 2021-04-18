import React from 'react';

import { Provider } from 'react-redux';
import { store } from './src/reducers/store';

import Home from './src/views/Home';
import CameraView from './src/views/CameraView';
import GalleryView from './src/views/GalleryView';
import ImageView from './src/views/ImageView';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createCameraFolder } from './src/common/FileUtils';
import StickerScreen from './src/views/StickerScreen';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { TakePictureResponse } from 'react-native-camera';

export type RootStackParamList = {
  Home: undefined;
  Camera: undefined;
  Sticker: { imageData: TakePictureResponse };
  Gallery: undefined;
  Image: { index: number };
};

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#347CFF',
    error: 'red',
  },
};

const Stack = createStackNavigator<RootStackParamList>();
createCameraFolder();

const App: () => React.ReactNode = () => {
  return (
    <>
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <NavigationContainer>
            <Stack.Navigator>
              <Stack.Screen
                options={{ headerShown: false }}
                name="Home"
                component={Home}
              />
              <Stack.Screen name="Camera" component={CameraView} />
              <Stack.Screen name="Sticker" component={StickerScreen} />
              <Stack.Screen name="Gallery" component={GalleryView} />
              <Stack.Screen name="Image" component={ImageView} />
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </>
  );
};

export default App;

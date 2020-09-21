import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';
import CameraView from './views/CameraView';

const App: () => React.ReactNode = () => {
  let cameraRef = React.useRef();

  const takePhoto = async () => {
    console.log('button pressed')
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      console.log(data.uri);
    }
  }

  const openGallery = () => {
    console.log('button pressed')
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView>
        <CameraView/>
        {/* <View style={styles.body}>
          <View style={styles.button}>
            <Button title='Take Photo' onPress={takePhoto}></Button>
          </View>
          <View style={styles.button}>
            <Button title='Open Gallery' onPress={openGallery}></Button>
          </View>
        </View> */}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    padding: 50
  },
  button: {
    margin: 10
  },
});

export default App;

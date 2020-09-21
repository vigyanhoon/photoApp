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
  const openGallery = () => {
    console.log('button pressed')
  }

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.body}>
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
    flex: 1
  },
  button: {
    margin: 10
  },
});

export default App;

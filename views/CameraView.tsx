import React, { PureComponent } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
} from 'react-native';
import { RNCamera } from 'react-native-camera';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      backgroundColor: 'red',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <Text style={{color:'red'}}>Waiting</Text>
  </View>
);

class CameraView extends PureComponent {
  camera: any;
  constructor(props) {
    super(props)
  }

  takePicture = async function (camera) {
    try {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      console.log(data.uri);
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    return (
      <View style={styles.root}>
        <Text>sdaf</Text>
        <RNCamera
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {({ camera, status }) => {
            if (status !== 'READY') return <PendingView />;
            return (
              <View style={styles.button}>
                <Button title='SNAP' onPress={() => this.takePicture(camera)}></Button>
              </View>
            );
          }}
        </RNCamera>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#abc',
    flex: 1,
    height: 500
  },
  button: {
    flex: 1,
    backgroundColor: 'red',
    height: 100,
    width: 500
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});

export default CameraView;

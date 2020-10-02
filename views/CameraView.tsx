import React from 'react';
import { ImageDetail } from '../common/Interfaces'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useDispatch } from 'react-redux'
import { saveImage } from '../reducers/imageSlice';

const PendingView = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
    <Text style={{ color: 'red' }}>Waiting</Text>
  </View>
);

const CameraView = () => {
  const dispatch = useDispatch()
  
  const takePicture = async function (camera: RNCamera) {
    try {
      const options = { quality: 0.5, base64: true };
      const data = await camera.takePictureAsync(options);
      const detail: ImageDetail = {
        path: data.uri,
        name: 'imagename'
      }
      dispatch(saveImage(detail))
    }
    catch (e) {
      console.log(e)
    }
  };

  return (
    <View style={styles.root}>
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
              <TouchableOpacity onPress={() => takePicture(camera)} style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  button: {
    flex: 0,
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

import React, { useRef, useState } from 'react';
import { ImageDetail } from '../common/Interfaces'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import { RNCamera } from 'react-native-camera';

import { useDispatch, useSelector } from 'react-redux'
import { saveImage } from '../reducers/imageSlice';
import { RootState } from '../reducers/rootReducer';
import InputModal from './InputModal';

const PendingView = () => (
  <View style={styles.pending}>
    <Text style={{ color: 'red' }}>Waiting</Text>
  </View>
);

const CameraView = () => {
  const dispatch = useDispatch()
  const { allImages } = useSelector((state: RootState) => state.images)
  const [showPopup, setShowPopup] = useState(false)
  const [imageName, setImageName] = useState('')
  const data = useRef(null)

  const takePicture = async function (camera: RNCamera) {
    const options = { quality: 0.5, base64: true };
    const imageData = await camera.takePictureAsync(options);
    data.current = imageData
    setShowPopup(true)
  };

  const storeImage = ()=> {
    const detail: ImageDetail = {
      path: data.current.uri,
      name: imageName
    }
    dispatch(saveImage(detail))
  }

  return (
    <View style={styles.root}>
      {showPopup && <InputModal {...{ imageName, setImageName, showPopup, setShowPopup, storeImage, allImages }} />}
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
        }}>
        {({ camera, status }) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={styles.snapButton}>
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
  snapButton: {
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
  pending: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default CameraView;

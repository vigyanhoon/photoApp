import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { RootStackParamList } from '../../App';

const PendingView = () => (
  <View style={styles.pending}>
    <Text style={{ color: 'red' }}>Waiting</Text>
  </View>
);

type NavigationProp = StackNavigationProp<RootStackParamList, 'Camera'>;

interface Props {
  navigation: NavigationProp;
}

const CameraView = ({ navigation }: Props): JSX.Element => {
  const takePicture = async function (camera: RNCamera) {
    const options = { quality: 0.5, base64: true };
    const imageData = await camera.takePictureAsync(options);
    navigation.navigate('Sticker', { url: imageData.uri });
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
        }}>
        {({ camera, status }) => {
          if (status !== 'READY') return <PendingView />;
          return (
            <View style={styles.snapButton}>
              <TouchableOpacity
                onPress={() => takePicture(camera)}
                style={styles.capture}>
                <Text style={{ fontSize: 14 }}> SNAP </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  snapButton: {
    flex: 0,
    height: 100,
    width: 500,
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
  },
});

export default CameraView;

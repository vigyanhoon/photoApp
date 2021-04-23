import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  ImagePickerResponse,
  launchImageLibrary,
} from 'react-native-image-picker';
import { RootStackParamList } from '../../App';
import { copyFileToApp } from '../common/FileUtils';
import { getPermissions } from '../common/Utils';

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: NavigationProp;
}

const Home = ({ navigation }: Props): JSX.Element => {
  const openGallery = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    launchImageLibrary({}, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.uri) {
        // noinspection JSIgnoredPromiseFromCall
        copyImage(response.uri);
      }
    });
  };

  getPermissions();

  const copyImage = async (path: string) => {
    const savedPath = await copyFileToApp(path);
    navigation.navigate('Sticker', { url: savedPath });
  };

  const openCamera = () => {
    // const data = {
    //   deviceOrientation: 1,
    //   height: 3024,
    //   pictureOrientation: 1,
    //   uri:
    //     'file:///data/user/0/com.photoapp/cache/Camera/da14a95a-8207-4e4e-a194-79cb159df394.jpg',
    //   width: 4032,
    // };
    // navigation.navigate('Sticker', { imageData: data });
    navigation.navigate('Camera');
  };

  const openSaved = () => {
    navigation.navigate('Gallery');
  };

  return (
    <>
      <View style={styles.body}>
        <TouchableOpacity style={styles.button} onPress={openGallery}>
          <Text style={styles.buttonText}>Take From Gallery</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openCamera}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openSaved}>
          <Text style={styles.buttonText}>Open Saved Photos</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    margin: 10,
    backgroundColor: 'orange',
    width: 300,
    height: 100,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {},
});

export default Home;

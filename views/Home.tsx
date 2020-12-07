import { StackNavigationProp } from '@react-navigation/stack';
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ImagePicker from 'react-native-image-picker';
import { RootStackParamList } from '../App';
import { copyFileToApp } from '../common/FileUtils';;

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface Props {
  navigation: NavigationProp
}

const Home = ({ navigation }: Props) => {
  const openGallery = () => {
    ImagePicker.launchImageLibrary({}, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        copyImage(response.path)
      }
    });
  }

  const copyImage = async (path: string) => {
    const savedPath = await copyFileToApp(path)
    navigation.navigate('Input', { url: savedPath })
  }

  const openCamera = () => {
    navigation.navigate('Camera')
  }

  const openSaved = () => {
    navigation.navigate('Gallery')
  }

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
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  button: {
    margin: 10,
    backgroundColor: 'orange',
    width: 300,
    height: 100,
    borderColor: 'grey',
    borderRadius: 20,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: 'center'
  },
  buttonText: {

  }
});

export default Home
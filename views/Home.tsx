import React from 'react';
import {
  StyleSheet,
  View,
  Button,
} from 'react-native';

const Home = ({navigation}) => {
  const openGallery = () => {
    console.log('gallery pressed')
    navigation.navigate('Gallery')
  }

  const openCamera = () => {
    console.log('camera pressed')
    navigation.navigate('Camera')
  }

  return (
    <>
      <View style={styles.body}>
        <View style={styles.button}>
          <Button title='Take Photo' onPress={openCamera}></Button>
        </View>
        <View style={styles.button}>
          <Button title='Open Gallery' onPress={openGallery}></Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1
  },
  button: {
    margin: 10
  },
});

export default Home
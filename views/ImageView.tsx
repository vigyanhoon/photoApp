import React from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

var RNFS = require('react-native-fs');

const ImageView = ({ route: { params: { path } } }) => {

  // RNFS.readDir(imagePath)
  //   .then((result: { path: any; }[]) => {
  //     console.log('GOT RESULT', result);
  //     setImages(result)
  //   })
  //   .catch((err: { message: any; code: any; }) => {
  //     console.log(err.message, err.code);
  //   });
  console.log('route image path is ' + path)

  return (
    <>
      <View style={styles.body}>
        <Image style={styles.image} source={{ uri: path }} />
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
  },
  image: {
    flex: 1,
  },
});

export default ImageView
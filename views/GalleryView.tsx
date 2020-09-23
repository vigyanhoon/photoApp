import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity
} from 'react-native';

var RNFS = require('react-native-fs');

import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const thumbWidth = (windowWidth) / 3 - 3 * 10

const imagePath = 'data/user/0/com.photoapp/cache/Camera/'

const GalleryView = () => {
  const [images, setImages] = useState([])

  useEffect(() => {
    RNFS.readDir(imagePath)
      .then((result: { path: any; }[]) => {
        console.log('GOT RESULT', result);
        setImages(result)
      })
      .catch((err: { message: any; code: any; }) => {
        console.log(err.message, err.code);
      });
  }, [])

  return (
    <View style={styles.root}>
      {images.map((img, index) => {
        return <Image key={index}
          style={styles.thumb}
          source={{ uri: 'file:/' + imagePath + img.name }} />
      }
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'green',
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  thumb: {
    width: thumbWidth,
    height: thumbWidth,
    margin: 10
  },
})

export default GalleryView
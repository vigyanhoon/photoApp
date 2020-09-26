import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { Dimensions } from 'react-native';
import { getFilePaths } from '../common/ImageSaver';

const windowWidth = Dimensions.get('window').width;
const thumbWidth = (windowWidth) / 3 - 3 * 10

const GalleryView = ({ navigation }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshImages()
    });

    return unsubscribe;
  }, [navigation]);

  const refreshImages = () => {
    (async () => {
      const paths: string[] = await getFilePaths()
      console.log('fetched paths ' + paths.length)
        setImages(paths)
    })()
  }

  const openImageView = (index: number) => {
    console.log('image pressed ' + index)
    const path = images[index]
    navigation.navigate('Image', { path })
  }

  return (
    <ScrollView>
    <View style={styles.root}>
      {images.map((img, index) => {
        return (
          <TouchableOpacity key={index} style={styles.image} onPress={openImageView.bind(this, index)}>
            <Image style={styles.thumb} source={{ uri: img }} />
          </TouchableOpacity>
        )
      })}
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  thumb: {
    width: thumbWidth,
    height: thumbWidth,
    margin: 10,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 2
  },
  image: {

  }
})

export default GalleryView
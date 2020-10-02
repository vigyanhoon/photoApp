import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity
} from 'react-native';

import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { getImages } from '../reducers/imageSlice';

const windowWidth = Dimensions.get('window').width;
const thumbWidth = (windowWidth) / 3 - 3 * 10

const GalleryView = ({ navigation }) => {
  const { allImages } = useSelector((state: RootState) => state.images)
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshImages()
    });

    return unsubscribe;
  }, [navigation]);

  const refreshImages = () => {
    dispatch(getImages())
  }

  const openImageView = (index: number) => {
    const image = allImages[index]
    navigation.navigate('Image', { image })
  }

  return (
    <ScrollView>
      <View style={styles.root}>
        {allImages.map((img, index) => {
          return (
            <TouchableOpacity key={index} style={styles.image} onPress={openImageView.bind(this, index)}>
              <Image style={styles.thumb} source={{ uri: img.path }} />
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
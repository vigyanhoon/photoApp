import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Text, Button, TextInput
} from 'react-native';

import { Dimensions } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import { getImages } from '../reducers/imageSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

const windowWidth = Dimensions.get('window').width;
const thumbWidth = (windowWidth) / 3 - 3 * 10

type NavigationProp = StackNavigationProp<RootStackParamList, 'Gallery'>;

interface Props {
  navigation: NavigationProp
}

const GalleryView = ({ navigation }: Props) => {
  const { allImages } = useSelector((state: RootState) => state.images)
  const dispatch = useDispatch()
  const [filterText, setFilterText] = useState('')
  const [showFilterInput, toggleFilterInput] = useState(false)

  React.useLayoutEffect(() => {
    const filterButton = () => (
      <View style={styles.filterButton}>
        <Button color={'green'} onPress={toggleInput} title="Filter" />
      </View>
    )
    navigation.setOptions({
      headerRight: filterButton,
    });
  }, [navigation, showFilterInput, allImages]);

  const toggleInput = () => {
    toggleFilterInput(!showFilterInput)
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      refreshImages()
    });
    return unsubscribe;
  }, [navigation, showFilterInput, allImages]);

  const refreshImages = () => {
    dispatch(getImages())
  }

  const openImageView = (index: number) => {
    const image = allImages[index]
    navigation.navigate('Image', { image })
  }

  const onChangeText = (text: string) => {
    setFilterText(text)
  }

  const getFilteredImages = () => {
    let images = allImages.filter(img => img.name.includes(filterText))
    if (filterText === '') images = allImages
    return images
  }

  return (
    <ScrollView>
      {showFilterInput && <TextInput maxLength={20} style={styles.filterInput} onChangeText={text => onChangeText(text)} value={filterText} />}
      <View style={styles.root}>
        {getFilteredImages().map((img, index) => {
          return (
            <TouchableOpacity key={index} style={styles.image} onPress={openImageView.bind(this, index)}>
              <Image style={styles.thumb} source={{ uri: img.path }} />
              <Text>{img.name}</Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </ScrollView >
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
    marginHorizontal: 10,
    borderRadius: 20,
    borderColor: 'grey',
    borderWidth: 2
  },
  image: {
    alignItems: 'center',
    marginBottom: 20
  },
  filterButton: {
    marginRight: 20
  },
  filterInput: {
    height: 40,
    borderColor: 'green',
    borderWidth: 2,
    backgroundColor: 'white',
    borderRadius: 10,
    margin: 10,
    padding: 10,
  }
})

export default GalleryView
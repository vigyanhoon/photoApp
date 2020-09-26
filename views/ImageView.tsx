import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button
} from 'react-native'

import { deleteImage } from '../common/ImageSaver'

const ImageView = ({ navigation, route: { params: { path } } }) => {
  const deletePressed = () => {
    deleteImage(path)
  }

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={styles.deleteButton}>
          <Button color={'red'} onPress={deletePressed} title="Delete" />
        </View>
      ),
    });
  }, [navigation]);

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
  deleteButton: {
    marginRight: 20
  }
});

export default ImageView
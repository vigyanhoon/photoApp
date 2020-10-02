import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Button
} from 'react-native'
import { useDispatch } from 'react-redux';
import { removeImage } from '../reducers/imageSlice';

const ImageView = ({ navigation, route: { params: { image } } }) => {
  const dispatch = useDispatch()
  
  const deletePressed = () => {
    (async ()=>{
      await dispatch(removeImage(image))
      navigation.goBack()
    })()
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
        <Image style={styles.image} source={{ uri: image.path }} />
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
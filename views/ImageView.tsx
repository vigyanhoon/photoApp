import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { useDispatch } from 'react-redux';
import { removeImage } from '../reducers/imageSlice';

import Icon from 'react-native-vector-icons/Feather';
import Share from "react-native-share";
import { RootStackParamList } from '../App';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RouteProps = RouteProp<RootStackParamList, 'Image'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Image'>;

interface Props {
  route: RouteProps
  navigation: NavigationProp
}

const ImageView = ({ navigation, route: { params: { image } } }: Props) => {
  const dispatch = useDispatch()
  const [showMenu, setShowMenu] = useState(false)

  const deletePressed = () => {
    (async () => {
      await dispatch(removeImage(image))
      navigation.goBack()
    })()
  }

  const sharePressed = () => {
    const options = {
      title: 'Share title',
      message: image.name,
      url: image.path
    }
    console.log(options)
    Share.open(options)
      .then(() => { setShowMenu(false) })
      .catch((err) => { err && console.log(err); });
  }

  React.useLayoutEffect(() => {
    const headerRight = () => (
      <TouchableOpacity style={styles.moreButton} onPress={() => setShowMenu(isOpen => !isOpen)}>
        <Icon name="more-vertical" size={30} color="#000" />
      </TouchableOpacity>
    )
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation]);

  const Menu = () => {
    return <View style={styles.menuContainer}>
      <TouchableOpacity onPress={deletePressed}>
        <Text style={styles.menuItem}>Delete</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={sharePressed}>
        <Text style={styles.menuItem}>Share</Text>
      </TouchableOpacity>
    </View>
  }

  return (
    <>
      <View style={styles.body} onTouchEnd={() => setShowMenu(false)}>
        <ImageBackground style={styles.image} source={{ uri: image.path }}>
          {showMenu && <Menu />}
          <Text style={styles.imageLabel}>{image.name}</Text>
        </ImageBackground>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  moreButton: {
    height: 50,
    width: 50,
    alignItems: "center",
    justifyContent: "center"
  },
  menuContainer: {
    backgroundColor: 'white',
    position: "absolute",
    alignSelf: "flex-end",
    top: 0,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 25,
    borderColor: 'black',
    borderWidth: 1
  },
  imageLabel: {
    color: 'white',
    fontSize: 15,
    margin: 10
  }
});

export default ImageView
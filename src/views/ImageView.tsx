import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { removeImage } from '../reducers/imageSlice';

import Share from 'react-native-share';
import { RootStackParamList } from '../../App';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootState } from '../reducers/rootReducer';
import { ImageDetail } from '../common/Interfaces';
import { IconButton } from 'react-native-paper';

type RouteProps = RouteProp<RootStackParamList, 'Image'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Image'>;

interface Props {
  route: RouteProps;
  navigation: NavigationProp;
}

const ImageView = ({
  navigation,
  route: {
    params: { index },
  },
}: Props): JSX.Element => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const { allImages } = useSelector((state: RootState) => state.images);
  const [currentIndex, setCurrentIndex] = useState(index);
  const [currentImage, setCurrentImage] = useState<ImageDetail>(
    allImages[currentIndex],
  );

  useEffect(() => {
    setCurrentImage(allImages[currentIndex]);
  }, [currentIndex]);

  const deletePressed = () => {
    (async () => {
      await dispatch(removeImage(currentImage));
      navigation.goBack();
    })();
  };

  const showPrevious = () => {
    if (currentIndex !== 0) setCurrentIndex(currentIndex - 1);
  };

  const showNext = () => {
    if (currentIndex !== allImages.length - 1)
      setCurrentIndex(currentIndex + 1);
  };

  const sharePressed = () => {
    console.log(currentImage);
    const options = {
      title: 'Share title',
      message: currentImage.name,
      url: currentImage.path,
    };

    Share.open(options)
      .then(() => {
        setShowMenu(false);
      })
      .catch((err) => {
        err && console.log(err);
      });
  };

  React.useLayoutEffect(() => {
    const headerRight = () => (
      <TouchableOpacity style={styles.moreButton}>
        <IconButton
          icon="dots-vertical"
          size={30}
          onPress={() => setShowMenu((isOpen) => !isOpen)}
        />
      </TouchableOpacity>
    );
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation]);

  const Menu = () => {
    return (
      <View style={styles.menuContainer}>
        <TouchableOpacity onPress={deletePressed}>
          <Text style={styles.menuItem}>Delete</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sharePressed}>
          <Text style={styles.menuItem}>Share</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.body} onTouchEnd={() => setShowMenu(false)}>
        <ImageBackground
          style={styles.image}
          source={{ uri: currentImage.path }}>
          {showMenu && <Menu />}
          <Text
            style={[
              styles.imageLabel,
              { fontFamily: currentImage.font },
              { fontSize: currentImage.size },
              { left: currentImage.x },
              { top: currentImage.y },
              { color: currentImage.color },
              { fontWeight: currentImage.bold ? 'bold' : 'normal' },
              { fontStyle: currentImage.italic ? 'italic' : 'normal' },
              {
                textDecorationLine: currentImage.underline
                  ? 'underline'
                  : 'none',
              },
            ]}>
            {currentImage.name}
          </Text>
          <IconButton
            icon="arrow-left-bold"
            size={50}
            onPress={showPrevious}
            style={styles.leftButton}
          />
          <IconButton
            icon="arrow-right-bold"
            size={50}
            onPress={showNext}
            style={styles.rightButton}
          />
        </ImageBackground>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  moreButton: {
    height: 50,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 0,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    fontSize: 25,
    borderColor: 'black',
    borderWidth: 1,
  },
  imageLabel: {
    position: 'absolute',
  },
  leftButton: {
    // alignSelf: 'flex-start',
  },
  rightButton: {
    // alignSelf: 'flex-end',
  },
});

export default ImageView;

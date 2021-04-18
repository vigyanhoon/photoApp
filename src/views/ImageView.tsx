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
import { PhotoDetail } from '../common/Interfaces';
import { Divider, IconButton, Menu } from 'react-native-paper';
import GestureRecognizer from 'react-native-swipe-gestures';

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
  const [currentImage, setCurrentImage] = useState<PhotoDetail>(
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

  const onSwipe = (gestureName: string) => {
    switch (gestureName) {
      case 'SWIPE_LEFT':
        showNext();
        break;
      case 'SWIPE_RIGHT':
        showPrevious();
        break;
    }
  };

  const RightMenu = () => {
    return (
      <View style={styles.menuContainer}>
        <Menu.Item icon="delete" onPress={deletePressed} title="Delete" />
        <Divider />
        <Menu.Item icon="share" onPress={sharePressed} title="Share" />
      </View>
    );
  };

  return (
    <GestureRecognizer
      style={styles.body}
      onSwipe={(direction) => onSwipe(direction)}>
      <View style={styles.body} onTouchEnd={() => setShowMenu(false)}>
        <ImageBackground
          style={styles.imageBackground}
          imageStyle={styles.image}
          source={{ uri: currentImage.path }}>
          {showMenu && <RightMenu />}
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
    </GestureRecognizer>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  imageBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  image: {
    resizeMode: 'stretch',
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
    top: 0,
    right: 0,
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

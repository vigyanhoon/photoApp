import { RouteProp } from '@react-navigation/native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  Dimensions,
  GestureResponderEvent,
  ImageBackground,
  PanResponderGestureState,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { RootStackParamList } from '../../App';
import { PhotoDetail } from '../common/Interfaces';
import { removeImage, saveImage } from '../reducers/imageSlice';
import { RootState } from '../reducers/rootReducer';
import Draggable from 'react-native-draggable';
import { StackNavigationProp, useHeaderHeight } from '@react-navigation/stack';
import Toast from 'react-native-simple-toast';
import Button from '../common/components/Button';
import FormatBox from './FormatBox';
import { useDispatch, useSelector } from 'react-redux';
import { IMAGE_SAVE_PATH } from '../common/FileUtils';
import { copyPhoto, deletePhoto } from '../common/PhotoHelper';
import Marker, { TextBackgroundType } from 'react-native-image-marker';
import { windowHeight, windowWidth } from '../common/Utils';

type RouteProps = RouteProp<RootStackParamList, 'Sticker'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Sticker'>;

interface Props {
  route: RouteProps;
  navigation: NavigationProp;
}

const StickerScreen = ({
  navigation,
  route: {
    params: { imageData },
  },
}: Props): JSX.Element => {
  const defaultStyle: PhotoDetail = {
    path: imageData.uri,
    name: '',
    x: 50,
    y: 500,
    font: 'OpenSans',
    size: 20,
    bold: false,
    italic: false,
    underline: false,
    color: 'black',
  };

  const dispatch = useDispatch();
  const [imageName, setImageName] = useState('');
  const { allImages } = useSelector((state: RootState) => state.images);
  const [error, setError] = useState('');
  const [detail, setDetail] = useState<PhotoDetail>(defaultStyle);
  const draggableRef = useRef<Text>(null);
  const [showFormat, setShowFormat] = useState(true);
  const [textStyle, setTextStyle] = useState({});
  const savePressed = useRef(false);
  const headerHeight = useHeaderHeight();

  useLayoutEffect(() => {
    const headerRight = () => (
      <View style={styles.headerButtonContainer}>
        <Button
          title="Format"
          width={70}
          height={50}
          onPress={toggleFormatBox}
        />
        <Button
          title="Save"
          width={70}
          height={50}
          onPress={beginSavingImage}
        />
      </View>
    );
    navigation.setOptions({
      headerRight: headerRight,
    });
  });

  useEffect(() => {
    return navigation.addListener('blur', () => {
      if (!savePressed.current) {
        console.log('back pressed going to delete');
        dispatch(removeImage(detail));
      }
    });
  }, [navigation]);

  const toggleFormatBox = () => {
    setShowFormat(!showFormat);
  };

  const beginSavingImage = () => {
    savePressed.current = true;
    const imageWithSameName = allImages.filter(
      (img: PhotoDetail) => img.name === imageName,
    );
    if (imageWithSameName.length) {
      setError('Image with name ' + imageName + ' already exists');
      return;
    }

    if (imageName.length < 5) {
      setError('Please enter characters between 5 and 20');
      return;
    }

    const unitWidth = imageData.height / windowWidth;
    const unitHeight = imageData.width / (windowHeight - headerHeight);

    Marker.markText({
      src: { uri: detail.path },
      text: detail.name,
      X: unitWidth * detail.x,
      Y: unitHeight * detail.y,
      color: detail.color,
      fontName: detail.font,
      fontSize: unitWidth * detail.size,
      shadowStyle: {
        dx: 0,
        dy: 0,
        radius: 0,
        color: 'rgba(0, 0, 0, 0)',
      },
      textBackgroundStyle: {
        type: TextBackgroundType.stretchX,
        paddingX: 0,
        paddingY: 0,
        color: 'rgba(0, 0, 0, 0)',
      },
      scale: 1,
      quality: 100,
    })
      .then(async (path) => {
        console.log('the path is from marker is ', path);
        const picturePath = IMAGE_SAVE_PATH + '/' + detail.name + '.jpg';
        await copyPhoto(path, picturePath); //copy from app camera folder to outer picture folder
        await deletePhoto(path); //delete file from app camera cache folder
        detail.path = 'file:///' + picturePath;
        setDetail(detail);
        storeImageInAsyncCache();
        navigation.popToTop();
        Toast.show('Image saved', Toast.LONG);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const storeImageInAsyncCache = () => {
    dispatch(saveImage(detail));
  };

  const onDrag = () => {
    if (showFormat) setShowFormat(false);
  };

  const onDetailChange = (dt: PhotoDetail | null) => {
    if (dt === null) return;

    const style = [
      styles.floatingText,
      { fontWeight: dt.bold ? 'bold' : 'normal' },
      { fontStyle: dt.italic ? 'italic' : 'normal' },
      { textDecorationLine: dt.underline ? 'underline' : 'none' },
      { fontFamily: dt.font },
      { fontSize: dt.size },
      { color: dt.color },
    ];
    setTextStyle(style);
  };

  const onDragRelease = (
    _event: GestureResponderEvent,
    _state: PanResponderGestureState,
    bounds: { left: number; top: number },
  ) => {
    const updated = { ...detail, x: bounds.left, y: bounds.top };
    setDetail(updated);
  };

  return (
    <View style={styles.body}>
      <ImageBackground
        style={styles.imageBackground}
        imageStyle={styles.image}
        source={{ uri: imageData.uri }}>
        <FormatBox
          imageName={imageName}
          showFormat={showFormat}
          setImageName={setImageName}
          detail={detail}
          setDetail={setDetail}
          onDetailChange={onDetailChange}
          error={error}
        />
        <Draggable x={50} y={500} onDrag={onDrag} onDragRelease={onDragRelease}>
          <Text ref={draggableRef} style={textStyle}>
            {imageName}
          </Text>
        </Draggable>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: Math.round(Dimensions.get('window').height),
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'stretch',
  },
  headerButtonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150,
  },
  floatingText: {},
});

export default StickerScreen;

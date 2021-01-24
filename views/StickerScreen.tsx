import {RouteProp} from "@react-navigation/native";
import React, {useLayoutEffect, useRef, useState} from "react";
import {
  Dimensions, GestureResponderEvent,
  ImageBackground, PanResponderGestureState,
  StyleSheet,
  Text,
  View
} from "react-native";

import {useDispatch, useSelector} from 'react-redux'
import {RootStackParamList} from "../App";
import {ImageDetail} from "../common/Interfaces";
import {saveImage} from '../reducers/imageSlice';
import {RootState} from '../reducers/rootReducer';
import Draggable from 'react-native-draggable';
import {StackNavigationProp} from "@react-navigation/stack";
import Toast from 'react-native-simple-toast';
import Button from "../common/components/Button";
import FormatBox from "./FormatBox";

type RouteProps = RouteProp<RootStackParamList, 'Sticker'>;
type NavigationProp = StackNavigationProp<RootStackParamList, 'Sticker'>;

interface Props {
  route: RouteProps,
  navigation: NavigationProp
}

const StickerScreen = ({navigation, route: {params: {url}}}: Props) => {
  const [imageName, setImageName] = useState('')

  const defaultStyle: ImageDetail = {
    path: url,
    name: imageName,
    x: 50,
    y: 500,
    font: 'OpenSans',
    size: 20,
    bold: false,
    italic: false,
    underline: false,
    color: 'black'
  }
  const dispatch = useDispatch()
  const {allImages} = useSelector((state: RootState) => state.images)
  const [error, setError] = useState('')
  const [detail, setDetail] = useState<ImageDetail>(defaultStyle)
  const draggableRef = useRef<Text>(null)
  const [showFormat, setShowFormat] = useState(true)
  const [textStyle, setTextStyle] = useState({})

  useLayoutEffect(() => {
    const headerRight = () => (
      <View style={styles.headerButtonContainer}>
        <Button title="Format" width={70} height={50} onPress={toggleFormatBox}/>
        <Button title="Save" width={70} height={50} onPress={beginSavingImage}/>
      </View>
    )
    navigation.setOptions({
      headerRight: headerRight,
    });
  }, [navigation, imageName, showFormat]);

  const toggleFormatBox = () => {
    setShowFormat(!showFormat)
  }

  const beginSavingImage = () => {
    const imageWithSameName = allImages.filter((img: ImageDetail) => img.name === imageName)
    if (imageWithSameName.length) {
      setError('Image with name ' + imageName + ' already exists')
      return
    }

    if (imageName.length < 5) {
      setError('Please enter characters between 5 and 20')
      return
    }

    storeImage()

    navigation.popToTop()
    Toast.show('Image saved', Toast.LONG);
  }

  const storeImage = () => {
    dispatch(saveImage(detail))
  }

  const onDrag = () => {
    console.log('press started')
    if (showFormat === true) setShowFormat(false)
  }

  const onDetailChange = (dt: ImageDetail) => {
    console.log('details from parent ', dt)
    const style = [styles.floatingText,
      {fontWeight: detail.bold ? 'bold' : 'normal'},
      {fontStyle: detail.italic ? 'italic' : 'normal'},
      {textDecorationLine: detail.underline ? 'underline' : 'none'},
      {fontFamily: detail.font},
      {fontSize: detail.size},
      {color: detail.color}
    ]
    setTextStyle(style)
  }

  const onDragRelease = (_event: GestureResponderEvent, _state: PanResponderGestureState, bounds: { left: number, top: number }) => {
    console.log('release pressed')
    const updated = {...detail, x: bounds.left, y: bounds.top}
    setDetail(updated)
  }

  return (
    <View style={styles.body}>
      <ImageBackground style={styles.image} source={{uri: url}}>
        <FormatBox imageName={imageName} showFormat={showFormat} setImageName={setImageName}
                   detail={detail} setDetail={setDetail} onDetailChange={onDetailChange} error={error}/>
        <Draggable x={50} y={500} onDrag={onDrag} onDragRelease={onDragRelease}>
          <Text ref={draggableRef} style={textStyle}>
            {imageName}
          </Text>
        </Draggable>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'flex-end',
    minHeight: Math.round(Dimensions.get('window').height)
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerButtonContainer: {
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 150
  },
  floatingText: {}
});

export default StickerScreen;

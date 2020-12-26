import {RouteProp} from "@react-navigation/native";
import React, {useEffect, useRef, useState} from "react";
import {
  Button, GestureResponderEvent,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import {useDispatch, useSelector} from 'react-redux'
import {RootStackParamList} from "../App";
import {ImageDetail} from "../common/Interfaces";
import {saveImage} from '../reducers/imageSlice';
import {RootState} from '../reducers/rootReducer';
import {TouchableOpacity} from "react-native-gesture-handler";
import DropDown from "../common/components/DropDown";
import Draggable from 'react-native-draggable';
import ColorPicker from "../common/components/ColorPicker";

type RouteProps = RouteProp<RootStackParamList, 'Input'>;

interface Props {
  route: RouteProps
}

const StickerScreen = ({route: {params: {url}}}: Props) => {
  const dispatch = useDispatch()
  const {allImages} = useSelector((state: RootState) => state.images)

  const [imageName, setImageName] = useState('')
  const [error, setError] = useState('')
  const [fonts, setFonts] = useState<string[]>([])
  const [fontSize, setFontSize] = useState(20)
  const [selectedFont, setSelectedFont] = useState('')
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)
  const draggableRef = useRef<Text>(null)
  const [textX, setTextX] = useState<number>(50)
  const [textY, setTextY] = useState<number>(500)
  const [textColor, setTextColor] = useState<string>('black')
  const [textAboveHalf, setTextAboveHalf] = useState(false)

  useEffect(() => {
    setFonts(['AndikaNewBasic', 'Anton', 'Audiowide', 'HanaleiFill',
      'Langar', 'Lato', 'Lobster', 'OpenSans', 'OpenSansCondensed',
      'Redressed', 'Roboto', 'SourceSansPro'])
  }, [])


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
  }

  const onChangeText = (text: string) => {
    setImageName(text)
  }

  const storeImage = () => {
    const detail: ImageDetail = {
      path: url,
      name: imageName,
      x: textX,
      y: textY,
      font: selectedFont,
      size: fontSize,
      bold: bold,
      italic: italic,
      underline: underline,
      color: textColor
    }
    dispatch(saveImage(detail))
  }

  const onSelect = (item: string) => {
    console.log(item)
    setSelectedFont(item)
  }

  const onDragRelease = (event: GestureResponderEvent) => {

    // setTextX(event.nativeEvent.locationX)
    // setTextY(event.nativeEvent.locationY)
    draggableRef.current!.measure((_fx, _fy, _width, _height, px, py) => {
      console.log('X offset to page: ' + px)
      console.log('Y offset to page: ' + py)
      setTextX(px)
      setTextY(py)
      setTextAboveHalf(py < 400)
    })
  }

  return (
    <View style={styles.body}>
      <ImageBackground style={styles.image} source={{uri: url}}>
        <View style={[styles.centeredView, {marginTop: textAboveHalf ? 500 : 0}]}>
          <View style={styles.inputView}>
            <Text style={styles.titleLabel}>Enter image name</Text>
            <TextInput maxLength={20} style={styles.inputName} onChangeText={text => onChangeText(text)}
                       value={imageName}/>
            <View style={styles.formatContainer}>
              <TouchableOpacity style={[styles.formatButton, {backgroundColor: bold ? 'grey' : 'transparent'}]}
                                onPress={() => setBold(!bold)}>
                <Text style={[styles.buttonText, {fontWeight: "bold"}]}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.formatButton, {backgroundColor: italic ? 'grey' : 'transparent'}]}
                                onPress={() => setItalic(!italic)}>
                <Text style={[styles.buttonText, {fontStyle: 'italic'}]}>I</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.formatButton, {backgroundColor: underline ? 'grey' : 'transparent'}]}
                                onPress={() => setUnderline(!underline)}>
                <Text style={[styles.buttonText, {textDecorationLine: 'underline'}]}>U</Text>
              </TouchableOpacity>
              <View style={styles.picker}>
                <DropDown
                  defaultText={'Select font'}
                  values={fonts}
                  onSelect={onSelect}
                />
              </View>
            </View>
            <View style={styles.formatContainer}>
              <View style={styles.picker}>
                <TextInput maxLength={2} keyboardType={'numeric'} style={styles.inputSize}
                           onChangeText={(text) => setFontSize(Number(text))} value={String(fontSize)}/>
              </View>
              <View style={styles.picker}>
                <ColorPicker oldColor={'red'} onColorSelected={(color: string) => setTextColor(color)}/>
              </View>
            </View>
            <View style={styles.saveButton}>
              <Button title="Save" onPress={beginSavingImage}/>
            </View>
            <Text style={styles.error}>{error}</Text>
          </View>
        </View>
        <Draggable x={0} y={textY} onDragRelease={onDragRelease}>
          <Text ref={draggableRef} style={[styles.floatingText,
            {fontWeight: bold ? 'bold' : 'normal'},
            {fontStyle: italic ? 'italic' : 'normal'},
            {textDecorationLine: underline ? 'underline' : 'none'},
            {fontFamily: selectedFont},
            {fontSize: fontSize},
            {color: textColor}
          ]}
          >
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
    justifyContent: 'flex-end'
  },
  image: {
    flex: 1,
    backgroundColor: 'red',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  inputView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  formatContainer: {
    display: "flex",
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: "center",
  },
  formatButton: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  picker: {
    borderRadius: 10,
    width: 100,
    height: 50,
    marginHorizontal: 5
  },
  buttonText: {
    fontSize: 25,
  },
  titleLabel: {
    marginBottom: 15,
    textAlign: "center"
  },
  saveButton: {
    width: 100,
    marginVertical: 20,
  },
  inputName: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    textAlign: 'center'
  },
  error: {
    color: 'red'
  },
  inputSize: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    textAlign: 'center'
  },
  floatingText: {}
});

export default StickerScreen;

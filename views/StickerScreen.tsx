import {RouteProp} from "@react-navigation/native";
import React, {useEffect, useState} from "react";
import {
  Button,
  Dimensions,
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
import FontList from 'react-native-font-list';

const windowWidth = Dimensions.get('window').width;

type RouteProps = RouteProp<RootStackParamList, 'Input'>;

interface Props {
  route: RouteProps
}

const StickerScreen = ({route: {params: {url}}}: Props) => {
  const dispatch = useDispatch()
  const {allImages} = useSelector((state: RootState) => state.images)

  const [imageName, setImageName] = useState('')
  const [error, setError] = useState('')
  const [families, setFamilies] = useState<[string] | []>([]);
  const [fonts, setFonts] = useState([]);
  const [selectedFont, setSelectedFont] = useState([]);
  const [bold, setBold] = useState(false)
  const [italic, setItalic] = useState(false)
  const [underline, setUnderline] = useState(false)

  useEffect(() => {
    FontList.get((fontFamilies: [string], installedFonts: [string]) => {
      setFamilies(fontFamilies)
      setFonts(installedFonts)
    });
  }, [])


  const closeModal = () => {
    const imageWithSameName = allImages.filter(img => img.name === imageName)
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
      name: imageName
    }
    dispatch(saveImage(detail))
  }

  const onSelect = (item: string) => {
    console.log('item selected from sticker ' + item)
  }

  return (
    <View style={styles.body}>
      <ImageBackground style={styles.image} source={{uri: url}}>
        <View style={styles.centeredView}>
          <View style={styles.inputView}>
            <Text style={styles.titleLabel}>Enter image name</Text>
            <TextInput maxLength={20} style={styles.inputText} onChangeText={text => onChangeText(text)}
                       value={imageName}/>
            <View style={styles.formatContainer}>
              <TouchableOpacity style={styles.formatButton} onPress={()=>setBold(!bold)}>
                <Text style={[styles.buttonText, {fontWeight: "bold"}]}>B</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.formatButton} onPress={()=>setItalic(!italic)}>
                <Text style={[styles.buttonText, {fontStyle: 'italic'}]}>I</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.formatButton} onPress={()=>setUnderline(!underline)}>
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
            <View style={styles.saveButton}>
              <Button title="Save" onPress={closeModal}/>
            </View>
            <Text style={styles.error}>{error}</Text>
          </View>
        </View>
        <Text style={[styles.floatingText,
            {fontWeight:bold ? 'bold' : 'normal'},
            {fontStyle:italic ? 'italic' : 'normal'},
            {textDecorationLine: underline ? 'underline' : 'none'},
            {fontFamily:'SourceSansPro'},
            {fontSize: 50}
          ]}
        >
          hisdfasfasdf
        </Text>
      </ImageBackground>
    </View>
  );
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
    padding: 35,
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
    backgroundColor: 'red',
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
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
  inputText: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    textAlign: 'center'
  },
  error: {
    color: 'red'
  },
  floatingText: {
    position: 'absolute',
    bottom: 50,
    left: 50,
  }
});

export default StickerScreen;

import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import {
  Button,
  Dimensions,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";

import { useDispatch, useSelector } from 'react-redux'
import { RootStackParamList } from "../App";
import { ImageDetail } from "../common/Interfaces";
import { saveImage } from '../reducers/imageSlice';
import { RootState } from '../reducers/rootReducer';

const windowWidth = Dimensions.get('window').width;

type RouteProps = RouteProp<RootStackParamList, 'Input'>;

interface Props {
  route: RouteProps
}

const StickerScreen = ({ route: { params: { url } } }: Props) => {
  const dispatch = useDispatch()
  const { allImages } = useSelector((state: RootState) => state.images)

  const [imageName, setImageName] = useState('')
  const [error, setError] = useState('')
  console.log('url is ' + url)
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

  return (
    <View style={styles.body}>
      <ImageBackground style={styles.image} source={{ uri: url }}>
        <View style={styles.centeredView}>
          <View style={styles.inputView}>
            <Text style={styles.modalText}>Enter image name</Text>
            <TextInput maxLength={20} style={styles.inputText} onChangeText={text => onChangeText(text)} value={imageName} />
            <View style={styles.saveButton}>
              <Button title="Save" onPress={closeModal} />
            </View>
            <Text style={styles.error}>{error}</Text>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    width: windowWidth - 50,
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
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  saveButton: {
    width: 100,
    marginVertical: 20
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
  }
});

export default StickerScreen;

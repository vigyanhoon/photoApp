import React, { useState } from "react";
import {
  Button,
  Dimensions,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from "react-native";

import { useDispatch, useSelector } from 'react-redux'
import { ImageDetail } from "../common/Interfaces";
import { saveImage } from '../reducers/imageSlice';
import { RootState } from '../reducers/rootReducer';

const windowWidth = Dimensions.get('window').width;

const InputModal = ({ showPopup, setShowPopup, url}) => {
  const dispatch = useDispatch()
  const { allImages } = useSelector((state: RootState) => state.images)
  
  const [imageName, setImageName] = useState('')
  const [error, setError] = useState('')

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

    setShowPopup(false)
    storeImage()
  }

  const onChangeText = (text: string) => {
    setImageName(text)
  }

  const storeImage = ()=> {
    const detail: ImageDetail = {
      path: url,
      name: imageName
    }
    dispatch(saveImage(detail))
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showPopup}>
      <TouchableWithoutFeedback>
        <View style={styles.modalOverlay} />
      </TouchableWithoutFeedback>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Enter image name</Text>
          <TextInput maxLength={20} style={styles.inputText} onChangeText={text => onChangeText(text)} value={imageName} />
          <View style={styles.saveButton}>
            <Button title="Save" onPress={closeModal} />
          </View>
          <Text style={styles.error}>{error}</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
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
  modalOverlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  error: {
    color: 'red'
  }
});

export default InputModal;

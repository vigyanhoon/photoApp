import React, {useState} from 'react';
import {
  Modal,
  StyleSheet, View,
} from 'react-native';

import { TriangleColorPicker } from 'react-native-color-picker'
import Button from "./Button";

interface Props {
  oldColor: string,
  onColorSelected: (color:string) => void,
}

const ColorPicker = ({oldColor, onColorSelected}: Props) => {
  const [showPicker, setShowPicker] = useState(false)
  const selected = (selectedColor:string)=> {
    setShowPicker(false)
    onColorSelected(selectedColor)
  }
  return (
    <View>
      <Button title={'Select Color'} height={50} onPress={()=>setShowPicker(true)}/>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showPicker}
      >
        <View style={styles.centeredView}>
          <TriangleColorPicker
            oldColor={oldColor}
            onColorSelected={selected}
            style={styles.picker}
          />
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  picker: {
    width: 400,
    height: 500,
    backgroundColor: 'white'
  },
  centeredView: {
    alignItems: "center",
  },
})

export default ColorPicker
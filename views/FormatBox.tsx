import {ImageDetail} from "../common/Interfaces";
import React, {useEffect, useState} from "react";
import {Dimensions, StyleSheet, Text, TextInput, View} from "react-native";
import DropDown from "../common/components/DropDown";
import ColorPicker from "../common/components/ColorPicker";
import {TouchableOpacity} from "react-native-gesture-handler";


interface Props {
  showFormat: boolean,
  imageName: string,
  setImageName: any,
  detail: ImageDetail,
  setDetail: any,
  onDetailChange: (detail: ImageDetail) => void,
  error: string
}

const FormatBox = ({showFormat, imageName, setImageName, detail, setDetail, onDetailChange, error}: Props) => {
  enum TYPE {
    BOLD, ITALIC, UNDERLINE, FONT
  }

  const [fonts, setFonts] = useState<string[]>([])
  const [fontSize, setFontSize] = useState(20)
  const [textColor, setTextColor] = useState<string>('black')

  useEffect(() => {
    setFonts(['AndikaNewBasic', 'Anton', 'Audiowide', 'HanaleiFill',
      'Langar', 'Lato', 'Lobster', 'OpenSans', 'OpenSansCondensed',
      'Redressed', 'Roboto', 'SourceSansPro'])
  }, [])


  const onChangeText = (text: string) => {
    setImageName(text)
  }

  const updateDetail = (type: TYPE, selection: string = '') => {
    let update: ImageDetail
    switch (type) {
      case TYPE.BOLD:
        update = {...detail, bold: !detail.bold}
        break
      case TYPE.ITALIC:
        update = {...detail, italic: !detail.italic}
        break
      case TYPE.UNDERLINE:
        update = {...detail, underline: !detail.underline}
        break
      case TYPE.FONT:
        update = {...detail, font: selection}
        break
    }
    setDetail(update)
    onDetailChange(update)
  }

  if (!showFormat) return null

  return <View style={[styles.centeredView]}>
    <View style={styles.inputView}>
      <Text style={styles.titleLabel}>Enter image name</Text>
      <TextInput maxLength={20} style={styles.inputName} onChangeText={onChangeText} value={imageName}/>
      <View style={styles.formatContainer}>
        <TouchableOpacity style={[styles.formatButton, {backgroundColor: detail.bold ? 'grey' : 'transparent'}]}
                          onPress={() => updateDetail(TYPE.BOLD)}>
          <Text style={[styles.buttonText, {fontWeight: "bold"}]}>B</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.formatButton, {backgroundColor: detail.italic ? 'grey' : 'transparent'}]}
                          onPress={() => updateDetail(TYPE.ITALIC)}>
          <Text style={[styles.buttonText, {fontStyle: 'italic'}]}>I</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.formatButton, {backgroundColor: detail.underline ? 'grey' : 'transparent'}]}
          onPress={() => updateDetail(TYPE.UNDERLINE)}>
          <Text style={[styles.buttonText, {textDecorationLine: 'underline'}]}>U</Text>
        </TouchableOpacity>
        <View style={styles.picker}>
          <DropDown
            defaultText={'Select font'}
            values={fonts}
            onSelect={(font) => updateDetail(TYPE.FONT, font)}
          />
        </View>
      </View>
      <View style={styles.formatContainer}>
        <View style={styles.picker}>
          <TextInput maxLength={2} keyboardType={'numeric'} style={styles.inputSize}
                     onChangeText={(text) => setFontSize(Number(text))} value={String(fontSize)}/>
        </View>
        <View style={styles.picker}>
          <ColorPicker oldColor={textColor} onColorSelected={(color: string) => setTextColor(color)}/>
        </View>
      </View>
      <Text style={styles.error}>{error}</Text>
    </View>
  </View>
}

const styles = StyleSheet.create({
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
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    textAlign: 'center',
    borderRadius: 10
  },
});

export default FormatBox
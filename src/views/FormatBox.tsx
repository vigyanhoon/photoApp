import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ImageDetail } from '../common/Interfaces';
import DropDown from '../common/components/DropDown';
import ColorPicker from '../common/components/ColorPicker';

interface Props {
  showFormat: boolean;
  imageName: string;
  setImageName: Dispatch<SetStateAction<string>>;
  detail: ImageDetail;
  setDetail: any;
  onDetailChange: (detail: ImageDetail) => void;
  error: string;
}

enum TYPE {
  TEXT,
  BOLD,
  ITALIC,
  UNDERLINE,
  FONT,
  SIZE,
  COLOR,
}

const FormatBox = ({
  showFormat,
  imageName,
  setImageName,
  detail,
  setDetail,
  onDetailChange,
  error,
}: Props): JSX.Element | null => {
  const [fonts, setFonts] = useState<string[]>([]);
  const [fontSize, setFontSize] = useState(20);
  const [textColor, setTextColor] = useState<string>('black');

  useEffect(() => {
    setFonts([
      'AndikaNewBasic',
      'Anton',
      'Audiowide',
      'HanaleiFill',
      'Langar',
      'Lato',
      'Lobster',
      'OpenSans',
      'OpenSansCondensed',
      'Redressed',
      'Roboto',
      'SourceSansPro',
    ]);
  }, []);

  const updateDetail = (type: TYPE, value = '') => {
    let update: ImageDetail = { ...detail };

    switch (type) {
      case TYPE.TEXT:
        update = { ...detail, name: value };
        setImageName(value);
        break;
      case TYPE.BOLD:
        update = { ...detail, bold: !detail.bold };
        break;
      case TYPE.ITALIC:
        update = { ...detail, italic: !detail.italic };
        break;
      case TYPE.UNDERLINE:
        update = { ...detail, underline: !detail.underline };
        break;
      case TYPE.FONT:
        update = { ...detail, font: value };
        break;
      case TYPE.SIZE:
        update = { ...detail, size: Number(value) };
        setFontSize(Number(value));
        break;
      case TYPE.COLOR:
        update = { ...detail, color: value };
        setTextColor(value);
        break;
    }
    console.log('in update detail', update);
    setDetail(update);
    onDetailChange(update);
  };

  if (!showFormat) return null;

  return (
    <View style={[styles.centeredView]}>
      <View style={styles.inputView}>
        <Text style={styles.titleLabel}>Enter image name</Text>
        <TextInput
          maxLength={20}
          style={styles.inputName}
          onChangeText={(text) => updateDetail(TYPE.TEXT, text)}
          value={imageName}
        />
        <View style={styles.formatContainer}>
          <TouchableOpacity
            style={[
              styles.formatButton,
              { backgroundColor: detail.bold ? 'grey' : 'transparent' },
            ]}
            onPress={() => updateDetail(TYPE.BOLD)}>
            <Text style={[styles.buttonText, { fontWeight: 'bold' }]}>B</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.formatButton,
              { backgroundColor: detail.italic ? 'grey' : 'transparent' },
            ]}
            onPress={() => updateDetail(TYPE.ITALIC)}>
            <Text style={[styles.buttonText, { fontStyle: 'italic' }]}>I</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.formatButton,
              { backgroundColor: detail.underline ? 'grey' : 'transparent' },
            ]}
            onPress={() => updateDetail(TYPE.UNDERLINE)}>
            <Text
              style={[styles.buttonText, { textDecorationLine: 'underline' }]}>
              U
            </Text>
          </TouchableOpacity>
          <View style={styles.picker}>
            <DropDown
              defaultText="Select font"
              values={fonts}
              onSelect={(font) => updateDetail(TYPE.FONT, font)}
            />
          </View>
        </View>
        <View style={styles.formatContainer}>
          <View style={styles.picker}>
            <TextInput
              maxLength={2}
              keyboardType="numeric"
              style={styles.inputSize}
              onChangeText={(text) => updateDetail(TYPE.SIZE, text)}
              value={String(fontSize)}
            />
          </View>
          <View style={styles.picker}>
            <ColorPicker
              oldColor={textColor}
              onColorSelected={(color: string) =>
                updateDetail(TYPE.COLOR, color)
              }
            />
          </View>
        </View>
        <Text style={styles.error}>{error}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  formatContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'center',
  },
  formatButton: {
    width: 50,
    height: 50,
    marginHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  picker: {
    borderRadius: 10,
    width: 100,
    height: 50,
    marginHorizontal: 5,
  },
  buttonText: {
    fontSize: 25,
  },
  titleLabel: {
    marginBottom: 15,
    textAlign: 'center',
  },
  inputName: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
  },
  error: {
    color: 'red',
  },
  inputSize: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    width: 100,
    textAlign: 'center',
    borderRadius: 10,
  },
});

export default FormatBox;

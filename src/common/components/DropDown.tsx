import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Modal,
  TouchableOpacity,
} from 'react-native';
import Button from './Button';

interface Props {
  defaultText: string;
  values: string[];
  onSelect: (item: string) => void;
}

const DropDown = ({ defaultText, values, onSelect }: Props) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [selected, setSelected] = useState(defaultText);

  const showMenu = () => {
    setShowDropDown(true);
  };

  const hideMenu = () => {
    setShowDropDown(false);
  };

  const onItemPressed = (item: string) => {
    onSelect(item);
    hideMenu();
    setSelected(item);
  };

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      onPress={() => onItemPressed(item)}
      delayPressIn={0}
      style={styles.item}>
      <Text style={styles.title}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <View>
      <Button onPress={showMenu} title={selected} height={50} />
      <Modal animationType="slide" transparent={true} visible={showDropDown}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FlatList
              data={values}
              renderItem={renderItem}
              keyExtractor={(_item, index) => String(index)}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 50,
    marginTop: 70,
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
  item: {
    borderWidth: 2,
    borderColor: 'grey',
    margin: 5,
    borderRadius: 5,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 20,
  },
});

export default DropDown;

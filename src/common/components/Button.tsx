import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  height?: number;
  width?: number;
  bg?: string;
  color?: string;
}

const Button = ({
  title,
  onPress,
  height,
  bg,
  color,
  width,
}: Props): JSX.Element => {
  return (
    <TouchableOpacity
      onPress={onPress}
      delayPressIn={0}
      style={[
        styles.root,
        { height: height, backgroundColor: bg, width: width },
      ]}>
      <View>
        <Text style={[styles.title, { color: color }]} numberOfLines={1}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
    color: 'white',
    padding: 5,
    borderColor: 'grey',
    borderWidth: 1,
  },
  title: {},
});

export default Button;

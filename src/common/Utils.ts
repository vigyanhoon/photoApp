import { Alert, Dimensions, PermissionsAndroid } from 'react-native';

export const getPermissions = async (): Promise<boolean> => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'This app needs storage permission',
        message: 'Your app needs permission.',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      Alert.alert(
        'Permission denied',
        'This app will not work without the permission',
        [{ text: 'OK', onPress: () => console.log('OK Pressed') }],
      );
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const windowWidth = Dimensions.get('window').width;
export const windowHeight = Dimensions.get('window').height;

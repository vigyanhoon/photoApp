import AsyncStorage from '@react-native-community/async-storage';

class Storage {
  save(k, v) {
    const s = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value);
      } catch (e) {
        console.log(e);
      }
    };

    s(k, v);
  }

  static get(k) {
    const g = async (key) => {
      try {
        await AsyncStorage.get(key);
      } catch (e) {
        console.log(e);
      }
    };

    return g(k);
  }

  static remove(k) {
    const g = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
      } catch (e) {
        console.log(e);
      }
    };

    return g(k);
  }
}

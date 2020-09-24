import AsyncStorage from '@react-native-community/async-storage';

const save = async (key:string, value:string) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
}

const get = async (key:string):Promise<string[]> => {
  const saved = await AsyncStorage.getItem(key);
  const jsonValue = JSON.parse(saved)
  return jsonValue
};

const remove = async (key:string) => {
  return await AsyncStorage.removeItem(key);
};


export { save, get, remove }

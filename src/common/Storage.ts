import AsyncStorage from '@react-native-community/async-storage';

const save = async (key: string, value: any): Promise<void> => {
  console.log('saving to asyncstorage...', value);
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

const get = async (key: string): Promise<any> => {
  const saved = await AsyncStorage.getItem(key);
  if (saved) return JSON.parse(saved);
};

const remove = async (key: string): Promise<void> => {
  console.log('removing from asyncstorage...', key);
  await AsyncStorage.removeItem(key);
};

export { save, get, remove };

import { ReadDirItem } from 'react-native-fs';

const RNFS = require('react-native-fs');

interface error {
  message: string;
  code: string;
}

export const IMAGE_SAVE_PATH = RNFS.PicturesDirectoryPath + '/photoApp';

export const deleteFile = async (path: string): Promise<void> => {
  const file = await RNFS.stat(path);

  RNFS.unlink(file.originalFilepath)
    .then(() => {
      console.log('File deleted ' + path);
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
};

export const getFiles = (path: string): ReadDirItem[] => {
  return RNFS.readDir(path)
    .then((result: ReadDirItem[]) => {
      return result;
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
};

export const clearCameraFolder = async (): Promise<void> => {
  const files: ReadDirItem[] = await getFiles(
    RNFS.CachesDirectoryPath + '/Camera',
  );

  for (const file of files) {
    await deleteFile(file.path);
  }
};

export const copyFile = (
  source: string,
  destination: string,
): Promise<void> => {
  return RNFS.copyFile(source, destination)
    .then(() => {
      console.log(source + ' copied to ' + destination);
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
};

export const copyFileToApp = async (source: string): Promise<string> => {
  const imageName = source.substring(
    source.lastIndexOf('/') + 1,
    source.length,
  );
  const destination = IMAGE_SAVE_PATH + imageName;
  await copyFile(source, destination);
  return destination;
};

export const createCameraFolder = (): void => {
  RNFS.mkdir(IMAGE_SAVE_PATH)
    .then(() => {
      console.log('Path created ' + IMAGE_SAVE_PATH);
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
};

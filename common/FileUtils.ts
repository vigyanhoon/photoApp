var RNFS = require('react-native-fs');

interface error {
  message: string,
  code: string
}

export const CAMERA_PATH = 'file:///data/user/0/com.photoapp/cache/Camera/'

export const deleteFile = async (path: string) => {
  const file = await RNFS.stat(path)

  RNFS.unlink(file.originalFilepath)
    .then(() => {
      console.log('File deleted ' + path)
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
}

export const getFiles = (path: string) => {
  return RNFS.readDir(path)
    .then((result: []) => {
      return result
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
}

export const clearCameraFolder = async () => {
  let files = await getFiles(RNFS.CachesDirectoryPath + '/Camera')
  for (let file of files) {
    await deleteFile(file.path)
  }
}

const copyFile = (source: string, destination: string) => {
  return RNFS.copyFile(source, destination)
    .then(() => {
      console.log(source + ' copied to ' + destination)
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
}

export const copyFileToApp = async (source: string) => {
  const imageName = source.substring(source.lastIndexOf('/') + 1, source.length)
  const destination = CAMERA_PATH + imageName
  await copyFile(source, destination)
  return destination
}

export const createCameraFolder = () => {
  return RNFS.mkdir(CAMERA_PATH)
    .then(() => {
      console.log('Path created ' + CAMERA_PATH)
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
}

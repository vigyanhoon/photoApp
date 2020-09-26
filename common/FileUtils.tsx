var RNFS = require('react-native-fs');

interface error {
  message: string,
  code: string
}

const deleteFile = async (path: string) => {
  const file = await RNFS.stat(path)

  RNFS.unlink(file.originalFilepath)
    .then( () => {
      console.log('File deleted ' + path)
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
}

const getFiles = (path: string) => {
  RNFS.readDir(path)
    .then((result: []) => {
      return result
    })
    .catch((err: error) => {
      console.log(err.message, err.code);
    });
}

export {deleteFile, getFiles}

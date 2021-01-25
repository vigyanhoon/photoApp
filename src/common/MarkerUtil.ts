import Marker from 'react-native-image-marker';
import { clearCameraFolder } from './FileUtils';
import { addFile } from './ImageSaver';

const addMark = (uri: string) => {
  Marker.markText({
    src: uri,
    text: '@copyright image',
    position: 'bottomCenter',
    color: '#FFFFFF',
    fontName: 'Arial-BoldItalicMT',
    fontSize: 100,
    scale: 1,
    quality: 100,
    shadowStyle: {
      dx: 10.5,
      dy: 20.8,
      radius: 20.9,
      color: '#ff00ff',
    },
  })
    .then((res) => {
      addFile('file://' + res);
      clearCameraFolder();
    })
    .catch((err) => {
      console.log(err);
    });
};

export { addMark };

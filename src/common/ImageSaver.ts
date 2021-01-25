import { deleteFile } from './FileUtils';
import { get, save } from './Storage';
import { ImageDetail } from './Interfaces';

const key = 'images';

const addFile = async (detail: ImageDetail): Promise<void> => {
  const details = (await get(key)) || [];
  details.push(detail);
  await save(key, details);
};

const getFileDetails = async (): Promise<ImageDetail[]> => {
  return (await get(key)) || [];
};

const deleteImage = async (image: ImageDetail): Promise<void> => {
  let images = (await get(key)) || [];
  images = images.filter((img: ImageDetail) => img.name !== image.name);
  await save(key, images);
  await deleteFile(image.path);
};

export { addFile, getFileDetails, deleteImage };

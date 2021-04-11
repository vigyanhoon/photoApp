import { deleteFile, copyFile } from './FileUtils';
import { get, save } from './Storage';
import { PhotoDetail } from './Interfaces';

const key = 'images';

const addPhotoToAS = async (detail: PhotoDetail): Promise<void> => {
  const details = (await get(key)) || [];
  details.push(detail);
  await save(key, details);
};

const getPhotoDetailsFromAS = async (): Promise<PhotoDetail[]> => {
  return (await get(key)) || [];
};

const deletePhotoFromAS = async (image: PhotoDetail): Promise<void> => {
  let images = (await get(key)) || [];
  images = images.filter((img: PhotoDetail) => img.name !== image.name);
  await save(key, images);
};

const deletePhoto = async (path: string): Promise<void> => {
  await deleteFile(path);
};

const copyPhoto = async (from: string, to: string): Promise<void> => {
  await copyFile(from, to);
};

export {
  addPhotoToAS,
  getPhotoDetailsFromAS,
  deletePhotoFromAS,
  deletePhoto,
  copyPhoto,
};

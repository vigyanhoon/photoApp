import { createSlice } from '@reduxjs/toolkit';
import { AppThunk } from './store';

import {
  addPhotoToAS,
  deletePhoto,
  deletePhotoFromAS,
  getPhotoDetailsFromAS,
} from '../common/PhotoHelper';
import { PhotoDetail } from '../common/Interfaces';

const initialState = {
  allImages: [] as PhotoDetail[],
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage(state, action) {
      state.allImages.push(action.payload);
    },
    setImages(state, action) {
      state.allImages = action.payload;
    },
  },
});

export const saveImage = (img: PhotoDetail): AppThunk => async (dispatch) => {
  await addPhotoToAS(img);
  dispatch(addImage(img));
};

export const getImages = (): AppThunk => async (dispatch) => {
  const files: PhotoDetail[] = await getPhotoDetailsFromAS();
  dispatch(setImages(files));
};

export const removeImage = (img: PhotoDetail): AppThunk => async () => {
  await deletePhotoFromAS(img);
  await deletePhoto(img.path);
};

export const { addImage, setImages } = imageSlice.actions;

export default imageSlice.reducer;

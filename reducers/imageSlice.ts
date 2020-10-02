import { createSlice } from '@reduxjs/toolkit'
import { AppThunk } from './store'

import { addFile, deleteImage, getFileDetails } from '../common/ImageSaver'
import { ImageDetail } from '../common/Interfaces'

interface ImageState {
  allImages: ImageDetail[]
}

const initialState = {
  allImages: []
}

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage(state, action) {
      state.allImages.push(action.payload)
    },
    setImages(state, action) {
      state.allImages = action.payload
    }
  }
})

export const saveImage = (img: ImageDetail): AppThunk => async dispatch => {
  await addFile(img)
  dispatch(addImage(img))
}

export const getImages = (): AppThunk => async dispatch => {
  const files: ImageDetail[] = await getFileDetails()
  console.log('fetched paths ' + files.length)
  dispatch(setImages(files))
}

export const removeImage = (img: ImageDetail): AppThunk => async dispatch => {
  await deleteImage(img)
}

export const { addImage, setImages } = imageSlice.actions

export default imageSlice.reducer
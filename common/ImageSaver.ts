import { deleteFile } from './FileUtils'
import { get, save } from './Storage'
import {ImageDetail} from './Interfaces'

const key = 'images'

const addFile = async (detail: ImageDetail) => {
  let details = await get(key) || []
  details.push(detail)
  await save(key, details)
}

const getFileDetails = async (): Promise<ImageDetail[]> => {
  let files = await get(key) || []
  return files
}

const deleteImage = async (image: ImageDetail) => {
  let images = await get(key) || []
  images = images.filter(img=>img.name!==image.name)
  await save(key, images)
  await deleteFile(image.path)
}

export { addFile, getFileDetails, deleteImage }
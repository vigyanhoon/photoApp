import { deleteFile } from './FileUtils'
import { get, save } from './Storage'

const key = 'images'

const addFilePaths = async (path: string) => {
  let paths = await get(key) || []
  paths.push(path)
  await save(key, paths)
}

const getFilePaths = async (): Promise<string[]> => {
  let paths = await get(key) || []
  return paths
}

const removePath = async (path: string) => {
  let paths = await get(key) || []
  const foundIndex = paths.indexOf(path)
  paths.splice(foundIndex, 1)
  await save(key, paths)
}

const deleteImage = (path: string) => {
  removePath(path)
  deleteFile(path)
}

export { addFilePaths, getFilePaths, deleteImage }
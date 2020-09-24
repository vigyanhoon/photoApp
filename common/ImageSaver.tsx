import { get, save } from './Storage'

const key = 'images'

const saveFilePaths = async (path) => {
  let paths = await get(key) || []
  console.log('paths before save ' + paths)
  paths.push(path)
  await save(key, paths)
  paths = await get(key)
  console.log('paths after save ' + paths)
}


const getFilePaths = async ():Promise<string[]> => {
  let paths = await get(key) || []
  console.log('paths got ' + paths)
  return paths
}

export { saveFilePaths, getFilePaths }
import path from 'path'
import { readdir, stat } from 'fs/promises'

const MODULE_NAME = 'props-helper'

/**
 * Recursively get all directories absolute paths in a directory
 */
const recursivelyGetAllDirectoriesPaths = async (directoryPath, acc = []) => {
  const directoryChildren = await readdir(directoryPath)

  await Promise.all(directoryChildren
    .map(async directoryChild => {
      const absoluteChildPath = path.join(directoryPath, directoryChild)
      const isDirectory = (await stat(absoluteChildPath)).isDirectory()

      if (isDirectory) {
        acc.push(absoluteChildPath)
        await recursivelyGetAllDirectoriesPaths(absoluteChildPath, acc)
      }
    }))

  return acc
}

export default async function () {
  this.options.alias.PropsTypes = path.resolve(__dirname, './scripts/nuxt-prop-types.js')

  const componentsDirectory = path.resolve(this.options.rootDir, 'components')
  const componentsDirectories = [
    componentsDirectory,
    ...await recursivelyGetAllDirectoriesPaths(componentsDirectory)
  ]
    .map(directoryPath => path.relative(componentsDirectory, directoryPath).replace('\\', '/'))

  const options = {
    componentsDirectories
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'plugins/index.js'),
    fileName: path.join(MODULE_NAME, 'plugins/index.js'),
    options,
    ssr: true
  })
}

import fs from 'fs'
import path from 'path'
import { promisify } from 'util'

const access = promisify(fs.access)

const isNodejsErrnoException = (err: unknown): err is NodeJS.ErrnoException => {
  if (err instanceof Error) {
    return Object.getOwnPropertyNames(err).includes('code')
  }
  return false
}

export const findUpwardsFile = async (filename: string, directory = process.cwd()): Promise<string | false> => {
  const parsedPath = path.parse(path.join(directory, filename))
  const targetFile = path.join(parsedPath.dir, parsedPath.base)
  let fileExists = false
  try {
    await access(targetFile)
    fileExists = true
  } catch (err) {
    const isFsError = isNodejsErrnoException(err)
    if (!isFsError || err.code !== 'ENOENT') throw err
  }
  if (fileExists) {
    // yay!
    return targetFile
  } else {
    if (parsedPath.dir === parsedPath.root) {
      // We're at the root of the filesystem. There's nowhere else to look.
      return false
    } else {
      // Keep digging
      return await findUpwardsFile(filename, path.dirname(directory))
    }
  }
}

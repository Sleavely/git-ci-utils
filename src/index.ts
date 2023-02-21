import { getDiffFiles, getPositiveDiffFiles } from './git'
import { getPullrequest } from './providers'

export { getPullrequest }

export const getChangedFiles = async (onlyAddedOrModified = false): Promise<string[]> => {
  // TODO: detect whether we are running in a PR or just a push-like context - getChangedFiles() should be able to work regardless of context
  const prProvider = getPullrequest()
  const commitRange = `${prProvider.destinationBranch}`

  const changedFiles = onlyAddedOrModified
    ? await getPositiveDiffFiles(commitRange)
    : await getDiffFiles(commitRange)
  return changedFiles
}

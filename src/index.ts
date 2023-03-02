import { fetch, getDiffFiles, getPositiveDiffFiles } from './git'
import { getPullrequest } from './providers'

export { getPullrequest }

export const getChangedFiles = async (onlyAddedOrModified = false): Promise<string[]> => {
  // TODO: detect whether we are running in a PR or just a push-like context - getChangedFiles() should be able to work regardless of context
  const prProvider = getPullrequest()

  // make sure the branch we want to diff against is there
  if (prProvider.name === 'Bitbucket') {
    await fetch(`${prProvider.destinationBranch}:${prProvider.destinationBranch}`)
  }

  const commitRange = `${prProvider.destinationBranch}`

  const changedFiles = onlyAddedOrModified
    ? await getPositiveDiffFiles(commitRange)
    : await getDiffFiles(commitRange)
  return changedFiles
}

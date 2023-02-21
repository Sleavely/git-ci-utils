import { getDiffFiles } from './git'
import { getPullrequest } from './providers'

export { getPullrequest }

export const getChangedFiles = async (): Promise<string[]> => {
  // TODO: detect whether we are running in a PR or just a push-like context - getChangedFiles() should be able to work regardless of context
  const prProvider = getPullrequest()
  const commitRange = `${prProvider.destinationBranch}`

  const changedFiles = await getDiffFiles(commitRange)
  return changedFiles
}

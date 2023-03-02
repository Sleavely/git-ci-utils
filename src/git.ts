import execute from './utils/execute'

/**
 * @param path
 * @param commitOrRange
 * @returns An array of commit hashes
 */
export const resolveCommits = async (path: string, commitOrRange: string): Promise<string[]> => {
  const stdout = await execute(`cd "${path}" && git log --format=%H ${commitOrRange}`)
  const commits = stdout.split('\n').filter(Boolean)

  // Check if the first commit is an exact or full version of the query
  if (commits[0].startsWith(commitOrRange)) return [commits[0]]

  return commits
}

/* Diffs */

/**
 * @param commitOrRange
 * @returns Lines that have been added or modified since commitOrRange
 */
export const getPositiveDiffLines = async (commitOrRange: string): Promise<string[]> => {
  const stdout = await execute(`git diff --diff-filter=d ${commitOrRange}`)
  return stdout.split('\n').filter(Boolean)
}

export const getDiffFiles = async (commitOrRange: string): Promise<string[]> => {
  const stdout = await execute(`git diff --name-only ${commitOrRange}`)
  return stdout.split('\n').filter(Boolean)
}

export const getPositiveDiffFiles = async (commitOrRange: string): Promise<string[]> => {
  return await getDiffFiles(`--diff-filter=d ${commitOrRange}`)
}

/* Remotes */

export const fetch = async (refspec: string, remote: string = 'origin'): Promise<string> => {
  const stdout = await execute(`git fetch ${remote} "${refspec}"`)
  return stdout
}

/* Tags */

export const tagExists = async (tagName: string): Promise<boolean> => {
  if (!tagName) throw new Error('No tagName supplied!')
  const stdout = await execute(`git tag -l ${tagName}`)
  return stdout.split('\n').filter(Boolean).length > 0
}

/**
 * Creates and pushes a tag to origin
 * @param tagName
 * @returns stdout for the tag operations
 */
export const saveTag = async (tagName: string): Promise<string> => {
  if (!tagName) throw new Error('No tagName supplied!')
  const tagOutput = await execute(`git tag -f ${tagName}`)
  const pushOutput = await execute(`git push -f origin ${tagName}`)
  return [tagOutput, pushOutput].join('\n')
}

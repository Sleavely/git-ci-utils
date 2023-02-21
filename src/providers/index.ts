import type PullrequestProvider from './PullRequestProvider'
import bitbucket from './bitbucket'
import github from './github'
import localhost from './localhost'

export const getPullrequest = (): PullrequestProvider => {
  if (!process.env.CI) return localhost
  if (process.env.BITBUCKET_PR_ID) return bitbucket
  if (process.env.GITHUB_BASE_REF) return github
  throw new Error('Not running in a PR context, or your CI environment is not supported yet')
}

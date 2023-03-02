import type PullrequestProvider from './PullRequestProvider'
import type { AnnotationReport, LineAnnotation, ReportSummary } from './PullRequestProvider'

// https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
const {
  GITHUB_REPOSITORY = '',
  GITHUB_REF = '',
  GITHUB_HEAD_REF = '',
  GITHUB_BASE_REF = '',
} = process.env

//

class GithubAnnotationReporter implements AnnotationReport {
  annotations: LineAnnotation[] = []

  addLine (annotation: LineAnnotation): void {
    this.annotations.push(annotation)
  }

  async send (summary: ReportSummary): Promise<boolean> {
    console.log(`::group::${summary.success ? '✅' : '❌'} ${summary.title}`)
    this.annotations
      .map(annotation => {
        // Turn our annotations into workflow commands
        // https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
        return `:error file=${annotation.filePath},line=${annotation.line},title=${annotation.title}::${annotation.message}`
      }).forEach(console.log)
    console.log('::endgroup::')

    return true
  }
}

const github: PullrequestProvider = {
  name: 'Github',

  get repository () {
    return GITHUB_REPOSITORY
  },
  get id () {
    return /^refs\/pull\/(\\d+)\/merge$/.exec(GITHUB_REF)?.[1] ?? ''
  },
  get sourceBranch () {
    return GITHUB_HEAD_REF
  },
  get destinationBranch () {
    return GITHUB_BASE_REF
  },

  createReport () {
    return new GithubAnnotationReporter()
  },
}

export default github

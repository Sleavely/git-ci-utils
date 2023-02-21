import phin from 'phin'
import type PullrequestProvider from './PullRequestProvider'
import type { AnnotationReport, LineAnnotation, ReportSummary } from './PullRequestProvider'

// https://support.atlassian.com/bitbucket-cloud/docs/variables-and-secrets/#Default-variables
const {
  BITBUCKET_REPO_FULL_NAME = '',
  BITBUCKET_PR_ID = '',
  BITBUCKET_BRANCH = '',
  BITBUCKET_PR_DESTINATION_BRANCH = '',

  BITBUCKET_COMMIT = '',
  BITBUCKET_BUILD_NUMBER = '',
} = process.env

const bitbucket: PullrequestProvider = {
  get repository () {
    return BITBUCKET_REPO_FULL_NAME
  },
  get id () {
    return BITBUCKET_PR_ID
  },
  get sourceBranch () {
    return BITBUCKET_BRANCH
  },
  get destinationBranch () {
    return BITBUCKET_PR_DESTINATION_BRANCH
  },

  createReport () {
    return new BitbucketAnnotationReporter()
  },
}

class BitbucketAnnotationReporter implements AnnotationReport {
  annotations: LineAnnotation[] = []

  addLine (annotation: LineAnnotation): void {
    this.annotations.push(annotation)
  }

  async send (summary: ReportSummary): Promise<void> {
    // Create a report that we can attach our annotations to.
    // Using the localhost proxy to avoid authenticating from inside Bitbucket Pipelines:
    // https://support.atlassian.com/bitbucket-cloud/docs/code-insights/#Authentication
    await phin({
      url: `http://localhost:29418/2.0/repositories/${BITBUCKET_REPO_FULL_NAME}/commit/${BITBUCKET_COMMIT}/reports/BAR-${BITBUCKET_BUILD_NUMBER}`,
      method: 'PUT',
      headers: {
        Host: 'api.bitbucket.org',
      },
      data: {
        report_type: 'TEST',
        title: summary.title,
        result: summary.success ? 'PASSED' : 'FAILED',
      },
    })

    const bitbuckifiedAnnotations = this.annotations
      .map((annotation, i) => {
        return {
          external_id: `BAR-annotation00${i + 1}`,
          annotation_type: 'CODE_SMELL',
          title: annotation.title,
          summary: annotation.message,
          path: annotation.filePath,
          line: annotation.line,
        }
      })

    // TODO: You can upload up to 100 annotations per POST request

    // TODO: a report can contain up to 1000 annotations

    // ok lets post them
    await phin({
      url: `http://localhost:29418/2.0/repositories/${BITBUCKET_REPO_FULL_NAME}/commit/${BITBUCKET_COMMIT}/reports/BAR-${BITBUCKET_BUILD_NUMBER}/annotations`,
      method: 'POST',
      headers: {
        Host: 'api.bitbucket.org',
      },
      data: bitbuckifiedAnnotations,
    })
  }
}

export default bitbucket

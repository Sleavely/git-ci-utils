export interface LineAnnotation {
  filePath: string
  line: number
  title: string
  message: string
}

export interface ReportSummary {
  title: string
  success: boolean
}

export interface AnnotationReport {
  addLine: (annotation: LineAnnotation) => void
  send: (summary: ReportSummary) => Promise<unknown>
}

export default interface PullrequestProvider {
  /**
   * Name of the provider
   * @example Bitbucket
   */
  name: string

  /**
   * @example user/repo-name
   */
  repository: string

  /**
   * @example 13
   */
  id: string

  /**
   * Name of the branch that was used to open the PR
   *
   * @example my-feature-branch
   */
  sourceBranch: string

  /**
   * The branch that the PR will merge into
   *
   * @example main
   */
  destinationBranch: string

  createReport?: () => AnnotationReport
}

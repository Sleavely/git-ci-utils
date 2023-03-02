import { execSync } from 'child_process'
import { basename } from 'path'
import type PullrequestProvider from './PullRequestProvider'
import type { AnnotationReport, LineAnnotation, ReportSummary } from './PullRequestProvider'

class LocalhostAnnotationReporter implements AnnotationReport {
  lineAnnotations: LineAnnotation[] = []

  addLine (annotation: LineAnnotation): void {
    this.lineAnnotations.push(annotation)
  }

  async send (summary: ReportSummary): Promise<boolean> {
    console.group(`${summary.success ? '✅' : '❌'} ${summary.title}`)

    const annotationsByFile = this.lineAnnotations
      .reduce<Record<string, LineAnnotation[]>>((output, annotation) => {
      if (!output[annotation.filePath]) output[annotation.filePath] = []
      output[annotation.filePath].push(annotation)
      return output
    }, {})

    Object.entries(annotationsByFile).forEach(([filePath, annotations]) => {
      console.group(`📄 ${filePath}\n`)
      annotations
        .map(annotation => {
        // Turn our annotations into workflow commands
        // https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions
          return `:error file=${filePath},line=${annotation.line},title=${annotation.title}::${annotation.message}`
        })
        .forEach(line => console.log(line))
      console.groupEnd()
    })
    console.groupEnd()

    this.lineAnnotations = []
    return true
  }
}

const localhost: PullrequestProvider = {
  name: 'localhost',

  get repository () {
    return basename(process.cwd())
  },
  get id () {
    return 'localhost'
  },
  get sourceBranch () {
    return 'HEAD'
  },

  get destinationBranch () {
    const originBranches = execSync(
      'git branch -r',
      { shell: 'bash', encoding: 'utf8' },
    )
      .split('\n')
      .map(str => str.trim().replace(/^origin\//, ''))
      .filter((ref) => ['main', 'master'].includes(ref))

    if (!originBranches.length) throw new Error('Could not find an "origin" remote with either a main or master branch.')
    // We're making a bet that theres only 1 of 'main' or 'master',
    // but if there are multiple... 🤷
    return originBranches[0]
  },

  createReport () {
    return new LocalhostAnnotationReporter()
  },
}

export default localhost

# git-ci-utils

Utilities for interacting with Git in CI environments

[ ![npm version](https://img.shields.io/npm/v/git-ci-utils.svg?style=flat) ](https://npmjs.org/package/git-ci-utils "View this project on npm") [ ![Issues](https://img.shields.io/github/issues/Sleavely/git-ci-utils.svg) ](https://github.com/Sleavely/git-ci-utils/issues)

## Usage

To annotate all the files that have changed, compared to the branch we aim to merge with.

```js
const ci = require('git-ci-utils')
const pr = ci.getPullrequest()
const report = pr.createReport()
const changedFiles = await ci.getChangedFiles()

for (const filePath of changedFiles) {
  report.addLine({filePath, line: 11, title: 'Hello', message: 'This is fun' })
}
report.send({ success: true, title: 'My Fancy Report' })
```

Depending on your provider, it may end up looking something like:

![](https://i.imgur.com/Hu7pTAl.png)

![](https://i.imgur.com/MLG7L6v.png)

### Supported PR providers

* Bitbucket
* Github
* localhost

### Notes on localhost usage

Because many of the environment variables that exist in a CI environment are going to be missing for you locally, _git-ci-utils_ makes some assumptions about your project.

Because there is no environment variable that tells git-ci-utils where you intend to merge your work later, it assumes the target branch is either `main` or `master`. It determines which to use by looking at your list of remote branches on `origin`.

### Environment variables

_git-ci-utils_ makes use of many environment variables for the PR providers, but there are a few you may want to tweak in some scenarios:

#### `DEBUG`

Set to `*` or `git-ci-utils:*` to enable verbose output for debugging. _git-ci-utils_ uses [_debug_](https://github.com/debug-js/debug)

#### `MAX_EXEC_BUFFER_MB`

The size of the buffer that holds output from shell commands. Normally you shouldn't have to change this value. The default is `10`.

## Similar projects and inspiration

Bitbucket-specific

* [Code Insights | Bitbucket Cloud](https://support.atlassian.com/bitbucket-cloud/docs/code-insights/)
* [bpr-npm-audit](https://github.com/saibotsivad/bpr-npm-audit)
* [eslint-formatter-bitbucket-reports](https://github.com/spartez/eslint-formatter-bitbucket-reports)

Github-specific

* [Workflow commands for Github Actions](https://docs.github.com/en/actions/using-workflows/workflow-commands-for-github-actions#example-creating-an-annotation-for-an-error)
* [eslint-annotate-action](https://github.com/ataylorme/eslint-annotate-action)

## License

This project uses the MIT license. See [LICENSE.md](./LICENSE.md)

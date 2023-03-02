# Changelog

## [1.2.0](https://github.com/Sleavely/git-ci-utils/compare/v1.1.2...v1.2.0) (2023-03-02)


### Features

* support DEBUG environment variable ([fc547ff](https://github.com/Sleavely/git-ci-utils/commit/fc547ff7b6293d604714012d85d8d0157e211fd5))


### Bug Fixes

* use correct casing when checking for Bitbucket provider ([b412672](https://github.com/Sleavely/git-ci-utils/commit/b4126725392567d3cfde6b0d1aad5cbf7622b6f5))

## [1.1.2](https://github.com/Sleavely/git-ci-utils/compare/v1.1.1...v1.1.2) (2023-03-02)


### Bug Fixes

* include failing command in error messages when exec fails ([8f9f804](https://github.com/Sleavely/git-ci-utils/commit/8f9f804341ff2c905417bd2abbbad459aea0a37f))

## [1.1.1](https://github.com/Sleavely/git-ci-utils/compare/v1.1.0...v1.1.1) (2023-03-02)


### Bug Fixes

* **bitbucket:** fetch destination branch prior to diffing ([8318ce1](https://github.com/Sleavely/git-ci-utils/commit/8318ce18406c2ab172d52e8b5e6a24f68f4cc7b2)), closes [#6](https://github.com/Sleavely/git-ci-utils/issues/6)

## [1.1.0](https://github.com/Sleavely/git-ci-utils/compare/v1.0.3...v1.1.0) (2023-02-21)


### Features

* onlyAddedOrModified filter for getChangedFiles() ([6a00bd9](https://github.com/Sleavely/git-ci-utils/commit/6a00bd93470c6860afb48d119f36d154c5cb6290))


### Bug Fixes

* remove unnecessary console.log ([3cd0cbf](https://github.com/Sleavely/git-ci-utils/commit/3cd0cbff8274658f52855145afc0776bacd02a0a))

## [1.0.3](https://github.com/Sleavely/git-ci-utils/compare/v1.0.2...v1.0.3) (2023-02-21)


### Bug Fixes

* use correct path to index.js ([9b9afd3](https://github.com/Sleavely/git-ci-utils/commit/9b9afd3f84d2469b57ceba03241ff64772a65b2b))

## [1.0.2](https://github.com/Sleavely/git-ci-utils/compare/v1.0.1...v1.0.2) (2023-02-21)


### Bug Fixes

* rename PullRequestProvider to avoid it being ignored by tsc ([638a8f2](https://github.com/Sleavely/git-ci-utils/commit/638a8f231d2f1bc00b07362679e0e70acd8e0fb1))

## [1.0.1](https://github.com/Sleavely/git-ci-utils/compare/v1.0.0...v1.0.1) (2023-02-21)


### Bug Fixes

* remove reference to `bin` as git-ci-utils has no CLI ([d316a41](https://github.com/Sleavely/git-ci-utils/commit/d316a41e997125e22e6e29cd62d8167ffbfbe030))

## 1.0.0 (2023-02-21)


### ⚠ BREAKING CHANGES

* initial release

### Features

* initial release ([26112ff](https://github.com/Sleavely/git-ci-utils/commit/26112ff576ad5211f78f874db3071ad6325521a3))

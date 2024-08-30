# Changelog

## [4.0.0](https://github.com/mmarchini-oss/node-observe/compare/v3.0.0...v4.0.0) (2024-08-30)


### ⚠ BREAKING CHANGES

* drop support for Node.js 10, 12, 14
* change default --host to 127.0.0.1
* first stable release

### Features

* add --close flag ([51f44d4](https://github.com/mmarchini-oss/node-observe/commit/51f44d4c203dbf588463613a7627c64b984b1252))
* add badges ([28af2d2](https://github.com/mmarchini-oss/node-observe/commit/28af2d2b20fcd96a87fbc7d5c525357e57c2088b))
* add cpu-profile (experimental, untested) ([e885528](https://github.com/mmarchini-oss/node-observe/commit/e885528460de0dc7782babbe4de60fe3635886db))
* add executables tests ([7df6965](https://github.com/mmarchini-oss/node-observe/commit/7df69650d14a9ec43c57fc010040bbb73e25d3d3))
* add experimental custom-script tool (undocumented) ([39208d4](https://github.com/mmarchini-oss/node-observe/commit/39208d49c29fff33c79af58679f00e155fbaffef))
* add interval config for cpu profiler ([e391c38](https://github.com/mmarchini-oss/node-observe/commit/e391c3847fc799dbf1781eb02dd2448e1b29995e))
* add readme ([3d7fe94](https://github.com/mmarchini-oss/node-observe/commit/3d7fe94608ca162820268adf17c35e8b07122e50))
* add release-please action ([277f601](https://github.com/mmarchini-oss/node-observe/commit/277f60151f6e4abd314f29baf4ac34bfe9645ae7))
* change default --host to 127.0.0.1 ([1b94e27](https://github.com/mmarchini-oss/node-observe/commit/1b94e2794ac5082235b12f00fe6657f34fa105b9))
* change default branch name ([566358c](https://github.com/mmarchini-oss/node-observe/commit/566358ce2844c5d67233cafdc7acce23369ef5f9))
* check if inspector port is open before connecting ([b0d3417](https://github.com/mmarchini-oss/node-observe/commit/b0d341748642fdc5ba72a9d16be8842088a4cec2))
* drop support for Node.js 10, 12, 14 ([37680d0](https://github.com/mmarchini-oss/node-observe/commit/37680d0bd203642ebfbfeda8afe11370866be0c2))
* enable Actions for CI ([ddeb844](https://github.com/mmarchini-oss/node-observe/commit/ddeb8445e90cc28dd3d269e934c79daaf733af55))
* expose observe as a binary ([72f9600](https://github.com/mmarchini-oss/node-observe/commit/72f9600a4b89aa461bf5a2af1aa4ff5c31cf93ff))
* first stable release ([183c9cb](https://github.com/mmarchini-oss/node-observe/commit/183c9cb719ca750993f91b4a28a7eff230c6c73b))
* heap profile and snapshot ([a99a8cb](https://github.com/mmarchini-oss/node-observe/commit/a99a8cb298722a9345045631b62f3f1c17fcdeff))
* let Actions publish the package ([13a1ad6](https://github.com/mmarchini-oss/node-observe/commit/13a1ad6b45893d949309a8938eab19178d7edeb4))
* output to file with -f ([076af02](https://github.com/mmarchini-oss/node-observe/commit/076af020427eac3d5f7eaa75317e9b95f7e05ead))
* publish as bundled pkg binary ([58109a8](https://github.com/mmarchini-oss/node-observe/commit/58109a84445c99cba3e3812cca82e2c9370042df))


### Bug Fixes

* attempt to fix release-please -&gt; pkg ([fe32f4e](https://github.com/mmarchini-oss/node-observe/commit/fe32f4e4b91b2baf17596d7db164237bdac8f054))
* **ci:** fix syntax for release event ([a02f9c7](https://github.com/mmarchini-oss/node-observe/commit/a02f9c76551e326cf3610edfcb923a8e5fc3cb97))
* **ci:** syntax error on release-please ([7c4a45b](https://github.com/mmarchini-oss/node-observe/commit/7c4a45b1293a46128c506878061f855040cd8579))
* **ci:** use right version for setup-node ([eb618be](https://github.com/mmarchini-oss/node-observe/commit/eb618bec9432c54e31b22fd1d27a87d6fa1947f5))
* **client:** catch unhandledException ([f683b19](https://github.com/mmarchini-oss/node-observe/commit/f683b1989d54216f76261644bfa70e436ab5062a))
* fix codecov link on README ([b9d5e35](https://github.com/mmarchini-oss/node-observe/commit/b9d5e35dbcb096aefd6e856ffaf9f52c0d8ff4c1))
* **profiles:** fix encoding of profiles on Node.js v16+ ([ab0f580](https://github.com/mmarchini-oss/node-observe/commit/ab0f58006c586faff9d5d811572a769b23131557))
* update badges to match new repo ([c6e313a](https://github.com/mmarchini-oss/node-observe/commit/c6e313a40e9ad180584244cf8b0dd4ca5ab38a1f))

## [3.0.0](https://github.com/mmarchini-oss/node-observe/compare/v2.0.0...v3.0.0) (2024-08-30)


### ⚠ BREAKING CHANGES

* drop support for Node.js 10, 12, 14

### Features

* add experimental custom-script tool (undocumented) ([39208d4](https://github.com/mmarchini-oss/node-observe/commit/39208d49c29fff33c79af58679f00e155fbaffef))
* drop support for Node.js 10, 12, 14 ([37680d0](https://github.com/mmarchini-oss/node-observe/commit/37680d0bd203642ebfbfeda8afe11370866be0c2))

## [2.0.0](https://github.com/mmarchini-oss/node-observe/compare/v1.1.0...v2.0.0) (2023-07-15)


### ⚠ BREAKING CHANGES

* change default --host to 127.0.0.1

### Features

* change default --host to 127.0.0.1 ([1b94e27](https://github.com/mmarchini-oss/node-observe/commit/1b94e2794ac5082235b12f00fe6657f34fa105b9))
* check if inspector port is open before connecting ([b0d3417](https://github.com/mmarchini-oss/node-observe/commit/b0d341748642fdc5ba72a9d16be8842088a4cec2))

## [1.1.0](https://github.com/mmarchini-oss/node-observe/compare/v1.0.1...v1.1.0) (2023-06-21)


### Features

* add --close flag ([51f44d4](https://github.com/mmarchini-oss/node-observe/commit/51f44d4c203dbf588463613a7627c64b984b1252))

### [1.0.1](https://www.github.com/mmarchini-oss/node-observe/compare/v1.0.0...v1.0.1) (2022-11-07)


### Bug Fixes

* **client:** catch unhandledException ([f683b19](https://www.github.com/mmarchini-oss/node-observe/commit/f683b1989d54216f76261644bfa70e436ab5062a))
* **profiles:** fix encoding of profiles on Node.js v16+ ([ab0f580](https://www.github.com/mmarchini-oss/node-observe/commit/ab0f58006c586faff9d5d811572a769b23131557))

## [1.0.0](https://www.github.com/mmarchini-oss/node-observe/compare/v0.2.1...v1.0.0) (2020-07-23)


### ⚠ BREAKING CHANGES

* first stable release

### Features

* first stable release ([183c9cb](https://www.github.com/mmarchini-oss/node-observe/commit/183c9cb719ca750993f91b4a28a7eff230c6c73b))

### [0.2.1](https://www.github.com/mmarchini-oss/node-observe/compare/v0.2.0...v0.2.1) (2020-07-22)


### Bug Fixes

* attempt to fix release-please -> pkg ([fe32f4e](https://www.github.com/mmarchini-oss/node-observe/commit/fe32f4e4b91b2baf17596d7db164237bdac8f054))

## [0.2.0](https://www.github.com/mmarchini-oss/node-observe/compare/v0.1.2...v0.2.0) (2020-07-22)


### Features

* add release-please action ([277f601](https://www.github.com/mmarchini-oss/node-observe/commit/277f60151f6e4abd314f29baf4ac34bfe9645ae7))
* change default branch name ([566358c](https://www.github.com/mmarchini-oss/node-observe/commit/566358ce2844c5d67233cafdc7acce23369ef5f9))


### Bug Fixes

* **ci:** fix syntax for release event ([a02f9c7](https://www.github.com/mmarchini-oss/node-observe/commit/a02f9c76551e326cf3610edfcb923a8e5fc3cb97))
* **ci:** syntax error on release-please ([7c4a45b](https://www.github.com/mmarchini-oss/node-observe/commit/7c4a45b1293a46128c506878061f855040cd8579))
* **ci:** use right version for setup-node ([eb618be](https://www.github.com/mmarchini-oss/node-observe/commit/eb618bec9432c54e31b22fd1d27a87d6fa1947f5))
* update badges to match new repo ([c6e313a](https://www.github.com/mmarchini-oss/node-observe/commit/c6e313a40e9ad180584244cf8b0dd4ca5ab38a1f))

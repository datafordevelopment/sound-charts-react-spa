# About

**sound-charts-react-spa** is a ReactJS based front-end for the [Soundcloud Top 100 API](https://github.com/nazar/sound-charts-api) server.

This is an experimental application that displays the calculated daily top 100 Soundcloud tracks based on playback counts.

Previously I used AngularJS to build the initial [frontend](https://github.com/nazar/sound-charts-spa) (to learn AngularJS and Grunt) and this version was used this to learn the following:

* ReactJS
* Webpack
* Gulp

All awesome stacks!!1

# Development Environment Provisioning

Please read the [Provisioning](./docs/provision.md) section for setting up the development environment.

# Linting

An [.eslintrc](./eslintrc) is provided for [ESLint](http://eslint.org/) but the eslint packages are not listed in [package.json](./package.json) as
  the eslint modules are required for the client machine (and not the development server).

To install JSX compatible ESLint modules:

```
npm install -g eslint eslint-plugin-react
```
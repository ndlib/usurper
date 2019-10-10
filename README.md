# Usurper
[Hesburgh Library](https://library.nd.edu) website frontend written in [React](https://reactjs.org/) and [Redux](https://redux.js.org). It relies primarly on [Contentful](https://www.contentful.com/) as a headless CMS for content as well as multiple custom microservices.

[![Build Status](https://travis-ci.org/ndlib/usurper.svg?branch=master)](https://travis-ci.org/ndlib/usurper)
[![Test Coverage](https://api.codeclimate.com/v1/badges/5548f01befa9e0e610fb/test_coverage)](https://codeclimate.com/github/ndlib/usurper/test_coverage)
[![Code Climate](https://api.codeclimate.com/v1/badges/5548f01befa9e0e610fb/maintainability)](https://codeclimate.com/github/ndlib/usurper)
[![Known Vulnerabilities](https://snyk.io/test/github/ndlib/usurper/badge.svg)](https://snyk.io/test/github/ndlib/usurper)

## Table of Content

 * [Related Projects](#related-projects)
 * [Setup and Installation](#setup-and-installation)
  * [First Install](#first-install)
    * [Prerequisites](#prerequisites)
    * [Project Install](#project-install)
    * [Recommended Utilities](#recommended-utilities)
  * [Running Locally](#running-locally)
  * [Running Tests](#running-tests)
 * [Deployment to AWS](#deployment-to-aws)
 * [Quality and User Acceptance Testing](#quality-and-user-acceptance-testing)


## Related Projects

* [Classes API](https://github.com/ndlib/classes_api)
* [Contentful Aleph](https://github.com/ndlib/contentful_aleph) - Contentful hook to populate aleph data
* [Contentful Data Migration](https://github.com/ndlib/contentful-data-migration) - A utility written in python to make data migrations in contentful easier to write.
* [Contentful Slug Checker](https://github.com/ndlib/contentfulSlugChecker) - Contentful UI plugin to check slugs against all other content types.
* [Drapes](https://github.com/ndlib/drapes) - Hesburgh utility to wrap various (non-Usurper) webpages with a defined template.
* [ESU Web Renovation](https://github.com/ndlib/esu-webrenovation) - ESU Web Renovation Ansible Deployment.
* [GateKeeper](https://github.com/ndlib/gatekeeper) - Library Portal Resources API.
* [Hesburgh Utilities](https://github.com/ndlib/hesburgh_utilities) - Utilities shared across multiple projects.
* [Lambda Auth](https://github.com/ndlib/lambda_auth) - Custom Authorizers for AWS Lambda.
* [Monarch Libguides](https://github.com/ndlib/monarch_libguides)
* [Recommendation Engine](https://github.com/ndlib/recommendation_engine) - Engine for the library website to recommend resources to users based on their information.
* [User Preferences](https://github.com/ndlib/user_preferences) - A microservice to store and query user preferences.
* [Usurper Content](https://github.com/ndlib/usurper_content) - Transforms content from the website's Contentful space for easier consumption by the front-end (usurper).
* [Viceroy](https://github.com/ndlib/viceroy) - Barebones rails application to support CAS login.

## Setup and Installation

### First Install

#### Prerequisites
  * `/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`
  * `brew install git nvm`
  * `nvm install v8`
  * `npm install -g yarn`
  *  Add `nvm` and `yarn` to bash path.
  *  Node Version > 8

#### Project Install
  * `git clone git@github.com:ndlib/usurper.git`
  * `cd usurper`
  * `yarn`

#### Recommended Utilities
  * [React Developer Tools (Chrome plug-in)](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  * [Redux Developer Tools (Chrome plug-in)](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

### Building the urls from the exports
Before running, you will need to build the config file. All URLs and parameters needed are stored in AWS; run the following to fetch them locally.

  * `cd scripts`
  * `yarn install`
  * assume a role that can access the exports (or use `aws-vault`)
  * `node buildConfig.js stage=dev`

### Running Locally
* `yarn start`
* Open browser to http://localhost:3000

### Running Tests

* `yarn test`

## Branching Strategy
We have two main branches, `master` and `prep`. `master` is "production ready" and is what ends up getting tagged and deployed to production. `prep` is what all branches get merged into for testing and User Aceptance (UA). All development branches should start off of master, be iterated on, and merged into `prep` (with a pull request). After the changes are accepted, that branch may then be merged into `master` and deleted. Remember, the **feature branch** is merged into `master`, **not `prep` directly**. This also means **`prep` should not be merged into your development branch at any time**. We don't want to accidentally get unapproved changes into master.

## Deployment to AWS
A continuous integration pipeline handles all build and deployment to test environments. There is a pipeline for the `prep` branch which is triggered on each push; these changes get deployed to https://prep.library.nd.edu/. The production pipeline is based on `master`. In order to allow for batches of changes to be easily grouped and released together, checkout `master` and run `./release.sh` from the root. This should do everything necessary to prepare a release candidate and kick off the pipeline.

## Quality and User Acceptance Testing

### Big Thanks

Cross-browser Testing Platform and Open Source <3 Provided by [Sauce Labs][homepage]

[![](src/static/images/SauceLabs.svg)][homepage]

[homepage]: https://saucelabs.com

# Usurper
[Hesburgh Library](https://library.nd.edu) website frontend written in [React](https://reactjs.org/) and [Redux](https://redux.js.org). It relies primarly on [Contentful](https://www.contentful.com/) as a headless CMS for content as well as multiple custom microservices.

[![Build Status](https://travis-ci.org/ndlib/usurper.svg?branch=master)](https://travis-ci.org/ndlib/usurper)
[![Coverage Status](https://img.shields.io/coveralls/ndlib/usurper.svg)](https://coveralls.io/r/ndlib/usurper?branch=master)
[![Code Climate](https://codeclimate.com/github/ndlib/usurper/badges/gpa.svg)](https://codeclimate.com/github/ndlib/usurper)
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
  * [Development Deployment](#development-deployment)
  * [Alpha and Beta Deployment](#alpha-and-beta-deployment)
  * [Production Deployment](#production-deployment)
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
  * Add `nvm` and `yarn` to bash path.

#### Project Install
  * `git clone git@github.com:ndlib/usurper.git`
  * `cd usurper`
  * `yarn`

#### Recommended Utilities
  * [React Developer Tools (Chrome plug-in)](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en)
  * [Redux Developer Tools (Chrome plug-in)](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en)

### Building the urls from the exports
  To build the apis call this.
  * `node buildApiUrls.js stage=devJon`
  This must be done before you start the application.

### Running Locally

* `yarn start`
* Open browser to http://localhost:3000

### Running Tests

* `yarn test`

## Branching Strategy
We have two main branches, `master` and `UA`. `Master` is "production ready" and is what ends up getting tagged and deployed to production. `UA` is what all branches get merged into for testing and User Aceptance (UA). All development branches should start off of master, interated on and merged into `UA`. After the changes are accepted, that branch may then be merged into `master` and deleted. Remember the **branch** is merged into master, **not UA directly**. This also means **UA should not be merged into your development branch at any time**. We don't want to accidentally get unapproved changes into master.

## Deployment to AWS

### Development deployment

### Alpha and Beta deployment

### Production Deployment

## Quality and User Acceptance Testing

'use strict'

const genConfig = () => {
  let config = {}
  if (process.env.NODE_ENV === 'development') {
    // development
    config = {
      viceroyAPI: 'https://viceroy-dev.library.nd.edu',
      personAPI: 'https://suwnxx7rbi.execute-api.us-east-1.amazonaws.com/dev',
      recommendAPI: 'https://otlwuy48s9.execute-api.us-east-1.amazonaws.com/dev',
      coursesAPI: 'https://z9mcxr7u92.execute-api.us-east-1.amazonaws.com/dev',
      resourcesAPI: 'https://p5gotxkf09.execute-api.us-east-1.amazonaws.com/dev',
      illiadBaseURL: 'https://nd.illiad.oclc.org/illiad/IND/testweb/illiad.dll?Action=10&Form=<<form>>&Value=<<value>>',
      hoursAPIURL: 'https://g72i6y2qnj.execute-api.us-east-1.amazonaws.com/dev',
      contentfulAPI: 'https://bj5rh8poa7.execute-api.us-east-1.amazonaws.com/dev',
    }
  } else {
    // production
    config = {
      viceroyAPI: 'https://viceroy-dev.library.nd.edu',
      personAPI: 'https://suwnxx7rbi.execute-api.us-east-1.amazonaws.com/dev',
      recommendAPI: 'https://xs41f4ps1h.execute-api.us-east-1.amazonaws.com/prod',
      coursesAPI: 'https://z9mcxr7u92.execute-api.us-east-1.amazonaws.com/dev',
      resourcesAPI: 'https://5398vu5tn3.execute-api.us-east-1.amazonaws.com/prod',
      illiadBaseURL: 'https://nd.illiad.oclc.org/illiad/IND/testweb/illiad.dll?Action=10&Form=<<form>>&Value=<<value>>',
      hoursAPIURL: 'https://vpiagfrrhk.execute-api.us-east-1.amazonaws.com/prod',
      contentfulAPI: 'https://opd6yh4ecc.execute-api.us-east-1.amazonaws.com/prod',
    }
  }

  return { __APP_CONFIG__: JSON.stringify(config) }
}

module.exports = genConfig

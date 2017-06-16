'use strict'

const genConfig = () => {
  let defaultConfig = {
    viceroyAPI: 'https://viceroy-dev.library.nd.edu',
    personAPI: 'https://suwnxx7rbi.execute-api.us-east-1.amazonaws.com/dev',
    recommendAPI: 'https://otlwuy48s9.execute-api.us-east-1.amazonaws.com/dev',
    coursesAPI: 'https://z9mcxr7u92.execute-api.us-east-1.amazonaws.com/dev',
    resourcesAPI: 'https://p5gotxkf09.execute-api.us-east-1.amazonaws.com/dev',
    illiadBaseURL: 'https://nd.illiad.oclc.org/illiad/IND/testweb/illiad.dll?Action=10&Form=<<form>>&Value=<<value>>',
    hoursAPIURL: 'https://g72i6y2qnj.execute-api.us-east-1.amazonaws.com/dev',
    contentfulAPI: 'https://bj5rh8poa7.execute-api.us-east-1.amazonaws.com/dev',
  }

  let config = {
    viceroyAPI: process.env.VICEROY_API ? process.env.VICEROY_API : defaultConfig.viceroyAPI,
    personAPI: process.env.PERSON_API ? process.env.PERSON_API : defaultConfig.personAPI,
    recommendAPI: process.env.RECOMMEND_API ? process.env.RECOMMEND_API : defaultConfig.recommendAPI,
    coursesAPI: process.env.COURSES_API ? process.env.COURSES_API : defaultConfig.coursesAPI,
    resourcesAPI: process.env.RESOURCES_API ? process.env.RESOURCES_API : defaultConfig.resourcesAPI,
    illiadBaseURL: process.env.ILLIAD_BASE_URL ? process.env.ILLIAD_BASE_URL : defaultConfig.illiadBaseURL,
    hoursAPIURL: process.env.HOURS_API_URL ? process.env.HOURS_API_URL : defaultConfig.hoursAPIURL,
    contentfulAPI: process.env.CONTENTFUL_API ? process.env.CONTENTFUL_API : defaultConfig.contentfulAPI,
  }

  return { __APP_CONFIG__: JSON.stringify(config) }
}

module.exports = genConfig

'use strict'

const genConfig = () => {
  let defaultConfig = {
    viceroyAPI: 'https://viceroy-dev.library.nd.edu',
    recommendAPI: 'https://2ufw8jzu3d.execute-api.us-east-1.amazonaws.com/dev',
    coursesAPI: 'https://unauxwjiml.execute-api.us-east-1.amazonaws.com/dev',
    resourcesAPI: 'https://p5gotxkf09.execute-api.us-east-1.amazonaws.com/dev',
    illiadBaseURL: 'https://nd.illiad.oclc.org/illiad/IND/testweb/illiad.dll?Action=10&Form=<<form>>&Value=<<value>>',
    hoursAPIURL: 'https://3nmbw29969.execute-api.us-east-1.amazonaws.com/dev',
    contentfulAPI: 'https://bj5rh8poa7.execute-api.us-east-1.amazonaws.com/dev',
    serviceNowBaseURL: 'https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936',
    version: 'dev',
    googleAnalyticsId: 'UA-2118378-47',
  }

  let config = {
    viceroyAPI: process.env.VICEROY_API ? process.env.VICEROY_API : defaultConfig.viceroyAPI,
    recommendAPI: process.env.RECOMMEND_API ? process.env.RECOMMEND_API : defaultConfig.recommendAPI,
    coursesAPI: process.env.COURSES_API ? process.env.COURSES_API : defaultConfig.coursesAPI,
    resourcesAPI: process.env.RESOURCES_API ? process.env.RESOURCES_API : defaultConfig.resourcesAPI,
    illiadBaseURL: process.env.ILLIAD_BASE_URL ? process.env.ILLIAD_BASE_URL : defaultConfig.illiadBaseURL,
    hoursAPIURL: process.env.HOURS_API_URL ? process.env.HOURS_API_URL : defaultConfig.hoursAPIURL,
    contentfulAPI: process.env.CONTENTFUL_API ? process.env.CONTENTFUL_API : defaultConfig.contentfulAPI,
    serviceNowBaseURL: process.env.SERVICE_NOW_BASE_URL ? process.env.SERVICE_NOW_BASE_URL : defaultConfig.serviceNowBaseURL,
    version: process.env.VERSION ? process.env.VERSION : defaultConfig.version,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID ? process.env.GOOGLE_ANALYTICS_ID : defaultConfig.googleAnalyticsId,
  }

  return { __APP_CONFIG__: JSON.stringify(config) }
}

module.exports = genConfig

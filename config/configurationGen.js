let apiUrls = require('./apiUrls.js')

const genConfig = () => {
  let defaultConfig = {
    viceroyAPI: 'https://viceroy.library.nd.edu',
    recommendAPI: apiUrls.recommendEngine,
    coursesAPI: apiUrls.classesAPI,
    resourcesAPI: apiUrls.gatekeeper,
    illiadBaseURL: 'https://nd.illiad.oclc.org/illiad/IND/testweb/illiad.dll?Action=10&Form=<<form>>&Value=<<value>>',
    hoursAPIURL: apiUrls.monarchLibguides,
    contentfulAPI: apiUrls.contentfuldirect,
    mapsAPI: apiUrls.contentfulmaps,
    serviceNowBaseURL: 'https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936',
    version: 'dev',
    googleAnalyticsId: 'UA-2118378-47',
    gcseKey: 'AIzaSyB_6LUEVAh1vpBYJf2Vgek400yED_5JoFs',
    gcseCx: '001452912042603251148:ennfqj6miti',
  }

  let config = {
    viceroyAPI: process.env.VICEROY_API ? process.env.VICEROY_API : defaultConfig.viceroyAPI,
    recommendAPI: process.env.RECOMMEND_API ? process.env.RECOMMEND_API : defaultConfig.recommendAPI,
    coursesAPI: process.env.COURSES_API ? process.env.COURSES_API : defaultConfig.coursesAPI,
    resourcesAPI: process.env.RESOURCES_API ? process.env.RESOURCES_API : defaultConfig.resourcesAPI,
    illiadBaseURL: process.env.ILLIAD_BASE_URL ? process.env.ILLIAD_BASE_URL : defaultConfig.illiadBaseURL,
    hoursAPIURL: process.env.HOURS_API_URL ? process.env.HOURS_API_URL : defaultConfig.hoursAPIURL,
    contentfulAPI: process.env.CONTENTFUL_API ? process.env.CONTENTFUL_API : defaultConfig.contentfulAPI,
    mapsAPI: process.env.MAPS_API ? process.env.MAPS_API : defaultConfig.mapsAPI,
    serviceNowBaseURL: process.env.SERVICE_NOW_BASE_URL ? process.env.SERVICE_NOW_BASE_URL : defaultConfig.serviceNowBaseURL,
    version: process.env.VERSION ? process.env.VERSION : defaultConfig.version,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID ? process.env.GOOGLE_ANALYTICS_ID : defaultConfig.googleAnalyticsId,
    gcseKey:  process.env.GCSE_KEY ? process.env.GCSE_KEY : defaultConfig.gcseKey,
    gcseCx:  process.env.GCSE_CX ? process.env.GCSE_CX : defaultConfig.gcseCx,
  }

  return { __APP_CONFIG__: JSON.stringify(config) }
}

module.exports = genConfig

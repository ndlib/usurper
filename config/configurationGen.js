const parameters = require('./configParameters.js')

const genConfig = () => {
  const defaultConfig = {
    viceroyAPI: parameters.viceroy,
    recommendAPI: parameters.recommendEngine,
    coursesAPI: parameters.classesAPI,
    resourcesAPI: parameters.gatekeeper,
    illiadBaseURL: parameters.illiad + '?Action=10&Form=<<form>>&Value=<<value>>',
    hoursAPIURL: parameters.monarchLibguides,
    contentfulAPI: parameters.contentfuldirect,
    mapsAPI: parameters.contentfulmaps,
    serviceNowBaseURL: 'https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936',
    userPrefsAPI: parameters.userPreferences,
    version: parameters.version,
    googleAnalyticsId: parameters.googleAnalyticsId,
    gcseKey: parameters.gcseKey,
    gcseCx: parameters.gcseCx,
    onesearchBaseURL: parameters.onesearch,
    features: {
      favoritesEnabled: parameters.favoritesEnabled || false,
      subjectFilteringEnabled: parameters.subjectFilteringEnabled || false,
    },
  }

  const config = {
    viceroyAPI: process.env.VICEROY_API ? process.env.VICEROY_API : defaultConfig.viceroyAPI,
    recommendAPI: process.env.RECOMMEND_API ? process.env.RECOMMEND_API : defaultConfig.recommendAPI,
    coursesAPI: process.env.COURSES_API ? process.env.COURSES_API : defaultConfig.coursesAPI,
    resourcesAPI: process.env.RESOURCES_API ? process.env.RESOURCES_API : defaultConfig.resourcesAPI,
    illiadBaseURL: process.env.ILLIAD_BASE_URL ? process.env.ILLIAD_BASE_URL : defaultConfig.illiadBaseURL,
    hoursAPIURL: process.env.HOURS_API_URL ? process.env.HOURS_API_URL : defaultConfig.hoursAPIURL,
    contentfulAPI: process.env.CONTENTFUL_API ? process.env.CONTENTFUL_API : defaultConfig.contentfulAPI,
    mapsAPI: process.env.MAPS_API ? process.env.MAPS_API : defaultConfig.mapsAPI,
    serviceNowBaseURL: process.env.SERVICE_NOW_BASE_URL ? process.env.SERVICE_NOW_BASE_URL : defaultConfig.serviceNowBaseURL,
    userPrefsAPI: process.env.USER_PREF_API ? process.env.USER_PREF_API : defaultConfig.userPrefsAPI,
    version: process.env.VERSION ? process.env.VERSION : defaultConfig.version,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID ? process.env.GOOGLE_ANALYTICS_ID : defaultConfig.googleAnalyticsId,
    gcseKey:  process.env.GCSE_KEY ? process.env.GCSE_KEY : defaultConfig.gcseKey,
    gcseCx:  process.env.GCSE_CX ? process.env.GCSE_CX : defaultConfig.gcseCx,
    onesearchBaseURL: process.env.ONESEARCH_BASE_URL ? process.env.ONESEARCH_BASE_URL : defaultConfig.onesearchBaseURL,
    features: {
      favoritesEnabled: process.env.ENABLE_FAVORITES ? process.env.ENABLE_FAVORITES : defaultConfig.features.favoritesEnabled,
      subjectFilteringEnabled: process.env.ENABLE_SUBJECT_FILTERING ? process.env.ENABLE_SUBJECT_FILTERING : defaultConfig.features.subjectFilteringEnabled,
    },
  }

  return { __APP_CONFIG__: JSON.stringify(config) }
}

module.exports = genConfig

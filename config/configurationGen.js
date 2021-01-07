const parameters = require('./configParameters.js')

const genConfig = () => {
  const defaultConfig = {
    recommendAPI: parameters.recommendEngine,
    coursesAPI: parameters.classesAPI,
    alephGatewayAPI: parameters.alephgateway,
    illiadGatewayAPI: parameters.illiadgateway,
    illiadBaseURL: parameters.illiad + '?Action=10&Form=<<form>>&Value=<<value>>',
    hoursAPIURL: parameters.monarchLibguides,
    contentfulAPI: parameters.contentfuldirect,
    mapsAPI: parameters.contentfulmaps,
    serviceNowBaseURL: 'https://nd.service-now.com/nd_portal?id=sc_cat_item&sys_id=1198d67ddb4a7240de73f5161d961936',
    userPrefsAPI: parameters.userPreferences,
    libcalGatewayAPI: parameters.libcalgateway,
    environment: parameters.environment,
    version: parameters.version,
    googleAnalyticsId: parameters.googleAnalyticsId,
    gcseKey: parameters.gcseKey,
    gcseCx: parameters.gcseCx,
    onesearchBaseURL: parameters.onesearch,
    features: {
      subjectFilteringEnabled: parameters.subjectFilteringEnabled || false,
      loginEnabled: parameters.loginEnabled || false,
      exhibitsEnabled: parameters.exhibitsEnabled || false,
    },
    oktaClientId: parameters.oktaClientId || 'OKTA_CLIENT_ID_DEFAULT',
    oktaIssuer: parameters.oktaIssuer || 'https://okta.nd.edu/oauth2/default',
  }

  const config = {
    recommendAPI: process.env.RECOMMEND_API ? process.env.RECOMMEND_API : defaultConfig.recommendAPI,
    coursesAPI: process.env.COURSES_API ? process.env.COURSES_API : defaultConfig.coursesAPI,
    alephGatewayAPI: process.env.ALEPH_GATEWAY_API ? process.env.ALEPH_GATEWAY_API : defaultConfig.alephGatewayAPI,
    illiadGatewayAPI: process.env.ILLIAD_GATEWAY_API ? process.env.ILLIAD_GATEWAY_API : defaultConfig.illiadGatewayAPI,
    illiadBaseURL: process.env.ILLIAD_BASE_URL ? process.env.ILLIAD_BASE_URL : defaultConfig.illiadBaseURL,
    hoursAPIURL: process.env.HOURS_API_URL ? process.env.HOURS_API_URL : defaultConfig.hoursAPIURL,
    contentfulAPI: process.env.CONTENTFUL_API ? process.env.CONTENTFUL_API : defaultConfig.contentfulAPI,
    mapsAPI: process.env.MAPS_API ? process.env.MAPS_API : defaultConfig.mapsAPI,
    serviceNowBaseURL: process.env.SERVICE_NOW_BASE_URL ? process.env.SERVICE_NOW_BASE_URL : defaultConfig.serviceNowBaseURL,
    userPrefsAPI: process.env.USER_PREF_API ? process.env.USER_PREF_API : defaultConfig.userPrefsAPI,
    libcalGatewayAPI: process.env.LIBCAL_GATEWAY_API ? process.env.LIBCAL_GATEWAY_API : defaultConfig.libcalGatewayAPI,
    environment: process.env.ENVIRONMENT ? process.env.ENVIRONMENT : defaultConfig.environment,
    version: process.env.VERSION ? process.env.VERSION : defaultConfig.version,
    googleAnalyticsId: process.env.GOOGLE_ANALYTICS_ID ? process.env.GOOGLE_ANALYTICS_ID : defaultConfig.googleAnalyticsId,
    gcseKey:  process.env.GCSE_KEY ? process.env.GCSE_KEY : defaultConfig.gcseKey,
    gcseCx:  process.env.GCSE_CX ? process.env.GCSE_CX : defaultConfig.gcseCx,
    onesearchBaseURL: process.env.ONESEARCH_BASE_URL ? process.env.ONESEARCH_BASE_URL : defaultConfig.onesearchBaseURL,
    features: {
      subjectFilteringEnabled: process.env.ENABLE_SUBJECT_FILTERING ? process.env.ENABLE_SUBJECT_FILTERING : defaultConfig.features.subjectFilteringEnabled,
      loginEnabled: process.env.ENABLE_LOGIN ? process.env.ENABLE_LOGIN : defaultConfig.features.loginEnabled,
      exhibitsEnabled: process.env.ENABLE_EXHIBITS ? process.env.ENABLE_EXHIBITS : defaultConfig.features.exhibitsEnabled,
    },
    oktaUrl: process.env.OKTA_URL ? process.env.OKTA_URL : defaultConfig.oktaUrl,
    oktaClientId: process.env.OKTA_CLIENT_ID ? process.env.OKTA_CLIENT_ID : defaultConfig.oktaClientId,
    oktaIssuer: process.env.OKTA_ISSUER ? process.env.OKTA_ISSUER : defaultConfig.oktaIssuer,
  }

  return { __APP_CONFIG__: JSON.stringify(config) }
}

module.exports = genConfig

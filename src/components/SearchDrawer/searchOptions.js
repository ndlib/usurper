import React from 'react'
export const searchOptions = [
  {
    uid: 'ONESEARCH',
    title: 'OneSearch',
    description:'The ND Catalog plus articles, datasets and more',
    target: 'https://library.nd.edu/utilities/search/ndu/onesearch',
    additionalLinks: (<a href='http://onesearch.library.nd.edu/primo_library/libweb/action/dlSearch.do?bulkSize=10&dym=true&highlight=true&indx=1&institution=NDU&mode=Advanced&onCampus=false&pcAvailabiltyMode=true&query=&search_scope=malc_blended&tab=onesearch&vid=NDU&vl%28freeText0%29=&displayField=title&displayField=creator'>Advanced Search</a>),
  },
  {
    uid: 'NDCATALOG',
    title: 'ND Catalog',
    description:'Print and electronic books, journals and databases',
    target: 'https://library.nd.edu/utilities/search/ndu/nd_campus',
    additionalLinks: (<span><a href='http://onesearch.library.nd.edu/primo_library/libweb/action/search.do?vl(drEndYear5)=Year&vl(drEndMonth5)=00&vl(drEndDay5)=00&vl(drStartYear5)=Year&vl(drStartMonth5)=00&vl(drStartDay5)=00&vl(24400451UI4)=all_items&vl(16772486UI3)=all_items&vl(boolOperator2)=AND&vl(1UIStartWith2)=contains&vl(16833819UI2)=any&vl(boolOperator1)=AND&vl(1UIStartWith1)=contains&vl(16833818UI1)=any&vl(boolOperator0)=AND&vl(1UIStartWith0)=contains&vl(16833817UI0)=any&mode=Advanced&vid=NDU&tab=nd_campus'>Advanced Search</a> | <a href='http://alephprod.library.nd.edu/F/?func=find-b-0'>Catalog Classic</a></span>),
  },
  {
    uid: 'CURATEND',
    title: 'CurateND',
    description:'Theses, dissertations and articles by ND researchers',
    target: 'https://curate.nd.edu/catalog?utf8=%E2%9C%93&amp;search_field=all_fields&amp;q=',
    additionalLinks: '\u00a0'
  },
  {
    uid: 'LIBRARY',
    title: 'Library Website',
    description:'Research guides, services, people and places',
    target: 'https://search.nd.edu/search/?client=lib_site_srch&amp;q=',
    additionalLinks: 'This doesn\'t work yet, but we\'re working on it',
  },
]

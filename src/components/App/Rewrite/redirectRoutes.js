const RedirectRoutes = [
  // external redirects
  { path: '/cds', target: 'http://cds.library.nd.edu' },
  { path: '/directory', target: 'https://directory.library.nd.edu' },
  { path: '/directory/*', target: 'https://directory.library.nd.edu', forwardPath: true },
  { path: '/ill', target: 'https://nd.illiad.oclc.org/illiad/IND/illiad.dll' },
  { path: '/docdel', target: 'https://nd.illiad.oclc.org/illiad/IND/illiad.dll' },
  { path: '/ovgtsl2018', target: 'http://ovgtsl2018.library.nd.edu' },
  { path: '/hackathon', target: 'http://hackathon.library.nd.edu' },
  { path: '/rigorandrelevance', target: 'http://rigorandrelevance.library.nd.edu' },
  { path: '/specialists', target: 'https://directory.library.nd.edu/directory/subjects' },
  { path: '/catalog', target: 'http://factotum.library.nd.edu/utilities/search/ndu/nd_campus' },
  { path: '/onesearch', target: 'http://factotum.library.nd.edu/utilities/search/ndu/onesearch' },
  { path: '/instruction/potofgold', target: 'https://potofgold.library.nd.edu' },
  { path: '/utilities/acquisitions/order', target: 'https://factotum.library.nd.edu/utilities/forms/purchase/new' },
  { path: '/utilities/search/*', target: 'https://factotum.library.nd.edu', forwardPath: true, forwardQuery: true },

  // internal redirects
  { path: '/biochemistry', target: '/chemistry' },
  { path: '/about/employment', target: '/employment' },
  { path: '/about/libprinters.shtml', target: '/copy-print-scan' },
  { path: '/about/rooms', target: '/room-reservations' },
  { path: '/about/hours', target: '/hours' },
  { path: '/about/myaccount.shtml', target: '/personal' },
  { path: '/circulation', target: '/services' },
  { path: '/help/proxy.shtml', target: '/proxy-bookmarklet' },
  { path: '/srch-find', target: '/research' },
  { path: '/kelloggkroc', target: '/kellogg-kroc' },

  // index.php redirects
  { path: '/index.php', target: '/' },
  { path: '/*/index.php', target: '' },

  // wild card redirects
  { path: '/srch-find/*', target: '/research' },
  { path: '/circulation/*', target: '/services' },

]
export default RedirectRoutes

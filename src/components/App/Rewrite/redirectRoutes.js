const RedirectRoutes = [
  // external redirects
  { path: '/cds', target: 'http://cds.library.nd.edu' },
  { path: '/cds/*', target: 'http://cds.library.nd.edu', forwardPath: /\/cds(.*)/ },
  { path: '/directory', target: 'https://directory.library.nd.edu' },
  { path: '/directory/*', target: 'https://directory.library.nd.edu', forwardPath: /(.*)/ },
  { path: '/ill', target: 'https://nd.illiad.oclc.org/illiad/IND/illiad.dll' },
  { path: '/docdel', target: 'https://nd.illiad.oclc.org/illiad/IND/illiad.dll' },
  { path: '/ovgtsl2018', target: 'http://ovgtsl2018.library.nd.edu' },
  { path: '/hackathon', target: 'http://hackathon.library.nd.edu' },
  { path: '/rigorandrelevance', target: 'http://rigorandrelevance.library.nd.edu' },
  { path: '/specialists', target: 'https://directory.library.nd.edu/directory/subjects' },
  { path: '/catalog', target: 'http://factotum.library.nd.edu/utilities/search/ndu/nd_campus' },
  { path: '/onesearch', target: 'http://factotum.library.nd.edu/utilities/search/ndu/onesearch' },
  { path: '/instruction/potofgold/', target: 'https://potofgold.library.nd.edu/' },
  { path: '/clavius/', target: 'http://clavius.library.nd.edu/' },
  { path: '/rigorandrelevance/', target: 'http://rigorandrelevance.library.nd.edu/' },
  { path: '/GLSBC2016/', target: 'http://glsbc2016.library.nd.edu/' },
  { path: '/instruction/potofgold', target: 'https://potofgold.library.nd.edu' },
  { path: '/utilities/acquisitions/order', target: 'https://factotum.library.nd.edu/utilities/forms/purchase/new' },
  { path: '/utilities/*', target: 'https://factotum.library.nd.edu', forwardPath: /(.*)/, forwardQuery: true },
  { path: '/guide-on-the-side/*', target: 'https://guide-on-the-side.library.nd.edu', forwardPath: /\/guide-on-the-side(.*)/ },
  { path: '/documents/*', target: 'https://documents.library.nd.edu', forwardPath: /(.*)/ },
  { path: '/eresources/*', target: 'https://eresources.library.nd.edu', forwardPath: /\/eresources(.*)/ },
  { path: '/fys', target: 'http://libguides.library.nd.edu/first-year-studies' },

  // internal redirects
  { path: '/biochemistry', target: '/chemistry' },
  { path: '/about/employment', target: '/employment' },
  { path: '/about/libprinters.shtml', target: '/copy-print-scan' },
  { path: '/about/rooms', target: '/room-reservations' },
  { path: '/about/hours', target: '/hours' },
  { path: '/personal', target: '/items-requests' },
  { path: '/about/myaccount.shtml', target: '/items-requests' },
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
  { path: '/about/hours/*', target: '/hours' },

]
export default RedirectRoutes

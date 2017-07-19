const RedirectRoutes = [
  // external redirects
  { path: '/cds', target: 'http://cds.library.nd.edu' },
  { path: '/directory', target: 'https://directory.library.nd.edu/directory' },

  // internal redirects
  { path: '/biochemistry', target: '/chemistry' },
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

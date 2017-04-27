import React from 'react'
import Home from './components/Home'
import Static from './components/Static'
const routes = [
  { path: '/',
    component: Home
  },
  {
    path: '/:id',
    component: Static
  }
]
export default routes

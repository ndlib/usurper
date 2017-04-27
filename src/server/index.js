// const express = require('express')
// const React = require('react')
// const ReactRouter = require('react-router')
// const StaticRouter = ReactRouter.Router
// const matchPath = ReactRouter.matchPath
// const routes = require('../shared/routes.js')
//
// const app = express()
// app.use('../static', express.static('../dist'))
//
// app.get('*', (req, res) => {
//   // const match = routes.reduce((acc, route) => matchPath(req.url, route, { exact: true }) || acc, null)
//   // if (!match) {
//   //   res.status(404).send(404)
//   // } else {
//   res.status(200).send(200)
//   // }
// })
//
// app.listen(4000, () => console.log('Demo app listening on port 4000'))
// console.log('Listening on http://localhost:4000')

import express from 'express'
import React from 'react'
import { StaticRouter } from 'react-router'
import ReactDOMServer from 'react-dom/server'
import path from 'path'
import fs from 'fs'
import App from '../shared/components/App'

const app = express()
const context = {}

app.get('*', (req, res) => {
  const RenderedContent = ReactDOMServer.renderToString(
    <StaticRouter
      location={req.url}
      context={context}
    >
      <App />
    </StaticRouter>
  )
  // const RenderedPage = ;
  let RenderedPage = ''
  fs.readFile('./build/public/index.html', 'utf-8', function (err, data) {
    if (err) {
      console.error('Could not load index.html')
    } else {
      RenderedPage = data
      RenderedPage = RenderedPage.replace('{{SSR}}', RenderedContent)
      res.status(200).send(RenderedPage)
    }
  })
})
app.listen(4000, () => console.log('Demo app listening on port 4000'))
console.log('Listening on http://localhost:4000')

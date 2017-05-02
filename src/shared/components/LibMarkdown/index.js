import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function LibLink (props) {
  var url = props.href

  // Urls to remove so links are local
  let replaceUrls = [
    'https://alpha.library.nd.edu',
    'http://localhost:4000'
  ]

  for (var index in replaceUrls) {
    if (url.startsWith(replaceUrls[index])) {
      url = url.substr(replaceUrls[index].length)
      break
    }
  }

  return <Link to={url}>{props.children}</Link>
}

LibLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.string.isRequired
}

class LibMarkdown extends Component {
  render () {
    let overrides = {
      overrides: {
        a: {
          component: LibLink
        }
      }
    }

    return (
      <Markdown options={overrides}>
        { this.props.children }
      </Markdown>
    )
  }
}

LibMarkdown.propTypes = {
  children: PropTypes.string.isRequired
}

export default LibMarkdown

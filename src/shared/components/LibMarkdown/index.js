import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

function LibLink (props) {
  var url = props.href

  // I'm not entirely sure if there aren't other cases that might fall here, but this
  // is to fix an issue when someone puts [text] in markdown, which is not a valid link.
  // The markdown component will still call this override function even though it's not
  // a valid markdown link, so we have to handle it here.
  if(url === undefined) {
    return (<span>[{ props.children }]</span>)
  }

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
  href: PropTypes.string,
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

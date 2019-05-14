import React, { Component } from 'react'
import Markdown from 'markdown-to-jsx'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'

const LibLink = (props) => {
  let url = props.href

  // I'm not entirely sure if there aren't other cases that might fall here, but this
  // is to fix an issue when someone puts [text] in markdown, which is not a valid link.
  // The markdown component will still call this override function even though it's not
  // a valid markdown link, so we have to handle it here.
  if (url === undefined) {
    // Exception for named anchors
    if (props.id) {
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      return (<a id={props.id}>{ props.children }</a>)
    }
    return (<span>{ props.children }</span>)
  }

  // Urls to remove so links are local
  const replaceUrls = [
    'https://alpha.library.nd.edu',
    'http://alpha.library.nd.edu',
    'https://beta.library.nd.edu',
    'http://beta.library.nd.edu',
    'https://library.nd.edu',
    'http://library.nd.edu',

    'http://localhost:4000',
    'http://localhost:3000',
  ]

  for (const index in replaceUrls) {
    if (url.startsWith(replaceUrls[index])) {
      url = url.substr(replaceUrls[index].length)
      break
    }
  }

  return <Link to={url}>{props.children}</Link>
}

LibLink.propTypes = {
  href: PropTypes.string,
  children: PropTypes.any,
}

class LibMarkdown extends Component {
  render () {
    if (!this.props.children) {
      return null
    }

    const overrides = {
      overrides: {
        a: {
          component: LibLink,
        },
      },
    }

    return (
      <p className={this.props.className} itemProp={this.props.itemProp}>
        <Markdown options={overrides}>
          { this.props.children }
        </Markdown>
      </p>
    )
  }
}

LibLink.propTypes = {
  id: PropTypes.string,
}

LibMarkdown.propTypes = {
  children: PropTypes.string,
  className: PropTypes.string,
  itemProp: PropTypes.string,
}

export default LibMarkdown

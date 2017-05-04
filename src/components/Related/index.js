import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Image from '../Image'
import Link from '../LibLink'

class Related extends Component {
  links () {
    let out = []
    for (var i in this.props.children) {
      let currentItem = this.props.children[i]

      let link = currentItem.fields.slug ? currentItem.fields.slug : currentItem.fields.url

      out.push(
        <li key={currentItem.fields.title}>
          <Link to={link}>
            <Image cfImage={currentItem.fields.image} />
            <span>{currentItem.fields.title}</span>
          </Link>
        </li>
      )
    }
    return out
  }

  render () {
    return (
      <ul className={this.props.className}>
        { this.links() }
      </ul>
    )
  }
}

Related.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired
}

export default Related

import React, { Component } from 'react'
import PropTypes from 'prop-types'

const redirectPrefix = 'https://7w0g1d1dah.execute-api.us-east-1.amazonaws.com/dev/databases/'

class Recommendations extends Component {
  recommendList () {
    var out = []
    for (var i in this.props.recommend) {
      var url = redirectPrefix + this.props.recommend[i].token
      var name = this.props.recommend[i].name
      out.push(
        <li key={url}>
          <a href={url}>{name}</a>
        </li>
      )
    }
    return out
  }

  render () {
    return (
      <div>
        <ul key='Recommendations'>
          {this.recommendList()}
        </ul>
      </div>
    )
  }
}

Recommendations.propTypes = {
  recommend: PropTypes.array
}

export default Recommendations

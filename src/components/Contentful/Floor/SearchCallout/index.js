// Container component for a Floor content type from Contentful
import React, { Component } from 'react'
import PropTypes from 'prop-types'

export class SearchCallout extends Component {
  getDataFromURI (search) {
    const searchParams = new URLSearchParams(search)
    let extraData = {}

    const extraFields = [ 'title', 'author', 'call_number', 'collection_display' ]
    for (let fieldIndex in extraFields) {
      let field = extraFields[fieldIndex]
      let value = searchParams.get(field)
      if (value) {
        if (field === 'title') {
          // strip out whitespace and [,.] from the start/end of the title
          value = value.replace(/^[\s,.]+|[\s,.]+$/gm, '')
        }

        extraData[field] = value
      }
    }

    return extraData
  }

  render () {
    const extraData = this.getDataFromURI(this.props.location.search)
    return (
      <div>
        {
          Object.keys(extraData).length > 0 && (
            <div className='item-data'>
              <p><i>{extraData.title}</i>. {extraData.author}</p>
              <strong>{extraData.call_number}</strong>
              <p>{extraData.collection_display}</p>
            </div>
          )
        }
      </div>
    )
  }
}

SearchCallout.propTypes = {
  location: PropTypes.object,
}

export default SearchCallout

import React from 'react'
import PropTypes from 'prop-types'

import Tags from 'components/Interactive/Tags'
import * as helper from 'constants/HelperFunctions'

const ActiveFiltersList = (props) => {
  const sortedList = helper.sortList(props.subjects, 'linkText', 'asc')
  const subjectTags = () => {
    const clickHandler = (tag) => {
      props.removeSubjectFromFilter(tag.key)
    }
    return sortedList.map(subject => ({
      key: subject.sys.id,
      value: subject.linkText,
      onClick: clickHandler,
    }))
  }
  const letterTag = props.letter ? {
    key: props.letter,
    value: `Starts With: ${props.letter.toUpperCase()}`,
    onClick: props.removeLetterFilter,
  } : null

  return (
    <div className='activeFilters'>
      <span className='activeFiltersLabel'>Active Filters:</span>
      <Tags groups={[letterTag, subjectTags()]} inline hasRemove />
    </div>
  )
}

ActiveFiltersList.propTypes = {
  subjects: PropTypes.array.isRequired,
  letter: PropTypes.string,
  removeSubjectFromFilter: PropTypes.func.isRequired,
  removeLetterFilter: PropTypes.func.isRequired,
}

export default ActiveFiltersList

import React from 'react'
import PropTypes from 'prop-types'

const MaterialType = (props) => {
  let options
  if (props.searchType === 'NDCATALOG') {
    options = (
      <select id='materialType' onChange={props.onChange}>
        <option value='all_items'>All items</option>
        <option value='archival'>Archival Materials</option>
        <option value='audio'>Audio</option>
        <option value='books'>Books</option>
        <option value='conference_proceedings'>Conference Proceedings</option>
        <option value='research_datasets'>Datasets</option>
        <option value='Dissertations'>Dissertations</option>
        <option value='government_documents'>Government documents</option>
        <option value='images'>Images</option>
        <option value='journals'>Journals</option>
        <option value='maps'>Maps</option>
        <option value='microform'>Microform</option>
        <option value='newspapers'>Newspapers</option>
        <option value='scores'>Scores</option>
        <option value='videos'>Videos</option>
      </select>)
  } else {
    options = (
      <select id='materialType' onChange={props.onChange}>
        <option value='all_items'>All Items</option>
        <option value='articles'>Articles</option>
        <option value='audio_video'>Audio Visual</option>
        <option value='books'>Books</option>
        <option value='conference_proceedings'>Conference Proceedings</option>
        <option value='research_datasets'>Datasets</option>
        <option value='Dissertations'>Dissertations</option>
        <option value='government_documents'>Government Documents</option>
        <option value='images'>Images</option>
        <option value='isbn'>journals</option>
        <option value='maps'>Maps</option>
        <option value='newspaper_article'>Newspaper Articles</option>
        <option value='reference_entrys'>Reference Entries</option>
        <option value='scores'>Scores</option>
      </select>
    )
  }

  return (
    <div>
      <label htmlFor='materialType'>Material Type:</label>
      <span className='selector'>
        {options}
      </span>
    </div>
  )
}

export default MaterialType

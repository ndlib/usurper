import React from 'react'
import PropTypes from 'prop-types'

const Language = (props) => {
  return (
    <div>
      <label htmlFor='language'>Language:</label>
      <span className='selector'><select id='language' onChange={props.onChange}>
        <option value='all_items'>Any language</option>
        <option value='eng'>English</option>
        <option value='ara'>Arabic</option>
        <option value='chi'>Chinese</option>
        <option value='cze'>Czech</option>
        <option value='dan'>Danish</option>
        <option value='dut'>Dutch</option>
        <option value='eng'>English</option>
        <option value='fre'>French</option>
        <option value='ger'>German</option>
        <option value='gre'>Greek</option>
        <option value='grc'>Greek, Ancient</option>
        <option value='heb'>Hebrew</option>
        <option value='hun'>Hungarian</option>
        <option value='iri'>Irish</option>
        <option value='ita'>Italian</option>
        <option value='jpn'>Japanese</option>
        <option value='kor'>Korean</option>
        <option value='lat'>Latin</option>
        <option value='mon'>Mongolian</option>
        <option value='pol'>Polish</option>
        <option value='por'>Portuguese</option>
        <option value='rus'>Russian</option>
        <option value='spa'>Spanish</option>
        <option value='swa'>Swahili</option>
        <option value='swe'>Swedish</option>
        <option value='tib'>Tibetan</option>
      </select></span>
    </div>
  )
}

export default Language

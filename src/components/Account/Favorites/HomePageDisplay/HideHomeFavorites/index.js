import React from 'react'
import PropTypes from 'prop-types'

const HideHomeFavorites = (props) => {
  return (
    <React.Fragment>
      <h4>Favorites</h4>
      <div className='row'>
        <div className='col-xs-12'>
          <label>
            <input type='checkbox' name='hideHomeFavoritesCheckbox' onChange={props.onChange} defaultChecked={props.defaultChecked} />
            Hide favorites on the home page.
          </label>
        </div>
      </div>
      <br />
    </React.Fragment>
  )
}

HideHomeFavorites.propTypes = {
  onChange: PropTypes.func.isRequired,
  defaultChecked: PropTypes.bool,
}

export default HideHomeFavorites

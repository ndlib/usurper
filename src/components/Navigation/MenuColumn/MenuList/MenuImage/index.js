import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../../../Link'

const MenuImage = (props) => {

  return (
    <dt>
      <Link to={props.url}>
        <img src={props.image} alt={props.title} />
      </Link>
    </dt>
  )
}

MenuImage.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}
export default MenuImage

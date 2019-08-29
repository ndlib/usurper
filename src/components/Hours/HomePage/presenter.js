import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'

const Presenter = (props) => {
  return (
    <section className='hours-display' aria-label={`Today's Hours`} itemScope itemType='http://schema.org/Library'>
      <h2>Today's <span itemProp='name'>{props.hoursEntry.name}</span> Hours:&nbsp;
        <Link to='hours' ariaLabel={`${props.hoursEntry.today.rendered} - Click for more hours`}>
          <span itemProp='openingHours' content={props.hoursEntry.today.schemaOpeningHours}>
            {props.hoursEntry.today.rendered}
          </span>
        </Link>
      </h2>
    </section>
  )
}

Presenter.propTypes = {
  hoursEntry: PropTypes.shape({
    today: PropTypes.shape({
      rendered: PropTypes.string,
      schemaOpeningHours: PropTypes.string,
    }).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default Presenter

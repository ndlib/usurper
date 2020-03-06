import React from 'react'
import PropTypes from 'prop-types'

import ExhibitCard from 'components/ExhibitCard'
import Link from 'components/Interactive/Link'
import './style.css'

const Presenter = ({ entries }) => {
  return (
    <div className='col-xs-12' >
      <section aria-label='Exhibits' className='exhibitsSection'>
        <Link to='/exhibits' className='exhibitsHeader'><h1>Exhibits</h1></Link>
        <div className='exhibitsList'>
          { entries.map((entry) => (
            <ExhibitCard key={entry.id} entry={entry} />
          ))}
        </div>
        <Link to='/exhibits' className='viewAll'>View All Exhibits</Link>
      </section>
    </div>
  )
}

Presenter.propTypes = {
  entries: PropTypes.arrayOf(PropTypes.shape({
    sys: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  })).isRequired,
}

export default Presenter
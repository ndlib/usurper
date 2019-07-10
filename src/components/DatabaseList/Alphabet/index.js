import React from 'react'
import PropTypes from 'prop-types'
import Link from 'components/Interactive/Link'
import styles from '../style.module.css'

const Alphabet = (props) => {
  return (
    <aside aria-label='Select Databases by First Letter' role='navigation'>
      <div className='group'>
        <span className='nav-header'>Filter by First Letter</span>
        <div className={styles.alphabet}>
          {
            'abcdefghijklmnopqrstuvwxyz#'.split('').map((item) => {
              return (
                <span key={'letter_link_' + item} className={styles.letter}>
                  <Link
                    to={'/databases/' + encodeURIComponent(item) + props.history.location.search}
                    ariaLabel={'All "' + item.toUpperCase() + '" Databases'}
                  >{ item.toUpperCase() }</Link>
                </span>
              )
            })
          }
        </div>
      </div>
    </aside>
  )
}

Alphabet.propTypes = {
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }),
}

export default Alphabet

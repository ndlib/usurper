import React from 'react'
import PropTypes from 'prop-types'
import styles from '../style.module.css'

const Alphabet = (props) => {
  return (
    <aside aria-label='Select Databases by First Letter' role='navigation'>
      <div className='group'>
        <span className={styles.navHeader}>Filter by First Letter</span>
        <div className={styles.alphabet}>
          {
            'abcdefghijklmnopqrstuvwxyz#'.split('').map(letter => {
              return (
                <span
                  key={'letter_link_' + letter}
                  className={styles.letter}
                  aria-label={`All "${letter.toUpperCase()}" Databases`}
                  onClick={() => props.onLetterFilterApply(letter)}
                >
                  { letter.toUpperCase() }
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
  onLetterFilterApply: PropTypes.func.isRequired,
  history: PropTypes.shape({
    location: PropTypes.shape({
      search: PropTypes.string,
    }),
  }),
}

export default Alphabet

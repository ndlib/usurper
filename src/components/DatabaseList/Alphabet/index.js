import React from 'react'
import PropTypes from 'prop-types'
import Accordion from 'components/Interactive/Accordion'
import styles from '../style.module.css'

const Alphabet = (props) => {
  return (
    <aside aria-label='Select Databases by First Letter' role='navigation'>
      <Accordion
        className='group'
        header='Filter by First Letter'
        headerClassName={styles.navHeader}
        bodyClassName={styles.alphabet}
        mobileOnly
      >
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
      </Accordion>
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

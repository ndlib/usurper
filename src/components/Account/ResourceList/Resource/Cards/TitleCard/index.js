import React from 'react'
import PropTypes from 'prop-types'

import Card from '../Card'
import CoinsObject from '../../CoinsObject'
import Link from 'components/Interactive/Link'

import Config from 'shared/Configuration'

import styles from '../style.module.css'

const TitleCard = (props) => {
  let link
  const docNumber = (props.itemNumber || props.docNumber)
  if (props.from === 'ILL') {
    link = Config.illiadBaseURL.replace('<<form>>', 67).replace('<<value>>', props.id)
  } else if (docNumber) {
    link = `${Config.onesearchBaseURL}/NDU:malc_blended:ndu_aleph${docNumber}`
  }

  return (
    <Card className={styles.cardHeader + (props.listType === 'history' ? ` ${styles.circHist}` : '')}>
      <Card className={styles.title} value={props.title} label='Title'>
        <Link to={link}>{props.title}</Link>
      </Card>
      <Card className={styles.published} value={props.published} label='Published' />
      <CoinsObject {...props} />
    </Card>
  )
}

TitleCard.propTypes = {
  listType: PropTypes.string,
  id: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  title: PropTypes.string,
  from: PropTypes.string,
  published: PropTypes.string,
  itemNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  docNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default TitleCard

import React from 'react'
import PropTypes from 'prop-types'

import Actions from './Actions'
import { hasActions } from './Actions/presenter'
import Cards from './Cards'

const Resource = (props) => {
  return (
    <div className={`card-item${props.listType === 'history' ? ' circ-hist' : ''}`} aria-label={props.item.title}>
      <Cards {...props} />
      { hasActions(props.item, props.listType) && (
        <React.Fragment>
          <div className='actions-button'>
            <span onClick={props.toggleHidden} title='More Actions'>⁝</span>
          </div>
          <div className={'actions' + (props.hidden ? '-hidden' : '')}>
            <Actions item={props.item} listType={props.listType} />
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

Resource.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
  }).isRequired,
  toggleHidden: PropTypes.func,
  hidden: PropTypes.bool,
  listType: PropTypes.string.isRequired,
}

Resource.defaultProps = {
  from: 'NDU',
}

export default Resource

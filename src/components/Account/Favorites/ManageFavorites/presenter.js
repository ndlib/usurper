import React from 'react'
import PropTypes from 'prop-types'

import bookmark from 'static/images/bookmark.svg'
import InlineLoading from 'components/Messages/InlineLoading'
import UpdateStatus from 'components/Messages/UpdateStatus'
import FavoritesList from '../FavoritesList'
import Search from '../Search'

import * as states from 'constants/APIStatuses'
import { KIND } from 'actions/personal/favorites'

const ManageFavorites = (props) => {
  const saving = props.saveState === states.FETCHING
  return (
    <section className='group favorites' id={'manage_' + props.kind}>
      <h3><img src={bookmark} alt='' className='favorite white' />{props.title}</h3>
      <div className='section-box pad-edges'>
        <div className='row'>
          {props.message}
          <FavoritesList kind={props.kind} items={props.favorited} updateList={props.updateList} disabled={saving} />
        </div>
        <div className='row'>
          <div className='col-xs-12 col-sm-12 col-md-10 col-lg-9'>
            <Search kind={props.kind} placeholder={'Add ' + props.title} buttonText={'Search ' + props.title} existingFavorites={props.favorited} onAddFavorite={props.onAddFavorite} disabled={saving} />
          </div>
        </div>
        <button type='submit' className='right' aria-label='Save' disabled={!props.modified || saving} onClick={props.onSave}>Save</button>
        { props.kind === KIND.subjects && (
          <button className='right' onClick={props.openWizard} disabled={saving}>View All Subjects</button>
        )}
        { saving ? (
          <InlineLoading title='Saving...' className='fright pad-edges-sm' />
        ) : (
          <UpdateStatus status={props.saveState} text={props.updateText} className='pad-edges-md' />
        )}
      </div>
    </section>
  )
}

ManageFavorites.propTypes = {
  saveState: PropTypes.string,
  modified: PropTypes.bool,
  message: PropTypes.string,
  title: PropTypes.string,
  updateText: PropTypes.string,
  kind: PropTypes.string,
  favorited: PropTypes.array,
  updateList: PropTypes.func,
  onAddFavorite: PropTypes.func,
  onSave: PropTypes.func,
  openWizard: PropTypes.func,
}

export default ManageFavorites

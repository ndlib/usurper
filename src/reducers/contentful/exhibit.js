import typy from 'typy'
import {
  CF_REQUEST_EXHIBIT,
  CF_RECEIVE_EXHIBIT,
} from 'actions/contentful/exhibit'
import { mapEvent } from './event'
import * as statuses from 'constants/APIStatuses'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_EXHIBIT:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        slug: action.slug,
      })
    case CF_RECEIVE_EXHIBIT:
      return Object.assign({}, state, {
        status: action.status,
        slug: action.slug,
        json: mapExhibit(action.exhibit),
      })
    default:
      return state
  }
}

export const mapExhibit = (entry) => {
  return {
    id: entry.sys.id,
    slug: entry.fields.slug,
    title: entry.fields.title,
    preferOnHomepage: entry.fields.preferOnHomepage,
    order: entry.fields.order,
    type: entry.fields.type,
    event: entry.fields.event ? mapEvent(entry.fields.event) : null,
    image: entry.fields.representationalImage || typy(entry, 'fields.event.fields.representationalImage').safeObject,
    linkTo: entry.fields.externalUrl || `/event/${typy(entry, 'fields.event.fields.slug').safeString}`,
  }
}

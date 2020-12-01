import typy from 'typy'
import { CF_REQUEST_SUBJECTS, CF_RECEIVE_SUBJECTS } from 'actions/contentful/subjects'
import * as statuses from 'constants/APIStatuses'
import * as helper from 'constants/HelperFunctions'

export default (state = { status: statuses.NOT_FETCHED }, action) => {
  switch (action.type) {
    case CF_REQUEST_SUBJECTS:
      return Object.assign({}, state, {
        status: statuses.FETCHING,
        depth: action.depth,
      })
    case CF_RECEIVE_SUBJECTS:
      const subjectList = typy(action, 'data.fields.items').safeArray
      return Object.assign({}, state, {
        status: action.status,
        depth: action.depth,
        data: subjectList.map((item) => {
          if (typy(item, 'sys.contentType.sys.id').safeString === 'internalLink') {
            return helper.mergeInternalLink(item, subjectList)
          } else {
            return item
          }
        }),
      })
    default:
      return state
  }
}

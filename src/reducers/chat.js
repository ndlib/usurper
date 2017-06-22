import {
  OPEN_CHAT_MODAL,
  CLOSE_CHAT_MODAL,
} from '../actions/chat'

export default (
  state = {
  },
  action
) => {
  switch (action.type) {
    case OPEN_CHAT_MODAL:
      return Object.assign({}, state, {
        chatOpen: true,
      })
    case CLOSE_CHAT_MODAL:
      return Object.assign({}, state, {
        chatOpen: false,
      })
    default:
      return state
  }
}

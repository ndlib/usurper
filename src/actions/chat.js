export const OPEN_CHAT_MODAL = 'OPEN_CHAT_MODAL'
export const CLOSE_CHAT_MODAL = 'CLOSE_CHAT_MODAL'

export function openChat () {
  return {
    type: OPEN_CHAT_MODAL,
  }
}

export function closeChat () {
  return {
    type: CLOSE_CHAT_MODAL,
  }
}

export const actions = {
  openChat,
  closeChat,
}

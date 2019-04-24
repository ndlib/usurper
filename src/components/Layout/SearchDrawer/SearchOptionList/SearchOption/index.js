import { connect } from 'react-redux'
import SearchOption from './presenter'

import { setSearchType, closeSearchBox } from 'actions/search.js'
const mapStateToProps = (state) => {
  return {
    searchType: state.searchType,
  }
}

const move = (event, value) => {
  event.preventDefault()
  let current = event.target.value + value
  if (current < 0) {
    current = document.querySelectorAll('.uSearchOption').length - 1
  } else if (current >= document.querySelectorAll('.uSearchOption').length) {
    current = 0
  }
  document.getElementById(`uSearchOption_${current}`).focus()
  return current
}
const mapDispatchToProps = (dispatch, ownProps) => {
  const onSubmit = (e) => {
    dispatch(setSearchType(ownProps.item.uid))
    dispatch(closeSearchBox())
    e.stopPropagation()
    e.nativeEvent.stopImmediatePropagation()
  }
  return {
    onClick: (e) => {
      onSubmit(e)
    },
    onKeyDown: (e) => {
      switch (e.keyCode) {
        case 9: // tab key
          if (e.shiftKey) {
            move(e, -1)
          } else {
            move(e, 1)
          }
          break
        case 38: //  up arrow
          move(e, -1)
          break
        case 40: // down arrow
          move(e, 1)
          break
        case 13: // enter
          onSubmit(e)
          document.getElementById(`selected-search`).focus()
          break
        default: // do nothing on other keys
          break
      }
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchOption)

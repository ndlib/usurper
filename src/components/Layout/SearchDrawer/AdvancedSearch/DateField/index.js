import { connect } from 'react-redux'
import DateField from './presenter'
import { setSearchOption } from '../../../../../actions/advancedSearch'

const mapStateToProps = (state) => {
  return {
    ...state,
  }
}

const mapDispatchToProps = (dispatch) => {
  const padZero = (n) => {
    if (n < 10) {
      n = '0' + n
    }
    return n
  }

  return {
    onChange: (e) => {
      dispatch(setSearchOption(e.target.id, e.target.value))
    },
    onKeyDown: (e) => {
      // Enter
      if (e.keyCode === 13) {
        dispatch(setSearchOption(e.target.id, e.target.value))
      }
    },
    formatID: (n, p) => {
      return `${p}_${padZero(n)}`
    },
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DateField)

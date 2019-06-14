import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Presenter from './presenter'

class RadioList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      index: props.defaultValue ? props.entries.findIndex((entry) => {
        // Intentional == to allow numbers and strings to match
        return entry.value == props.defaultValue // eslint-disable-line eqeqeq
      }) : 0,
    }

    this.onOptionClick = this.onOptionClick.bind(this)
  }

  componentDidUpdate (prevProps) {
    if (this.props.defaultValue !== prevProps.defaultValue) {
      this.onOptionClick({
        target: {
          value: this.props.entries.findIndex((entry) => {
            return entry.value == this.props.defaultValue // eslint-disable-line eqeqeq
          }),
        },
      })
    }
  }

  onOptionClick (e) {
    const index = e.target.value
    // If index is a falsy and is NOT 0 (E.g. if it's null, undefined, or false), the input index is invalid
    if (!index && index !== 0) {
      return
    }
    this.setState({ index: parseInt(index, 10) }, console.log())

    if (typeof this.props.onChangeCallback === 'function') {
      const entry = this.props.entries[e.target.value]
      if (entry) {
        this.props.onChangeCallback(entry.value, entry.title, e)
      }
    }
  }

  render () {
    const title = this.props.entries[this.state.index] ? this.props.entries[this.state.index].title : null
    return <Presenter
      radioName={this.props.radioName}
      selectedTitle={title}
      entries={this.props.entries}
      onOptionClick={this.onOptionClick}
    />
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
  }
}

RadioList.propTypes = {
  radioName: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  entries: PropTypes.array.isRequired,
  onChangeCallback: PropTypes.func,
}

export default connect(
  mapStateToProps
)(RadioList)

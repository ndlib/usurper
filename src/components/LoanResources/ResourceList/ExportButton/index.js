import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exportHelper from './exportHelper'

class ExportButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hidden: true,
    }
    this.onBlur = this.onBlur.bind(this)
    this.onButtonClick = this.onButtonClick.bind(this)
    this.exportRIS = this.exportRIS.bind(this)
    this.exportCSV = this.exportCSV.bind(this)

    this.exportButtonDropDownRef = React.createRef()
  }

  componentDidUpdate () {
    this.exportButtonDropDownRef.current.focus()
  }

  onButtonClick () {
    console.log(this.props.items)
    this.setState({ hidden: !this.state.hidden })
  }

  onBlur () {
    this.setState({ hidden: true })
  }

  exportRIS () {
    this.onBlur()
    exportHelper('RIS', 'data')
  }

  exportCSV () {
    this.onBlur()
    exportHelper('CSV', 'data')
  }

  render () {
    return (
      <div className='export'>
        <button
          className='export'
          onClick={this.onButtonClick}
          aria-label='Export Circulation History'
        >{this.props.items.length > 1 ? 'Export All' : 'Export'}</button>
        <div
          ref={this.exportButtonDropDownRef}
          tabIndex='0'
          onBlur={this.onBlur}
          className={'exportOptions dropdown' + (this.state.hidden ? ' hidden' : '')}
        >
          <ul>

            <li onClick={this.exportRIS}>
              Export to RIS
            </li>
            <li onClick={this.exportCSV}>
              Export to CSV
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

ExportButton.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ExportButton

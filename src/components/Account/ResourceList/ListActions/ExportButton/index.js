import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exportHelper from './exportHelper'
import * as helper from 'constants/HelperFunctions'

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
    this.setState({
      hidden: !this.state.hidden,
    })
  }

  onBlur (e) {
    if (!document.getElementById('exportDropdown').contains(e.relatedTarget)) {
      this.setState({
        hidden: true,
      })
    }
  }

  exportRIS () {
    this.setState({ hidden: true })
    exportHelper('RIS', this.props.items)
  }

  exportCSV () {
    this.setState({ hidden: true })
    exportHelper('CSV', this.props.items)
  }

  render () {
    const labelText = 'Export Checkout History'
    const disabled = this.props.items.length === 0
    return (
      <button className='export' onClick={this.onButtonClick} disabled={disabled} aria-label={labelText}>
        { helper.pluralize(this.props.items, 'Export', 'Export All') }
        <div
          id='exportDropdown'
          ref={this.exportButtonDropDownRef}
          tabIndex='0'
          onBlur={this.onBlur}
          className={'exportOptions dropdown' + (this.state.hidden ? ' hidden' : '')}
          aria-label={labelText}
          aria-expanded={!this.state.hidden}
          role='tree'
        >
          <ul>
            <li role='treeitem' onClick={this.exportRIS}>Export to RIS</li>
            <li role='treeitem' onClick={this.exportCSV}>Export to CSV</li>
          </ul>
        </div>
      </button>
    )
  }
}

ExportButton.propTypes = {
  items: PropTypes.array.isRequired,
}

export default ExportButton

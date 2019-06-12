import React, { Component } from 'react'
import PropTypes from 'prop-types'
import AccountPageWrapper from '../AccountPageWrapper'
import ResourceList from '../ResourceList'
import CircOptIn from './CircOptIn'
import CircHistoryModal from './CircHistoryModal'
import CircHistorySidebar from './CircHistorySidebar'

class CirculationHistory extends Component {
  constructor (props) {
    super(props)
    this.confirmToggleStatus = this.confirmToggleStatus.bind(this)
    this.dismiss = this.dismiss.bind(this)
    this.state = {
      modalOpen: false,
    }
  }

  dismiss () {
    if (!this.props.updating) {
      this.setState({ modalOpen: false })
    }
  }

  componentDidUpdate (prevProps) {
    // If opting in/out completed, dismiss the confirmation modal
    if (prevProps.updating && !this.props.updating) {
      this.dismiss()
    }
  }

  openModal = () => {
    this.setState({ modalOpen: true })
  }

  confirmToggleStatus () {
    const newValue = !this.props.optedIn
    this.props.setCircStatus(newValue)
  }

  render () {
    const sidebar = <CircHistorySidebar optedIn={this.props.optedIn} onClickOptOut={this.openModal} />
    return (
      <AccountPageWrapper title='Checkout History' slug='checkout-history' customSidebar={sidebar}>
        { this.props.optedIn || this.props.loading
          ? <ResourceList list={this.props.items} loading={this.props.loading} type='history' />
          : <CircOptIn onClickOptIn={this.openModal} updateStatus={this.props.updateStatus} />
        }
        <CircHistoryModal
          isOpen={this.state.modalOpen}
          optedIn={this.props.optedIn}
          updating={this.props.updating}
          onClose={this.dismiss}
          onConfirm={this.confirmToggleStatus}
        />
      </AccountPageWrapper>
    )
  }
}

CirculationHistory.propTypes = {
  loading: PropTypes.bool,
  items: PropTypes.array.isRequired,
  optedIn: PropTypes.bool,
  updateStatus: PropTypes.string.isRequired,
  updating: PropTypes.bool,
  setCircStatus: PropTypes.func.isRequired,
}

export default CirculationHistory

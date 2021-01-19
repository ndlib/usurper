import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import typy from 'typy'

import { fetchSubscription, putSubscription } from 'actions/email'
import * as statuses from 'constants/APIStatuses'

import Presenter from './presenter'

const getSelectedFromQueryString = (queryString) => {
  // Derive the currently selected options based on the url query string
  const selected = {}
  if (queryString) {
    const queryParams = queryString.replace('?', '').split('&')
    const excludeKeys = [
      'edit',
      'preview',
      'emailAddress',
      'frequency',
    ]

    queryParams.forEach(param => {
      const split = decodeURIComponent(param).split('=')
      const key = split[0]
      if (!excludeKeys.includes(key)) {
        if (!(key in selected)) {
          selected[key] = []
        }
        selected[key].push(split[1])
      }
    })
  }
  return selected
}

const EmailSubscribeContainer = (props) => {
  const location = useLocation()
  const queryString = location.search
  const searchParams = new URLSearchParams(queryString)

  const defaultSelected = getSelectedFromQueryString(queryString)

  const isEdit = searchParams.get('edit') === 'true'
  const [email, setEmail] = useState(isEdit ? searchParams.get('emailAddress') : '')

  useEffect(() => {
    // In edit mode, fetch subscription details if it hasn't been fetched, or if the fetched data
    // in the store is for a different email address.
    if (isEdit && (props.fetchStatus === statuses.NOT_FETCHED || email !== typy(props.subscription, 'emailAddress').safeString)) {
      props.fetchSubscription(props.match.params.type, email)
    }

    // TODO: After fetching, apply the options from the store to the UI state
  }, [isEdit, email])

  const [selectedOptions, setSelectedOptions] = useState(defaultSelected)
  const [frequency, setFrequency] = useState(7)

  const onSubmit = (event) => {
    event.preventDefault()

    props.putSubscription(props.match.params.type, email, {
      ...selectedOptions,
      frequencyDays: parseInt(frequency, 10),
      updateKey: isEdit ? searchParams.get('updateKey') : undefined,
    })
  }

  const onOptionChange = (facetKey, optionKey) => {
    const currentlyChecked = typy(selectedOptions, facetKey).safeArray
    const shouldUncheck = currentlyChecked.includes(optionKey)
    const newValue = {
      ...selectedOptions,
      [facetKey]: shouldUncheck
        ? currentlyChecked.filter(key => key !== optionKey)
        : currentlyChecked.concat([optionKey]),
    }

    setSelectedOptions(newValue)
  }

  const onFrequencyChange = (event) => {
    setFrequency(parseInt(event.target.value, 10))
  }

  const onEmailChange = (event) => {
    setEmail(event.target.value)
  }

  return (
    <Presenter
      selectedOptions={selectedOptions}
      frequency={frequency}
      email={email}
      onSubmit={onSubmit}
      onOptionChange={onOptionChange}
      onFrequencyChange={onFrequencyChange}
      onEmailChange={onEmailChange}
      isEdit={isEdit}
      fetchStatus={props.fetchStatus}
      updateStatus={props.updateStatus}
    />
  )
}

export const mapStateToProps = (state) => {
  const { email } = state

  return {
    fetchStatus: email.status,
    updateStatus: typy(email, 'update.status').safeString || statuses.NOT_FETCHED,
    subscription: email.data,
  }
}

export const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ fetchSubscription, putSubscription }, dispatch)
}

EmailSubscribeContainer.propTypes = {
  fetchStatus: PropTypes.string.isRequired,
  updateStatus: PropTypes.string.isRequired,
  subscription: PropTypes.shape({
    emailAddress: PropTypes.string,
    type: PropTypes.string,
    data: PropTypes.object,
  }),
  fetchSubscription: PropTypes.func.isRequired,
  putSubscription: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      type: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

const EmailSubscribe = connect(mapStateToProps, mapDispatchToProps)(EmailSubscribeContainer)
export default EmailSubscribe

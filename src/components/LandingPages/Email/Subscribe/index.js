import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import typy from 'typy'

import Presenter from './presenter'

const getSelectedFromQueryString = (queryString) => {
  // Derive the currently selected options based on the url query string
  const selected = {}
  const queryParams = queryString.replace('?', '').split('&')
  queryParams.forEach(param => {
    const split = decodeURIComponent(param).split('=')
    const key = split[0]
    if (!(key in selected)) {
      selected[key] = []
    }
    selected[key].push(split[1])
  })
  return selected
}

const EmailSubscribe = () => {
  const location = useLocation()
  const defaultSelected = getSelectedFromQueryString(location.search)

  const [selectedOptions, setSelectedOptions] = useState(defaultSelected)
  const [frequency, setFrequency] = useState('weekly')
  const [email, setEmail] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()

    console.log('yo I submit the form. I want it', frequency, 'at', email)
    console.log('Send it with values:', selectedOptions)
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
    setFrequency(event.target.value)
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
    />
  )
}

export default EmailSubscribe

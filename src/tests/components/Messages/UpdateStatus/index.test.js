import React from 'react'
import { shallow } from 'enzyme'

import UpdateStatus from 'components/Messages/UpdateStatus'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper

const setup = (props) => {
  return shallow(<UpdateStatus {...props} />)
}

describe('components/Messages/UpdateStatus', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })


  it('SUCCESS should show a successful message', () => {
    const props = {
      status: statuses.SUCCESS,
      show: true,
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.find('.success').exists()).toBe(true)
  })

  it('ERROR should show an error message', () => {
    const props = {
      status: statuses.ERROR,
      show: true,
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.find('.failure').exists()).toBe(true)
  })

  it('SUCCESS and ERROR messages should not be the same', () => {
    const successProps = {
      status: statuses.SUCCESS,
      show: true,
    }
    const successWrapper = setup(successProps)
    const successMessage = successWrapper.find('.success').text()

    const errorProps = {
      status: statuses.ERROR,
      show: true,
    }
    const errorWrapper = setup(errorProps)
    const errorMessage = errorWrapper.find('.failure').text()

    expect(successMessage).toBeTruthy()
    expect(errorMessage).toBeTruthy()
    expect(successMessage).not.toEqual(errorMessage)
  })

  it('should allow custom message', () => {
    const props = {
      status: statuses.SUCCESS,
      show: true,
      text: 'IT SUCCCEEDED! YAY, WOOHOO, WOWZA!'
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.find('.success').text()).toEqual(props.text)
  })

  it('should not render anything if show is set to false', () => {
    const props = {
      status: statuses.SUCCESS,
      show: false,
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.text()).toBeFalsy()
  })

  it('should not render anything if not updated', () => {
    const props = {
      status: statuses.NOT_FETCHED,
      show: true,
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.text()).toBeFalsy()
  })

  it('should not render anything if still updating', () => {
    const props = {
      status: statuses.FETCHING,
      show: true,
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.text()).toBeFalsy()
  })
})
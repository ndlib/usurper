import React from 'react'
import { shallow } from 'enzyme'
import HoursError from 'components/Hours/Error'

let enzymeWrapper

const setup = (props) => {
  return shallow(<HoursError {...props} />)
}

describe('components/Hours/Error', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should display phone number and title provided', () => {
    const title = 'blah'
    const phone = '123-444-5555'

    const props = {
      hoursEntry: {
        servicePoint: {
          title: title,
          phoneNumber: phone,
        },
      },
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.text()).toEqual(expect.stringContaining(title))
    expect(enzymeWrapper.text()).toEqual(expect.stringContaining(phone))
  })

  it('should default to circulation desk if no service point provided', () => {
    const props = {
      hoursEntry: {},
    }
    enzymeWrapper = setup(props)

    expect(enzymeWrapper.text()).toEqual(expect.stringContaining('circulation desk'))
  })
})

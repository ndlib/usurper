import React from 'react'
import { shallow } from 'enzyme'

import PageAlert from 'components/Contentful/Alert/Page'
import Presenter from 'components/Contentful/Alert/presenter'


let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<PageAlert {...props} />)
}

const today = new Date()
const yesterday = new Date(new Date(today).setDate(today.getDate() - 1))
const tomorrow = new Date(new Date(today).setDate(today.getDate() + 1))

describe('components/Contentful/Alert/Page', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      alerts: [
        {
          sys: {
            id: 'valid 1',
          },
          fields: {
            startTime: yesterday,
            endTime: tomorrow,
            type: 'test_group_1',
          },
        },
        {
          sys: {
            id: 'valid 2',
          },
          fields: {
            startTime: yesterday,
            endTime: tomorrow,
            type: 'test_group_2',
          },
        },
        {
          sys: {
            id: 'valid 777',
          },
          fields: {
            startTime: yesterday,
            endTime: tomorrow,
            type: 'test_group_2',
          },
        },
        {
          sys: {
            id: 'past',
          },
          fields: {
            startTime: yesterday,
            endTime: yesterday,
            type: 'test_invalid',
          },
        },
        {
          sys: {
            id: 'future',
          },
          fields: {
            startTime: tomorrow,
            endTime: tomorrow,
            type: 'test_invalid',
          },
        },
      ],
    }
    enzymeWrapper = setup(props)
  })

  it('should render a presenter', () => {
    expect(enzymeWrapper.find(Presenter).exists()).toBe(true)
  })

  it('should group alerts according to type', () => {
    const presenter = enzymeWrapper.find(Presenter)
    for (const group in presenter.props().alerts) {
      const expectedInGroup = props.alerts.filter(alert => alert.fields.type === group)
      expect(presenter.props().alerts[group]).toHaveLength(expectedInGroup.length)
      expectedInGroup.forEach(expected => {
        expect(presenter.props().alerts[group].some(search => search.id === expected.sys.id)).toBe(true)
      })
    }
  })

  it('should only include current alerts', () => {
    const presenter = enzymeWrapper.find(Presenter)
    expect(presenter.props().alerts['test_group_1']).toHaveLength(1)
    expect(presenter.props().alerts['test_group_2']).toHaveLength(2)
    expect(presenter.props().alerts['test_invalid']).toBeFalsy()
  })
})

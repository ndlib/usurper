import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/StudySpaces/presenter'
import LandingPageWrapper from 'components/LandingPages/Wrapper'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/StudySpaces/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      spaces: [
        {
          id: 'some space',
          title: 'something',
        },
      ],
      combinedStatus: statuses.SUCCESS,
      facets: [
        {
          some: 'facet',
        },
      ],
      location: {
        search: '?type=test',
      },
      history: {},
      match: {
        params: {},
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().entries).toEqual(props.spaces)
    expect(wrapper.props().filteredEntries).toEqual(props.spaces)
    expect(wrapper.props().allEntriesStatus).toEqual(props.combinedStatus)
    expect(wrapper.props().facets).toEqual(props.facets)
  })
})

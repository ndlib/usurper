import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Events/Group/presenter'
import LandingPageWrapper from 'components/LandingPages/Wrapper'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/Events/Group/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    const someEvent = {
      id: 'some event',
      slug: 'somewhere',
      title: 'something',
      startDate: '2019-09-07',
      endDate: '2019-09-07',
    }
    props = {
      pageTitle: 'BLAST FROM THE PAST',
      events: [
        someEvent,
        {
          startDate: '',
          endDate: '',
        },
      ],
      filteredEvents: [
        someEvent,
      ],
      fetchStatus: statuses.SUCCESS,
      location: {
        pathname: '/somewhere',
        search: '?type=test',
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.props().pageTitle).toEqual(props.pageTitle)
    expect(wrapper.props().entries).toEqual(props.events)
    expect(wrapper.props().filteredEntries).toEqual(props.events)
    expect(wrapper.props().allEntriesStatus).toEqual(props.fetchStatus)
  })
})

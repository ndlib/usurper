import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Exhibits/Current/presenter'
import LandingPageWrapper from 'components/LandingPages/Wrapper'
import Link from 'components/Interactive/Link'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/Exhibits/Current/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    const someExhibit = {
      id: 'some exhibit',
      slug: 'somewhere',
      title: 'something',
      startDate: '2019-09-07',
      endDate: '2019-09-07',
    }
    props = {
      pageTitle: 'INTO THE FUTURE',
      pageDate: '20190907',
      exhibits: [
        someExhibit,
        {
          id: '',
          event: {
            startDate: '',
            endDate: '',
          },
        },
      ],
      filteredExhibits: [
        someExhibit,
      ],
      allExhibitsStatus: statuses.SUCCESS,
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
    expect(wrapper.props()).toEqual(expect.objectContaining({
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      entries: props.exhibits,
      filteredEntries: props.filteredExhibits,
      allEntriesStatus: props.allExhibitsStatus,
    }))
  })

  it('should render a Link to collections', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    const link = wrapper.find(Link)
    expect(link.exists()).toBe(true)
    expect(link.props().to).toEqual('https://collections.library.nd.edu')
  })
})

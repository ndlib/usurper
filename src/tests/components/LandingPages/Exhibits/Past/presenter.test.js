import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Exhibits/Past/presenter'
import DateFilter from 'components/Interactive/DateFilter'
import LandingPageWrapper from 'components/LandingPages/Wrapper'
import SideNav from 'components/Layout/Navigation/SideNav'

import * as statuses from 'constants/APIStatuses'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/LandingPages/Exhibits/Past/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    const someExhibit = {
      id: 'some exhibit',
      slug: 'somewhere',
      title: 'something',
      event: {
        startDate: '2019-09-07',
        endDate: '2019-09-07',
      },
    }
    props = {
      pageTitle: 'BLAST FROM THE PAST',
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
      filterYear: 2019,
      filterMonth: 8,
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
    expect(wrapper.props()).toEqual(expect.objectContaining({
      pageTitle: props.pageTitle,
      pageDate: props.pageDate,
      entries: props.exhibits,
      filteredEntries: props.filteredExhibits,
      allEntriesStatus: props.allExhibitsStatus,
    }))
  })

  it('should render a DateFilter component as a child of LandingPageWrapper', () => {
    const wrapper = enzymeWrapper.find(LandingPageWrapper)
    expect(wrapper.exists()).toBe(true)

    expect(wrapper.containsMatchingElement(
      <DateFilter entries={props.exhibits.map(exhibit => exhibit.event)} filterYear={props.filterYear} filterMonth={props.filterMonth} location={props.location} />
    )).toBe(true)
    // Make sure those props actually had values otherwise we can't verify it is passing anything
    expect(props.exhibits.length).toBeGreaterThan(0)
    expect(props.filterYear).toBeGreaterThan(0)
    expect(props.filterMonth).toBeGreaterThan(0)
  })
})

import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Events/Wrapper/presenter'
import EventCard from 'components/EventCard'
import PageTitle from 'components/Layout/PageTitle'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

const firstEvent = {
  id: 'some event',
  slug: 'somewhere',
  title: 'something',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}
const secondEvent = {
  id: 'you will not see me',
  slug: 'in events',
  title: 'but you will in allEvents',
  startDate: '2019-09-01',
  endDate: '2019-10-12',
}
const lastEvent = {
  id: 'in the end',
  slug: 'this is just',
  title: 'a silly test',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}

describe('components/LandingPages/Events/Wrapper/presenter', () => {
  const children = <div>Look for me!</div>

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  beforeEach(() => {
    props = {
      linkPath: '/down/the',
      linkText: 'Rabbit Hole',
      pageTitle: 'wHy ArE yOu HeRe?',
      pageDate: '20190907',
      events: [
        firstEvent,
        secondEvent,
        lastEvent,
      ],
      onFilterChange: jest.fn(),
      filterValue: 'test',
      children: children,
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct page title', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title={props.pageTitle} />)).toBe(true)
  })

  it('should render EventCard component for each entry', () => {
    expect(props.events.length).toBeGreaterThan(0)
    expect(enzymeWrapper.find(EventCard)).toHaveLength(props.events.length)

    props.events.forEach(event => {
      const found = enzymeWrapper.findWhere(el => el.type() === EventCard && el.props().entry === event)
      expect(found.exists()).toBe(true)
      expect(found.props().isLast).toEqual(event === lastEvent)
    })
  })

  it('should call onFilterChange when modifying FilterBox value', () => {
    const filter = enzymeWrapper.find(FilterBox)
    expect(filter.exists()).toBe(true)
    expect(filter.props().value).toEqual(props.filterValue)

    filter.simulate('change')
    expect(props.onFilterChange).toHaveBeenCalled()
  })

  it('should render link as provided in props', () => {
    expect(enzymeWrapper.containsMatchingElement(<Link to={props.linkPath}>{props.linkText}</Link>)).toBe(true)
  })
})

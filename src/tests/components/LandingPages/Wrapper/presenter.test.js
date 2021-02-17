import React from 'react'
import { shallow } from 'enzyme'

import Presenter from 'components/LandingPages/Wrapper/presenter'
import EventCard from 'components/EventCard'
import PageTitle from 'components/Layout/PageTitle'
import Link from 'components/Interactive/Link'
import FilterBox from 'components/Interactive/FilterBox'
import Facet from 'components/Interactive/Facet'
import LibMarkdown from 'components/LibMarkdown'
import StaticAlert from 'components/Contentful/StaticContent/Alert'
import StaticBody from 'components/Contentful/StaticContent/Body'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

const firstEntry = {
  id: 'some entry',
  slug: 'somewhere',
  title: 'something',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}
const secondEntry = {
  id: 'you will not see me',
  slug: 'in entries',
  title: 'but you will in allEntries',
  startDate: '2019-09-01',
  endDate: '2019-10-12',
}
const lastEntry = {
  id: 'in the end',
  slug: 'this is just',
  title: 'a silly test',
  startDate: '2019-09-07',
  endDate: '2019-09-07',
}

const inFacets = [
  {
    label: 'Audience',
    fieldName: 'audience',
    options: [
      {
        key: 'Human',
        value: 'Human',
      },
      {
        key: 'Epic Developer',
        value: 'Epic Developer',
      },
    ],
  },
  {
    label: 'Type',
    fieldName: 'type',
    options: [
      {
        key: 'Uber Program',
        value: 'Uber Program',
      },
      {
        key: 'Boring',
        value: 'Boring',
      },
    ],
  },
]

describe('components/LandingPages/Wrapper/presenter', () => {
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
      typeLabel: 'A Thing',
      entryCardComponent: EventCard,
      entries: [
        firstEntry,
        secondEntry,
        lastEntry,
      ],
      onFilterChange: jest.fn(),
      filterValue: 'test',
      onFacetApply: jest.fn(),
      onFacetRemove: jest.fn(),
      facets: inFacets,
      facetValues: {
        audience: ['Epic Programmers'],
        type: ['Uber Programs'],
      },
      children: children,
    }
    enzymeWrapper = setup(props)
  })

  it('should render correct page title', () => {
    expect(enzymeWrapper.containsMatchingElement(<PageTitle title={props.pageTitle} />)).toBe(true)
  })

  it('should render event card for each entry', () => {
    expect(props.entries.length).toBeGreaterThan(0)

    const cards = enzymeWrapper.find('.event-card')
    expect(cards).toHaveLength(props.entries.length)

    props.entries.forEach(entry => {
      const found = cards.findWhere(el => el.props().entry === entry)
      expect(found.exists()).toBe(true)
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

  it('should render a facet selector for audience', () => {
    const facet = enzymeWrapper.findWhere(el => el.type() === Facet && el.props().name === 'audience')
    expect(facet.exists()).toBe(true)
    expect(facet.props().selectedValues).toEqual(props.facetValues['audience'])
  })

  it('should render a facet selector for type', () => {
    const facet = enzymeWrapper.findWhere(el => el.type() === Facet && el.props().name === 'type')
    expect(facet.exists()).toBe(true)
    expect(facet.props().selectedValues).toEqual(props.facetValues['type'])
  })

  it('should not render a StaticAlert component', () => {
    expect(enzymeWrapper.find(StaticAlert).exists()).toBe(false)
  })

  it('should not render a StaticBody component', () => {
    expect(enzymeWrapper.find(StaticBody).exists()).toBe(false)
  })

  describe('with static content for dynamic page', () => {
    beforeEach(() => {
      props = {
        ...props,
        slug: 'page-slug',
        dynamicPage: {
          fields: {
            title: 'Dynamic page title',
          },
        },
      }

      enzymeWrapper = setup(props)
    })

    it('should use title from dynamic page', () => {
      const title = enzymeWrapper.find(PageTitle)
      expect(title.exists()).toBe(true)
      expect(title.props().title).toEqual('Dynamic page title')
    })

    it('should render a StaticAlert component', () => {
      expect(enzymeWrapper.find(StaticAlert).exists()).toBe(true)
    })

    it('should render a StaticBody component with markdown contents', () => {
      const body = enzymeWrapper.find(StaticBody)
      expect(body.exists()).toBe(true)
      expect(body.find(LibMarkdown).exists()).toBe(true)
    })
  })
})

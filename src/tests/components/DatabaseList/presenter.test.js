import React from 'react'
import PageTitle from 'components/Layout/PageTitle'
import 'static/css/global.css'
import ListPresenter from 'components/DatabaseList/presenter'
import Link from 'components/Interactive/Link'
import ErrorLoading from 'components/Messages/Error'
import Loading from 'components/Messages/Loading'
import Databases from 'components/DatabaseList/Databases'
import Alphabet from 'components/DatabaseList/Alphabet'
import Facet from 'components/Interactive/Facet'
import PageAlert from 'components/Contentful/Alert/Page'
import StaticSidebar from 'components/Contentful/StaticContent/Sidebar'
import * as statuses from 'constants/APIStatuses'
import { shallow } from 'enzyme'

const setup = (props) => {
  return shallow(<ListPresenter {...props} />)
}

let props
let enzymeWrapper
describe('components/DatabaseList/presenter.js', () => {
  describe('status: FETCHING', () => {
    beforeEach(() => {
      props = {
        letter: 'a',
        list: [],
        status: statuses.FETCHING,
        databaseFavorites: [],
        subjects: [],
        activeSubjects: [],
        onSubjectFilterApply: jest.fn(),
        onLetterFilterApply: jest.fn(),
        slug: 'test',
        facets: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should show the Loading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Loading />)).toBe(true)
    })
  })

  describe('status: SUCCESS', () => {
    beforeEach(() => {
      global.__APP_CONFIG__.features.subjectFilteringEnabled = true
      props = {
        status: statuses.SUCCESS,
        letter: 'a',
        list: [
          {
            fields: {
              title: 'fake title',
              alephSystemNumber: '12345',
              purl: 'foo',
              description: 'test',
              urls: [{
                url: 'https://eresources.library.nd.edu/databases/artsource',
                notes: null,
                title: null,
              }],
            },
            sys: {
              id: '5678',
            },
          },
          {
            fields: {
              title: 'fake title 2',
              alephSystemNumber: '55555',
              purl: 'bar',
              description: 'baz',
              urls: [{
                url: 'https://www.fake.url',
                notes: null,
                title: null,
              }],
            },
            sys: {
              id: '1337',
            },
          },
        ],
        databaseFavorites: [{
          key: '1337_link_0',
          title: 'title does not need to match',
          url: 'http://url.also.not/important',
        }],
        subjects: [
          {
            sys: { id: '11111111' },
            fields: { id: 'test' },
            linkText: 'Display value',
          }
        ],
        activeSubjects: ['test'],
        onSubjectFilterApply: jest.fn(),
        onLetterFilterApply: jest.fn(),
        removeSubjectFromFilter: jest.fn(),
        removeLetterFilter: jest.fn(),
        slug: 'test',
        facets: [
          {
            fieldName: 'subjects[].fields.id',
            key: 'subject',
            label: 'Subject',
            options: [
              {
                key: '★ Multidisciplinary',
                value: '★ Multidisciplinary',
              },
              {
                key: 'aerospace-and-mechanical-engineering',
                value: 'Aerospace and Mechanical Engineering',
              },
            ],
          },
        ],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a Databases component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Databases list={props.list} subjectFilter={props.activeSubjects} facets={props.facets} />)).toBe(true)
    })

    it('should render an Alphabet component for filtering', () => {
      expect(enzymeWrapper.find(Alphabet).exists()).toBe(true)
    })

    it('should have proper page title', () => {
      const titleElement = enzymeWrapper.find(PageTitle)
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.props().title).toEqual(expect.stringMatching('Databases'))
    })

    it('should render a facet selector for subjects', () => {
      const facet = enzymeWrapper.findWhere(el => el.type() === Facet && el.props().name === 'subject')
      expect(facet.exists()).toBe(true)
      expect(facet.props().options).toEqual(props.facets[0].options)
      expect(facet.props().selectedValues).toEqual(props.activeSubjects)
    })

    it('should render page alerts', () => {
      expect(enzymeWrapper.find(PageAlert).exists()).toBe(true)
    })

    it('should render sidebar info', () => {
      expect(enzymeWrapper.find(StaticSidebar).exists()).toBe(true)
    })
  })

  describe('status: NOT_FOUND', () => {
    beforeEach(() => {
      props = {
        status: statuses.NOT_FOUND,
        letter: 'a',
        list: [],
        databaseFavorites: [],
        subjects: [],
        activeSubjects: [],
        onSubjectFilterApply: jest.fn(),
        onLetterFilterApply: jest.fn(),
        slug: 'test',
        facets: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a Databases component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Databases list={props.list} subjectFilter={props.activeSubjects} facets={props.facets} />)).toBe(true)
    })

    it('should have proper page title', () => {
      const titleElement = enzymeWrapper.find(PageTitle)
      expect(titleElement.exists()).toBe(true)
      expect(titleElement.props().title).toEqual(expect.stringMatching('Databases'))
    })
  })

  describe('status: null', () => {
    beforeEach(() => {
      props = {
        status: null,
        letter: 'a',
        list: [],
        databaseFavorites: [],
        subjects: [],
        activeSubjects: [],
        onSubjectFilterApply: jest.fn(),
        onLetterFilterApply: jest.fn(),
        slug: 'test',
        facets: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render an ErrorLoading component', () => {
      expect(enzymeWrapper.containsMatchingElement(<ErrorLoading />)).toBe(true)
    })
  })
})

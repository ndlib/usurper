import React from 'react'
import PageTitle from 'components/Layout/PageTitle'
import 'static/css/global.css'
import ListPresenter from 'components/DatabaseList/presenter'
import Link from 'components/Interactive/Link'
import ErrorLoading from 'components/Messages/Error'
import Loading from 'components/Messages/Loading'
import Databases from 'components/DatabaseList/Databases'
import Alphabet from 'components/DatabaseList/Alphabet'
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
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a Databases component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Databases list={props.list} />)).toBe(true)
    })

    it('should render an Alphabet component for filtering', () => {
      expect(enzymeWrapper.containsMatchingElement(<Alphabet />)).toBe(true)
    })

    it('should have proper page title', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<PageTitle title={'Databases: ' + props.letter.toUpperCase()} />))
        .toBe(true)
    })
  })

  describe('status: NOT_FOUND', () => {
    beforeEach(() => {
      props = {
        status: statuses.NOT_FOUND,
        letter: 'a',
        list: [],
        databaseFavorites: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render a Databases component', () => {
      expect(enzymeWrapper.containsMatchingElement(<Databases list={props.list} />)).toBe(true)
    })

    it('should have proper page title', () => {
      const have = <PageTitle title={'Databases: ' + props.letter.toUpperCase()} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  describe('status: null', () => {
    beforeEach(() => {
      props = {
        status: null,
        letter: 'a',
        list: [],
        databaseFavorites: [],
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

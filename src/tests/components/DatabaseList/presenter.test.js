import React from 'react'
import PageTitle from '../../../components/Layout/PageTitle'
import '../../../static/css/global.css'
import ListPresenter from '../../../components/DatabaseList/presenter'
import Link from '../../../components/Interactive/Link'
import ErrorLoading from '../../../components/Messages/Error'
import Loading from '../../../components/Messages/Loading'
import * as statuses from '../../../constants/APIStatuses'
import { shallow } from 'enzyme'

const setup = (props) => {
  return shallow(
    <ListPresenter {...props} />)
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
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })
    it('should show the Loading component', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<Loading />))
        .toBe(true)
    })
  })

  describe('status: SUCCESS - with proper list value for value', () => {
    beforeEach(() => {
      props = {
        status: statuses.SUCCESS,
        letter: 'a',
        list: [{
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
        }],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('database with one url', () => {
      let fields = props.list[0].fields
      let sys = props.list[0].sys
      expect(enzymeWrapper
        .containsMatchingElement(
            <Link to={fields.urls[0].url} title={'Go to ' + fields.title}>
              <h2 className='dbItem'>{fields.title}</h2>
            </Link>))
        .toBe(true)
    })
  })

  describe('status: SUCCESS - with undefined list value for letter', () => {
    beforeEach(() => {
      props = {
        status: statuses.SUCCESS,
        letter: 'a',
        list: null,
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should be an empty render', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })

  describe('status: NOT_FOUND', () => {
    beforeEach(() => {
      props = {
        status: statuses.NOT_FOUND,
        letter: 'a',
        list: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should have proper page title', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<PageTitle title={'Databases: ' + props.letter.toUpperCase()} />))
        .toBe(true)
    })

    it('should have proper database list {data}', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<section aria-label={'List of all "' + props.letter.toUpperCase() + '" Databases'}>
          Nothing found for this letter
        </section>))
        .toBe(true)
    })
  })

  describe('status: null', () => {
    beforeEach(() => {
      props = {
        status: null,
        letter: 'a',
        list: [],
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should have proper page title', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<ErrorLoading message='Error loading page' />))
        .toBe(true)
    })
  })
})

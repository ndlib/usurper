import React from 'react'
import PropTypes from 'prop-types'
import PageTitle from '../../../components/PageTitle'
import '../../../static/css/global.css'
import ListPresenter from '../../../components/DatabaseList/presenter'
import Link from '../../../components/Link'
import PageNotFound from '../../../components/Messages/NotFound'
import ErrorLoading from '../../../components/Messages/Error'
import * as statuses from '../../../constants/APIStatuses'
import { shallow } from 'enzyme'

const setup = (props) => {
  return shallow(<ListPresenter cfDatabaseLetter={props.cfDatabaseLetter} letter={props.cfDatabaseLetter.letter} />)
}

let props
let enzymeWrapper
describe('components/DatabaseList/presenter.js', () => {
  describe('status: FETCHING', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          status: statuses.FETCHING,
          letter: 'a',
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should have proper page title', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<PageTitle title={'Databases: ' + props.cfDatabaseLetter.letter.toUpperCase()} />))
        .toBe(true)
    })

    it('should have proper database list {data}', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<section aria-label={'List of all "' + props.cfDatabaseLetter.letter.toUpperCase() + '" Databases'}>
          Loading Databases
        </section>))
        .toBe(true)
    })
  })

  describe('status: SUCCESS - with proper list value for value', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          status: statuses.SUCCESS,
          letter: 'a',
          json: {
            fields: {
              'a': [{
                fields: {
                  title: 'fake title',
                  alephSystemNumber: '12345',
                  purl: 'foo',
                  description: 'test',
                },
                sys: {
                  id: '5678',
                },
              }],
            },
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should have list of the databases', () => {
      let fields = props.cfDatabaseLetter.json.fields['a'][0].fields
      let sys = props.cfDatabaseLetter.json.fields['a'][0].sys
      expect(enzymeWrapper
        .containsMatchingElement(<div key={fields.alephSystemNumber + fields.title}>
          <p aria-label={fields.title}>
            <Link to={fields.purl} title={'Go to ' + fields.title}>{fields.title}</Link><br />
            {fields.description}
            <Link to={'/database/' + sys.id} ariaLabel={'More Information about ' + fields.title} className='moreinfo'>More info</Link>
          </p>
        </div>))
        .toBe(true)
    })
  })

  describe('status: SUCCESS - with undefined list value for letter', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          status: statuses.SUCCESS,
          letter: 'a',
          json: {
            fields: {
              'a': null,
            },
          },
        },
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
        cfDatabaseLetter: {
          status: statuses.NOT_FOUND,
          letter: 'a'
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should have proper page title', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<PageTitle title={'Databases: ' + props.cfDatabaseLetter.letter.toUpperCase()} />))
        .toBe(true)
    })

    it('should have proper database list {data}', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<section aria-label={'List of all "' + props.cfDatabaseLetter.letter.toUpperCase() + '" Databases'}>
          Nothing found for this letter
        </section>))
        .toBe(true)
    })
  })

  describe('status: null', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          status: null,
          letter: 'a',
        },
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

  describe('letter.length > 1', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          status: null,
          letter: 'ab',
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should have proper page title', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<PageNotFound />))
        .toBe(true)
    })
  })
})

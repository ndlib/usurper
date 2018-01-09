import React from 'react'
import { shallow, configure } from 'enzyme'
import ListPresenter from '../../../components/DatabaseList/presenter.js'
import { DatabaseListContainer } from '../../../components/DatabaseList/index.js'
import PageNotFound from '../../../components/Messages/NotFound'
import * as statuses from '../../../constants/APIStatuses'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

const setup = (props) => {
  return shallow(<DatabaseListContainer {...props} />, { lifecycleExperimental: true })
}

let enzymeWrapper
let props
describe('components/DatabaseList/index.js', () => {
  describe('DatabaseListContainer', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          a: {
            status: 'test',
            data: [{
              sys: {
                contentType: {
                  sys: {
                    id: 'page',
                  },
                },
              },
            }],
          },
        },
        fetchLetter: jest.fn(),
        currentLetter: 'a',
        allLettersStatus: statuses.NOT_FETCHED,
        personal: {
          login: {},
          loggedIn: true,
          label: 'label',
        },
        location: {
          search: {
            preview: true,
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('renders the DatabaseListPresenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(
          <ListPresenter
            list={props.cfDatabaseLetter.a.data}
            letter={props.currentLetter}
            status={props.cfDatabaseLetter.a.status}
          />
        )
      ).toBe(true)
    })

    it('calls the bound fetchLetter action for every letter plus # on load', () => {
      expect(props.fetchLetter.mock.calls.length).toBe(27)
    })
  })

  describe('letter.length > 1', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          a: {
            status: 'test',
            data: [{
              sys: {
                contentType: {
                  sys: {
                    id: 'page',
                  },
                },
              },
            }],
          },
        },
        fetchLetter: jest.fn(),
        currentLetter: 'ab',
        allLettersStatus: 'test',
        personal: {
          login: {},
          loggedIn: true,
          label: 'label',
        },
        location: {
          search: {
            preview: true,
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('should render 404 page', () => {
      expect(enzymeWrapper
        .containsMatchingElement(<PageNotFound />))
        .toBe(true)
    })
  })
})

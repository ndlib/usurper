import React from 'react'
import { shallow } from 'enzyme'
import ListPresenter from '../../../components/DatabaseList/presenter.js'
import { DatabaseListContainer } from '../../../components/DatabaseList/index.js'
import PageNotFound from '../../../components/Messages/NotFound'

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

    it('renders the DatabaseListPresenter', () => {
      expect(enzymeWrapper
        .containsMatchingElement(
          <ListPresenter
            list={props.cfDatabaseLetter.a.data}
            letter={props.currentLetter}
            status={props.allLettersStatus}
          />
        )
      ).toBe(true)
    })

    it('calls the bound fetchLetter action for every letter on load', () => {
      expect(props.fetchLetter.mock.calls.length).toBe(26)
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

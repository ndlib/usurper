import React from 'react'
import { shallow } from 'enzyme'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import ListPresenter from 'components/DatabaseList/presenter.js'
import DatabaseList,
{
  DatabaseListContainer,
  mapStateToProps,
  mapDispatchToProps
} from 'components/DatabaseList/index.js'
import PageNotFound from 'components/Messages/NotFound'
import * as statuses from 'constants/APIStatuses'

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

const setup = (props) => {
  return shallow(<DatabaseListContainer {...props} />)
}

const validItem1 = {
  sys: {
    contentType: {
      sys: {
        id: 'page',
      },
    },
  },
  fields: {
    title: '1 - first record',
  },
  searchBlob: '1  first record',
}
const validItem2 = {
  sys: {
    contentType: {
      sys: {
        id: 'page',
      },
    },
  },
  fields: {
    title: '2 - middle record SEARCH',
  },
  searchBlob: '2  middle record search',
}
const validItem3 = {
  sys: {
    contentType: {
      sys: {
        id: 'page',
      },
    },
  },
  fields: {
    title: '3 - third record SEARCH',
  },
  searchBlob: '3  third record search',
}
const validItem4 = {
  sys: {
    contentType: {
      sys: {
        id: 'page',
      },
    },
  },
  fields: {
    title: '4 - last record',
  },
  searchBlob: '4  last record',
}

const validCfDatabaseLetter = {
  a: {
    status: statuses.SUCCESS,
    data: [
      validItem4,
      validItem1,
      validItem2,
    ],
  },
  b: {
    status: statuses.SUCCESS,
    data: [
      validItem3,
    ],
  },
}

let enzymeWrapper
let props
describe('components/DatabaseList/index.js', () => {
  describe('with no data', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {},
        fetchLetter: jest.fn(),
        currentLetter: 'a',
        allLettersStatus: statuses.NOT_FETCHED,
        allDbs: [],
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

    it('calls the bound fetchLetter action for every letter plus # on load', () => {
      expect(props.fetchLetter.mock.calls.length).toBe(27)
    })

    it('renders the DatabaseListPresenter that is fetching data', () => {
      const have = <ListPresenter letter={props.currentLetter} status={statuses.FETCHING} />

      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  describe('given valid data', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: validCfDatabaseLetter,
        fetchLetter: jest.fn(),
        currentLetter: 'a',
        allLettersStatus: statuses.SUCCESS,
        allDbs: [
          validItem4,
          validItem1,
          validItem2,
          validItem3,
        ],
        location: {
          search: {
            preview: true,
          },
        },
        match: {
          params: {
            id: 'a',
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    afterEach(() => {
      enzymeWrapper = undefined
    })

    it('renders the DatabaseListPresenter', () => {
      const have = (
        <ListPresenter
          list={props.cfDatabaseLetter.a.data}
          letter={props.currentLetter}
          status={props.cfDatabaseLetter.a.status}
        />
      )
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    describe('with mock store', () => {
      let store

      beforeEach(() => {
        const state = {
          cfDatabaseLetter: validCfDatabaseLetter,
        }
        const ownProps = {
          location: {
            search: {
              preview: 'true',
            },
          },
          match: {
            params: {
              id: 'a',
            },
          },
        }

        store = mockStore(state)
        props = { ...ownProps, ...mapStateToProps(state, props), ...mapDispatchToProps(store.dispatch) }
        enzymeWrapper = shallow(<DatabaseListContainer store={store} {...props} />)
      })

      afterEach(() => {
        store = undefined
      })

      it('should reset filter when letter changed', () => {
        // Set up a filter value so we can ensure it is reset
        enzymeWrapper.setState({
          filterValue: 'test',
        })
        expect(enzymeWrapper.props().filterValue).toEqual('test')

        // Now change the letter being requested by setting props
        enzymeWrapper.setProps({
          match: {
            params: {
              id: 'b',
            },
          },
        })
        expect(enzymeWrapper.props().filterValue).toBeFalsy()
      })

      it('should filter records when searching', () => {
        // Check what records are currently being returned. This will help us ensure our test is doing something
        const originalResults = enzymeWrapper.props().list
        expect(enzymeWrapper.props().list).toBeTruthy()


        // Search for the term "SEARCH" and make sure we get only the correct results based on our test data
        enzymeWrapper.instance().onFilterChange({
          target: {
            value: 'SEARCH',
          }
        })

        const newList = enzymeWrapper.state().filteredList
        expect(newList).not.toEqual(originalResults)
        expect(newList).toEqual(expect.arrayContaining([
          validItem2,
          validItem3,
        ]))
        // Make sure rendered presenter receives the newly filtered list
        const have = <ListPresenter list={newList} />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })

      it('should re-filter if a new list is received', () => {
        enzymeWrapper.setState({
          filterValue: 'SEARCH',
        })
        enzymeWrapper.setProps({
          allDbs: [
            validItem1,
            validItem3,
          ],
        })
        // Should only include items that match the search term
        expect(enzymeWrapper.state().filteredList).toEqual([ validItem3 ])
      })
    })

    describe('mapStateToProps', () => {
      let state
      beforeEach(() => {
        state = {
          cfDatabaseLetter: validCfDatabaseLetter,
        }
      })

      afterEach(() => {
        state = undefined
      })

      it('should sort cfDatabaseLetter lists', () => {
        const expectedData = {
          a: {
            status: statuses.SUCCESS,
            data: [
              validItem1,
              validItem2,
              validItem4,
            ],
          },
          b: {
            status: statuses.SUCCESS,
            data: [
              validItem3,
            ],
          },
        }
        const result = mapStateToProps(state, props)

        expect(result.cfDatabaseLetter).toEqual(expectedData)
      })

      it('should include records from all letters in allDbs', () => {
        const result = mapStateToProps(state, props)

        for (const letter in props.cfDatabaseLetter) {
          props.cfDatabaseLetter[letter].data.forEach((record) => {
            expect(result.allDbs).toContain(record)
          })
        }
      })

      it('should conglomerate status results', () => {
        const tempProps = {
          match: {
            params: {
              id: 'a',
            },
          },
        }
        let tempState
        let result

        tempState = {
          cfDatabaseLetter: {
            a: { status: statuses.SUCCESS, data: [] },
            b: { status: statuses.FETCHING, data: [] },
            c: { status: statuses.NOT_FETCHED, data: [] },
          },
        }
        result = mapStateToProps(tempState, tempProps)
        expect(result.allLettersStatus).toEqual(statuses.FETCHING)

        tempState = {
          cfDatabaseLetter: {
            a: { status: statuses.NOT_FOUND, data: [] },
            b: { status: statuses.FETCHING, data: [] },
            c: { status: statuses.NOT_FETCHED, data: [] },
          },
        }
        result = mapStateToProps(tempState, tempProps)
        expect(result.allLettersStatus).toEqual(statuses.FETCHING)

        tempState = {
          cfDatabaseLetter: {
            a: { status: statuses.SUCCESS, data: [] },
            b: { status: statuses.ERROR, data: [] },
            c: { status: statuses.NOT_FOUND, data: [] },
            d: { status: statuses.FETCHING, data: [] },
            e: { status: statuses.NOT_FETCHED, data: [] },
          },
        }
        result = mapStateToProps(tempState, tempProps)
        expect(result.allLettersStatus).toEqual(statuses.ERROR)

        tempState = {
          cfDatabaseLetter: {
            a: { status: statuses.SUCCESS, data: [] },
            b: { status: statuses.NOT_FOUND, data: [] },
          },
        }
        result = mapStateToProps(tempState, tempProps)
        expect(result.allLettersStatus).toEqual(statuses.SUCCESS)
      })
    })
  })

  describe('letter.length > 1', () => {
    beforeEach(() => {
      props = {
        cfDatabaseLetter: {
          a: {
            status: statuses.SUCCESS,
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
        allDbs: [],
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

    it('should render PageNotFound', () => {
      expect(enzymeWrapper.containsMatchingElement(<PageNotFound />)).toBe(true)
    })
  })
})

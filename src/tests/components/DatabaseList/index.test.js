import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { mount, shallow } from 'enzyme'
import ListPresenter from '../../../components/DatabaseList/presenter.js'
import {DatabaseListContainer} from'../../../components/DatabaseList/index.js'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'



const setup = (props) => {
  return shallow(<DatabaseListContainer {...props} />, { lifecycleExperimental: true })
}

let enzymeWrapper
let props
describe('components/DatabaseList/index.js', () => {
  describe('DatabaseListContainer', () => {
    beforeEach(()=> {
      props = {
        cfDatabaseLetter: {
          status: 'test',
          json: {
            sys: {
              contentType: {
                sys: {
                  id: 'page',
                },
              },
            },
          },
        },
        fetchLetter: jest.fn(),
        match: {
          params: {
            id: 'a',
          },
        },
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
        .containsMatchingElement(<ListPresenter cfDatabaseLetter={props.cfDatabaseLetter} letter={props.match.params.id.toLowerCase()} />))
        .toBe(true)
    })

    it('calls the bound fetchLetter action on load', () => {
      expect(props.fetchLetter.mock.calls.length).toBe(1)
    })
  })
})

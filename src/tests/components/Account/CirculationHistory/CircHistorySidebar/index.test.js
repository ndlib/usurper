import React from 'react'
import { shallow } from 'enzyme'

import CircHistorySidebar from 'components/Account/CirculationHistory/CircHistorySidebar'
import PageLink from 'components/Contentful/PageLink'
import Config from 'shared/Configuration'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<CircHistorySidebar {...props} />)
}

describe('components/Account/CirculationHistory/CircHistorySidebar', () => {
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  describe('opted in', () => {
    beforeEach(() => {
      props = {
        optedIn: true,
        onClickOptOut: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render a button to opt out', () => {
      const find = <button onClick={props.onClickOptOut}>{expect.anything()}</button>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render a callout link to service now', () => {
      const found = enzymeWrapper.find(PageLink)
      expect(found).toHaveLength(1)

      expect(found.props().className).toContain('callout')
      expect(found.props().cfPage).toMatchObject({
        fields: {
          title: expect.any(String),
          url: expect.stringContaining(Config.serviceNowBaseURL),
        },
      })
    })
  })

  describe('opted out', () => {
    beforeEach(() => {
      props = {
        optedIn: false,
        onClickOptOut: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})

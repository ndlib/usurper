import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Contentful/StaticContent/Sidebar/presenter'
import PageLink from 'components/Contentful/PageLink'
import Related from 'components/Contentful/Related'
import ServicePoint from 'components/Contentful/ServicePoint'
import Librarians from 'components/Librarians'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Contentful/StaticContent/Sidebar/presenter', () => {
  beforeEach(() => {
    props = {
      cfStatic: {
        sys: {
          id: 'id',
        },
        fields: {
          callOutLink: {},
          contactPeople: ['me', 'you'],
          relatedPages: [],
          servicePoints: [
            {
              text: 'foo',
            },
            {
              text: 'bar',
            },
          ],
          shortDescription: 'desc',
        },
      },
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should show shortDescription if provided', () => {
    const found = enzymeWrapper.findWhere(el => el.text() === props.cfStatic.fields.shortDescription)
    expect(found.exists()).toBe(true)
  })

  it('should render a callout link', () => {
    const found = enzymeWrapper.find(PageLink)
    expect(found.exists()).toBe(true)
    expect(found.props().cfPage).toEqual(props.cfStatic.fields.callOutLink)
  })

  it('should render a Librarians component', () => {
    const found = enzymeWrapper.find(Librarians)
    expect(found.exists()).toBe(true)
    expect(found.props().netids).toEqual(props.cfStatic.fields.contactPeople)
  })

  it('should render a Related component', () => {
    const found = enzymeWrapper.find(Related)
    expect(found.exists()).toBe(true)
    expect(found.props().children).toEqual(props.cfStatic.fields.relatedPages)
  })

  it('should render a ServicePoint for each service point in props', () => {
    props.cfStatic.fields.servicePoints.forEach(sp => {
      expect(enzymeWrapper.containsMatchingElement(<ServicePoint cfServicePoint={sp} />)).toBe(true)
    })
  })
})

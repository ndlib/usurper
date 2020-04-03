import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Contentful/StaticContent/Body/presenter'
import Related from 'components/Contentful/Related'
import LibMarkdown from 'components/LibMarkdown'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

describe('components/Contentful/StaticContent/Body/presenter', () => {
  beforeEach(() => {
    props = {
      cfStatic: {
        sys: { id: 'test' },
        fields: {
          shortDescription: 'I describe things',
          relatedResources: ['one', 'two', 'resource'],
          relatedServices: 'service text',
          libguides: 'libguide text',
        },
      },
      showDescription: true,
      children: (<div>test</div>),
    }
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should render description as markdown', () => {
    const found = enzymeWrapper.findWhere(el => el.type() === LibMarkdown && el.children().text() === props.cfStatic.fields.shortDescription)
    expect(found.exists()).toBe(true)
  })

  it('should render children', () => {
    expect(enzymeWrapper.containsMatchingElement(props.children)).toBe(true)
  })

  it('should render related resources', () => {
    const related = enzymeWrapper.find(Related)
    expect(related.findWhere(component => component.props().children === props.cfStatic.fields.relatedResources).exists()).toBe(true)
  })

  it('should render related services', () => {
    const related = enzymeWrapper.find(Related)
    expect(related.findWhere(component => component.props().children === props.cfStatic.fields.relatedServices).exists()).toBe(true)
  })

  it('should render libguides', () => {
    const related = enzymeWrapper.find(Related)
    expect(related.findWhere(component => component.props().children === props.cfStatic.fields.libguides).exists()).toBe(true)
  })

  describe('with description off', () => {
    beforeEach(() => {
      props = {
        cfStatic: {
          sys: { id: 'test' },
          fields: {
            shortDescription: 'I describe things',
          },
        },
        showDescription: false,
      }
      enzymeWrapper = setup(props)
    })

    it('should NOT render markdown text', () => {
      expect(enzymeWrapper.find(LibMarkdown).exists()).toBe(false)
    })
  })
})

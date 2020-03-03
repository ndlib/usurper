import React from 'react'
import { Provider } from 'react-redux'
import { mount, shallow } from 'enzyme'

import Presenter from 'components/Contentful/Event/presenter'
import RecurringIndicator from 'components/Contentful/Event/RecurringIndicator'
import Related from 'components/Contentful/Related'
import ServicePoint from 'components/Contentful/ServicePoint'
import InternalLink from 'components/Contentful/InternalLink'
import PageLink from 'components/Contentful/PageLink'
import Image from 'components/Image'
import Librarians from 'components/Librarians'
import LibMarkdown from 'components/LibMarkdown'
import Presenters from 'components/Presenters'
import Sponsorships from 'components/Sponsorships'
import AddToCalendar from 'components/Interactive/AddToCalendar'
import ShareLinks from 'components/Interactive/ShareLinks'

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

let enzymeWrapper
let props

describe('components/Contentful/Event/presenter', () => {
  beforeEach(() => {
    props = {
      entry: {
        title: 'Event',
        shortDescription: 'I am an event',
        locationText: 'Somewhere',
        content: 'Things are happening. People are going. You should too.',
        startDate: 'The beginning',
        endDate: 'The end',
        displayTime: 'Eh... Whenever sounds good. Kinda winging it.',
        representationalImage: { title: 'fancy graphic' },
        sponsors: 'deni moore',
        audience: [
          'kool kids',
        ],
        contactPeople: [
          { name: 'bob newheart' },
        ],
        relatedPages: [
          { title: 'Other super cool event' },
        ],
        relatedResources: [
          { title: 'A thing with information' },
        ],
        callOutLinks: [
          {
            sys: {
              id: '2qw3kg6txFOLfyqxOC3pKS',
              contentType: {
                sys: {
                  id: 'externalLink',
                },
              },
            },
            fields: {
              title: 'University Archives Offices',
              url: 'http://archives.nd.edu/',
            },
          },
          {
            sys: {
              id: 'political-science',
              contentType: {
                sys: {
                  id: 'internalLink',
                },
              },
            },
            fields: {
              title: 'Link to Political Science',
              id: 'political-science',
              page: {
                sys: {
                  type: 'Link',
                  linkType: 'Entry',
                  id: '3zp0XsdRMsgWcuyYE2aicU',
                },
              },
              usePageTitle: true,
            }
          },
        ],
      },
    }
    enzymeWrapper = setup(props)
  })

  it('should render article contents in LibMarkdown component', () => {
    const search = <LibMarkdown>{expect.stringContaining(props.entry.content)}</LibMarkdown>
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render display time in LibMarkdown component', () => {
    const search = <LibMarkdown>{props.entry.displayTime}</LibMarkdown>
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render location in LibMarkdown component', () => {
    const search = <LibMarkdown>{props.entry.locationText}</LibMarkdown>
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render a Librarians component', () => {
    const search = <Librarians netids={props.entry.contactPeople} />
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render a Sponsorships component', () => {
    const search = <Sponsorships sponsors={props.entry.sponsors} />
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render a ShareLinks component', () => {
    const search = <ShareLinks title={props.entry.title} />
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render a Presenters component', () => {
    const search = <Presenters presenters={props.entry.presenters} />
    expect(enzymeWrapper.containsMatchingElement(search)).toBe(true)
  })

  it('should render an AddToCalendar component', () => {
    const found = enzymeWrapper.find(AddToCalendar)
    expect(found.exists()).toBe(true)
    expect(found.props().title).toEqual(props.entry.title)
    expect(found.props().description).toEqual(props.entry.shortDescription)
    expect(found.props().location).toEqual(props.entry.locationText)
    expect(found.props().startDate).toEqual(props.entry.startDate)
    expect(found.props().endDate).toEqual(props.entry.endDate)
  })

  it('should render an representational image component', () => {
    const found = enzymeWrapper.find(Image)
    expect(found.exists()).toBe(true)
    expect(found.props().cfImage).toEqual(props.entry.representationalImage)
  })

  it('should render a Related component for related pages', () => {
    const found = enzymeWrapper.findWhere(el => el.type() === Related && el.props().children === props.entry.relatedPages)
    expect(found.exists()).toBe(true)
  })

  it('should render a Related component for related resources', () => {
    const found = enzymeWrapper.findWhere(el => el.type() === Related && el.props().children === props.entry.relatedResources)
    expect(found.exists()).toBe(true)
  })

  it('should render a RecurringIndicator component', () => {
    const found = enzymeWrapper.find(RecurringIndicator)
    expect(found.exists()).toBe(true)
  })

  it('should render a ServicePoint component', () => {
    const found = enzymeWrapper.find(ServicePoint)
    expect(found.exists()).toBe(true)
  })

  it('should render a PageLink component for external link', () => {
    const found = enzymeWrapper.find(PageLink)
    expect(found.exists()).toBe(true)
    expect(found.props().cfPage).toEqual(props.entry.callOutLinks[0])
  })

  it('should render an InternalLink component for internal link', () => {
    const found = enzymeWrapper.find(InternalLink)
    expect(found.exists()).toBe(true)
    expect(found.props().cfEntry).toEqual(props.entry.callOutLinks[1])
  })
})

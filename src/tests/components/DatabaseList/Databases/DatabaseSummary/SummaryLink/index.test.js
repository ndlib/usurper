import React from 'react'
import { shallow } from 'enzyme'
import SummaryLink from 'components/DatabaseList/Databases/DatabaseSummary/SummaryLink'
import LibMarkdown from 'components/LibMarkdown'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<SummaryLink {...props} />)
}

let props
let enzymeWrapper
describe('components/DatabaseList/Databases/DatabaseSummary/SummaryLink', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with notes', () => {
    beforeEach(() => {
      props = {
        link: {
          url: '/CanYouFellTheSunshine',
          title: 'Does it Brighten Up Your Day?',
          notes: 'Don\'t you feel that sometimes you just need to run away.',
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should display a link with the correct url and title', () => {
      const have = <Link to={props.link.url}>{props.link.title}</Link>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should render notes markdown', () => {
      const have = <LibMarkdown>{props.link.notes}</LibMarkdown>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })
  })

  describe('with no notes', () => {
    beforeEach(() => {
      props = {
        link: {
          url: '/ReachOutForTheSunshine',
          title: 'Forget About the Rain',
          notes: null,
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should display a link with the correct url and title', () => {
      const have = <Link to={props.link.url}>{props.link.title}</Link>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should not render notes markdown', () => {
      expect(enzymeWrapper.find(LibMarkdown).exists()).toBe(false)
    })
  })
})

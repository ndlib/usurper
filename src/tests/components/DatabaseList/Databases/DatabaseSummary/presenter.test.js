import React from 'react'
import { shallow } from 'enzyme'
import DatabaseSummary from 'components/DatabaseList/Databases/DatabaseSummary/presenter.js'
import SummaryLink from 'components/DatabaseList/Databases/DatabaseSummary/SummaryLink'
import FavoriteIcon from 'components/Account/Favorites/FavoriteIcon'
import Link from 'components/Interactive/Link'
import Tags from 'components/Interactive/Tags'

const setup = (props) => {
  return shallow(<DatabaseSummary {...props} />)
}

let props
let enzymeWrapper
describe('components/DatabaseList/Databases/DatabaseSummary/presenter.js', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with a single link', () => {
    beforeEach(() => {
      props = {
        item: {
          sys: {
            id: 'hgsadpvzcxnup',
          },
          fields: {
            title: 'Database of Epic Research and Cool Things',
            subjects: [
              {
                sys: { id: '1111' },
                fields: { id: 'math' },
                linkText: 'Mathematics',
              },
              {
                sys: { id: '22222' },
                fields: { id: 'history' },
                linkText: 'History',
              },
            ],
          },
        },
        linkObject: {
          heading: {
            url: 'sample.link/path',
            description: 'A bunch of text about stuff goes here.'
          },
          conditionalLinks: [{
            keyId: 'link_sample',
            url: 'sample.link/path',
            title: 'samply',
          }],
        },
        isFavorited: true,
        favoritesData: [],
        applySubjectFilter: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should display a heading with the database\'s title', () => {
      const have = <h3>{props.item.fields.title}</h3>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should render a link to the database\'s page', () => {
      const found = enzymeWrapper.find(Link).filterWhere(l => l.props().to.endsWith(props.item.sys.id))
      expect(found.exists()).toBe(true)
    })

    it('should render FavoriteIcon', () => {
      expect(enzymeWrapper.containsMatchingElement(<FavoriteIcon isFavorited={props.isFavorited} />)).toBe(true)
    })

    it('should display Tags for subjects', () => {
      const found = enzymeWrapper.find(Tags)
      expect(found.exists()).toBe(true)
      expect(found.props().groups).toHaveLength(props.item.fields.subjects.length)
      expect(props.item.fields.subjects.length).toBeGreaterThan(0)
    })
  })

  describe('with multiple urls', () => {
    beforeEach(() => {
      props = {
        item: {
          sys: {
            id: 'zvdspahgpetwqt',
          },
          fields: {
            title: 'Qwertyuiop',
            subjects: [],
          },
        },
        linkObject: {
          heading: {
            description: 'A bunch of text about stuff goes here.'
          },
          conditionalLinks: [
            {
              keyId: 'link0',
              url: '/goHere',
              title: 'Travel',
            },
            {
              keyId: 'link1',
              url: '/goHereInstead',
              title: 'Fly',
            },
          ],
        },
        isFavorited: false,
        favoritesData: [],
        applySubjectFilter: jest.fn(),
      }
      enzymeWrapper = setup(props)
    })

    it('should render a SummaryLink for each link item', () => {
      expect(props.linkObject.conditionalLinks.length).toBeGreaterThan(0)
      props.linkObject.conditionalLinks.forEach((item) => {
        const have = <SummaryLink link={item} />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })
    })

    it('should render FavoriteIcon', () => {
      expect(enzymeWrapper.containsMatchingElement(<FavoriteIcon isFavorited={props.isFavorited} />)).toBe(true)
    })
  })
})

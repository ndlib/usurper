import React from 'react'
import { shallow } from 'enzyme'
import DatabaseSummary from 'components/DatabaseList/Databases/DatabaseSummary'
import SummaryLink from 'components/DatabaseList/Databases/DatabaseSummary/SummaryLink'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<DatabaseSummary {...props} />)
}

let props
let enzymeWrapper
describe('components/DatabaseList/Databases/DatabaseSummary', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with item purl link', () => {
    beforeEach(() => {
      props = {
        item: {
          sys: {
            id: 'hgsadpvzcxnup',
          },
          fields: {
            title: 'Database of Epic Research and Cool Things',
            purl: 'sample.link/path',
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should display a heading with the database\'s title', () => {
      const have = <h2>{props.item.fields.title}</h2>
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should render a link to the database\'s page', () => {
      const found = enzymeWrapper.find(Link).filterWhere(l => l.props().to.endsWith(props.item.sys.id))
      expect(found.exists()).toBe(true)
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
            urls: [
              {
                url: '/goHere',
                title: 'Travel',
              },
              {
                url: '/goHereInstead',
                title: 'Fly',
              },
            ],
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should render a link to the database\'s page', () => {
      expect(props.item.fields.urls.length).toBeGreaterThan(0)
      props.item.fields.urls.forEach((item) => {
        const have = <SummaryLink link={item} />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })
    })
  })
})

import React from 'react'
import { shallow } from 'enzyme'
import Presenter from 'components/Contentful/Database/presenter'
import SummaryLink from 'components/DatabaseList/Databases/DatabaseSummary/SummaryLink'
import Link from 'components/Interactive/Link'
import PageTitle from 'components/Layout/PageTitle'
import LibMarkdown from 'components/LibMarkdown'
import Config from 'shared/Configuration'

const setup = (props) => {
  return shallow(<Presenter {...props} />)
}

let props
let enzymeWrapper

describe('components/Contentful/Database/presenter', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with a single link', () => {
    beforeEach(() => {
      props = {
        cfDatabaseEntry: {
          sys: {
            id: 'hgsadpvzcxnup',
          },
          fields: {
            title: 'Database of Epic Research and Cool Things',
            purl: 'my.database.com/url',
            alephSystemNumber: '00123456',
            relatedResources: [
              {
                url: 'path/to/thing',
                title: 'xyz',
              },
              {
                url: 'another/path',
              },
            ],
          },
        },
        fieldData: {
          accesss: {
            title: 'This is some information',
            data: 'Value can even *be* __markdown__'
          },
          provider: {
            title: 'Publisher',
            data: 'San Fransokyo Press',
          },
        },
      }
      enzymeWrapper = setup(props)
    })

    it('should display PageTitle with the database\'s title', () => {
      const have = <PageTitle title={props.cfDatabaseEntry.fields.title} />
      expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
    })

    it('should render a SummaryLink to the database\'s url', () => {
      const found = enzymeWrapper.find(SummaryLink)
      expect(found.exists()).toBe(true)
      expect(found.props().link.url).toEqual(props.cfDatabaseEntry.fields.purl)
      expect(found.props().link.title).toEqual(props.cfDatabaseEntry.fields.title)
    })

    it('should render a Link to the item in OneSearch', () => {
      const link = enzymeWrapper.findWhere(el => el.type() === Link && el.props().to.startsWith(Config.onesearchBaseURL))
      expect(link.exists()).toBe(true)
      expect(link.props().to).toEqual(expect.stringContaining(`ndu_aleph${props.cfDatabaseEntry.fields.alephSystemNumber}`))
    })

    it('should render Links for each related resource', () => {
      expect(props.cfDatabaseEntry.fields.relatedResources.length).toBeGreaterThan(0)
      props.cfDatabaseEntry.fields.relatedResources.forEach(related => {
        expect(enzymeWrapper.findWhere(el => el.type() === Link && el.props().to === related.url))
      })
    })

    it('should display information for each key-value pair in fieldData', () => {
      const keys = Object.keys(props.fieldData)
      expect(keys.length).toBeGreaterThan(0)
      keys.forEach(key => {
        const obj = props.fieldData[key]
        expect(enzymeWrapper.containsMatchingElement(<div>{obj.title}:</div>)).toBe(true)
        expect(enzymeWrapper.containsMatchingElement(<LibMarkdown>{obj.data}</LibMarkdown>)).toBe(true)
      })
    })
  })

  describe('with multiple urls', () => {
    beforeEach(() => {
      props = {
        cfDatabaseEntry: {
          sys: {
            id: 'zvdspahgpetwqt',
          },
          fields: {
            title: 'Qwertyuiop',
            urls: [
              {
                url: '/goHere',
                notes: 'some random text',
                title: 'Travel',
              },
              {
                url: '/goHereInstead',
                title: 'Fly',
              },
            ],
          },
        },
        fieldData: {},
      }
      enzymeWrapper = setup(props)
    })

    it('should render a SummaryLink for each link item', () => {
      expect(props.cfDatabaseEntry.fields.urls.length).toBeGreaterThan(0)
      props.cfDatabaseEntry.fields.urls.forEach((item) => {
        const have = <SummaryLink link={item} />
        expect(enzymeWrapper.containsMatchingElement(have)).toBe(true)
      })
    })
  })

  describe('bare-bones object with no links', () => {
    beforeEach(() => {
      props = {
        cfDatabaseEntry: {
          sys: {
            id: 'sssss',
          },
          fields: {
            title: 'zxcvbnm',
          },
        },
        fieldData: {},
      }
      enzymeWrapper = setup(props)
    })

    it('should NOT render the database access section', () => {
      expect(enzymeWrapper.find(SummaryLink).exists()).toBe(false)
      expect(enzymeWrapper.findWhere(el => el.text() === 'Database Access').exists()).toBe(false)
    })

    it('should NOT render the related resources section', () => {
      expect(enzymeWrapper.findWhere(el => el.text() === 'Related Resources').exists()).toBe(false)
    })
  })
})

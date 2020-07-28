import React from 'react'
import { shallow } from 'enzyme'
import { FloorsContainer, mapStateToProps, mapDispatchToProps } from 'components/DynamicPages/FloorList'
import Link from 'components/Interactive/Link'

const setup = (props) => {
  return shallow(<FloorsContainer {...props} />)
}

let enzymeWrapper
let props

describe('components/DynamicPages/FloorList/Container', () => {
  beforeEach(() => {
    props = {
      fetchFloors: jest.fn(),
      floorsStatus: 'true',
      preview: true,
      }
    enzymeWrapper = setup(props)
  })
  
  afterEach(() => {
    enzymeWrapper = undefined
    props = undefined
  })

  it('should call the fetch floors action with preview prop', () => {
    expect(props.fetchFloors).toHaveBeenCalledWith(null, true)
  })

  describe('mapStateToProps', () => {
    it('should map props correctly', () => {
      const ownProps = {
        slug: 'buildingslug',
        location: {
        pathname: 'pathname',
        }
      }
      const state = {
        cfAllFloors: {
          stuff: 'here',
          json: [
            {
              sys: {
                id: 'fakeID',
              },
              fields: {
                title: '1st Floor',
                floorNumber: 1,
                slug: 'hesburgh-1st-floor',
                callNumberRange: 'call numbers',
                spacesText: 'other text',
                building: {
                  fields: {
                    slug: 'buildingslug'
                  }
                }
              }
            },
            {
              sys: {
                id: 'fakeID',
              },
              fields: {
                title: 'Lower Level',
                floorNumber: -1,
                slug: 'hesburgh-ll-floor',
                callNumberRange: 'A, C, G-GV, H-HX, J-K-L, Q-TX (except TR), U-Z',
                spacesText: 'Reserves, Microtext, Engineering Library Collection, Media Desk',
                spacesLinks: [{
                  sys: {
                    id: 'fakeID',
                  },
                  fields: {
                    url: 'Lower Level',
                    slug: 'hesburgh-ll-floor',
                  }
                }],
                building: {
                  fields: {
                    slug: 'buildingslug'
                  }
                }
              }
            },
          ],
        },
      }
      const newProps = mapStateToProps(state, ownProps)
      expect(newProps.floorData.length).toEqual(2)
      expect(newProps.floorData[0].fields.slug).toEqual('hesburgh-ll-floor')
      const mountSpace = shallow(newProps.floorData[0].spacesText)
      const linksFound = mountSpace.find(Link)
      expect(linksFound.exists()).toBe(true)
      expect(mountSpace.text()).toEqual(expect.stringContaining('Reserves, Microtext, Engineering Library Collection, Media Desk'))
      })
    })
    
  describe('mapDispatchToProps', () => {
    it('creates expected actions', () => {
      const newProps = mapDispatchToProps(null)
      expect(newProps.fetchFloors).toEqual(expect.any(Function))
    })
  })
})
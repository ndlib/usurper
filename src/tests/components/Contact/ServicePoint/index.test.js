import React from 'react'
import { shallow } from 'enzyme'

import ContactServicePoint from 'components/Contact/ServicePoint'
import Link from 'components/Interactive/Link'
import LibMarkdown from 'components/LibMarkdown'

let enzymeWrapper
const setup = (props) => {
  return shallow(<ContactServicePoint {...props} />)
}

const servicePointProp = {
  sys: {},
  fields: {
    accessNote: 'Come on in.',
    mapNote: 'Look at this place.',
    title: 'Music Library',
    slug: 'musiclibrary',
    type: 'Library',
    floor: {
      fields: {
        title: 'O\'Neill Hall 3rd Floor',
        slug: 'oneill-hall-3rd-floor',
        building: {
          fields: {
            title: 'O\'Neill Hall',
            mapLink: 'http://map.nd.edu/#/placemarks/1253/zoom/16/lat/41.700346/lon/-86.238899',
          },
        },
        image: {
          sys: {
            id: 'djugahsdUOGZSfv',
          },
          fields: {
            title: 'oneil hall',
          },
        },
      },
    },
    hideFloorMap: false,
    hoursCode: '1146',
    address: '310 O\'Neill Hall',
    faxNumber: '123-456-7890',
    phoneNumber: '(574) 111-2222',
    email: 'mailit@nowhere.com',
    relatedWebPage: {
      circular: true,
      sys: {
        id: 'PAGE_ID',
        contentType: {
          sys: {
            type: 'Link',
            linkType: 'ContentType',
            id: 'page',
          },
        },
      },
      fields: {
        title: 'Music Library',
        type: 'Branch',
        slug: 'music',
      },
    },
  },
}

describe('components/Contact/ServicePoint', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('with null service point', () => {
    const props = {
      showDetails: true,
      servicePoint: null,
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should render nothing', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })

  describe('with full details', () => {
    const props = {
      showDetails: true,
      servicePoint: servicePointProp,
      page: {
        sys: { id: 'PAGE_ID' },
        fields: {
          slug: 'page_slug',
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should render a link to floor map', () => {
      const find = <Link to={'floor/' + props.servicePoint.fields.floor.fields.slug}>{expect.anything()}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render a link to ND Maps', () => {
      const find = <Link to={props.servicePoint.fields.floor.fields.building.fields.mapLink}>{expect.anything()}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render phone number', () => {
      const find = <a href={'tel:+' + props.servicePoint.fields.phoneNumber.replace(/[() -.]/g, '')}>{expect.anything()}</a>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render fax number', () => {
      const find = <li>{props.servicePoint.fields.faxNumber}</li>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render email link', () => {
      const find = <a href={'mailto:' + props.servicePoint.fields.email}>{expect.anything()}</a>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render access note markdown', () => {
      const find = <LibMarkdown>{props.servicePoint.fields.accessNote}</LibMarkdown>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render map note markdown', () => {
      const find = <LibMarkdown>{props.servicePoint.fields.mapNote}</LibMarkdown>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should link to page provided if service point has a circular reference to page', () => {
      const find = <Link to={props.page.fields.slug}>{expect.anything()}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })
  })

  describe('with partial details', () => {
    const props = {
      showDetails: false,
      servicePoint: servicePointProp,
      page: {
        sys: { id: 'PAGE_ID' },
        fields: {
          slug: 'page_slug',
        },
      },
    }

    beforeEach(() => {
      enzymeWrapper = setup(props)
    })

    it('should render a link to floor map', () => {
      const find = <Link to={'floor/' + props.servicePoint.fields.floor.fields.slug}>{expect.anything()}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render a link to ND Maps', () => {
      const find = <Link to={props.servicePoint.fields.floor.fields.building.fields.mapLink}>{expect.anything()}</Link>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should render access note markdown', () => {
      const find = <LibMarkdown>{props.servicePoint.fields.accessNote}</LibMarkdown>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(true)
    })

    it('should NOT render map note markdown', () => {
      const find = <LibMarkdown>{props.servicePoint.fields.mapNote}</LibMarkdown>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
    })

    it('should NOT render phone number', () => {
      const find = <a href={'tel:+' + props.servicePoint.fields.phoneNumber.replace(/[() -.]/g, '')}>{expect.anything()}</a>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
    })

    it('should NOT render fax number', () => {
      const find = <li>{props.servicePoint.fields.faxNumber}</li>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
    })

    it('should NOT render email link', () => {
      const find = <a href={'mailto:' + props.servicePoint.fields.email}>{expect.anything()}</a>
      expect(enzymeWrapper.containsMatchingElement(find)).toBe(false)
    })

    it('should NOT render link to page', () => {
      const find1 = <Link to={props.page.fields.slug}>{expect.anything()}</Link>
      const find2 = <Link to={props.servicePoint.fields.relatedWebPage.fields.slug}>{expect.anything()}</Link>
      expect(enzymeWrapper.containsMatchingElement(find1)).toBe(false)
      expect(enzymeWrapper.containsMatchingElement(find2)).toBe(false)
    })
  })
})

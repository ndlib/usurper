import React from 'react'
import { Provider } from 'react-redux'
import { shallow } from 'enzyme'

import { SearchCallout } from 'components/Contentful/Floor/SearchCallout'

const buildSearchString = (params) => {
  return '?' + Object.keys(params).map(key => {
    // The Primo implementation is kinda goofy so we're emulating that here, although it's not really necessary
    let value = encodeURIComponent(params[key])
    value = value.replace(/%20/g, '+')
    value = value.replace(/\(/g, '%28')
    value = value.replace(/\)/g, '%29')

    return `${key}=${value}`
  }).join('&')
}

const setup = (searchParams, extraProps) => {
  const fullProps = {
    ...extraProps,
    location: {
      search: buildSearchString(searchParams),
    },
  }
  return shallow(<SearchCallout {...fullProps} />)
}

let enzymeWrapper
let params

describe('components/Contentful/Floor/SearchCallout', () => {
  // Because writing a giant encoded one liner makes tests hard to write/read, use a helper which joins the
  // key value pairs and test that it works!
  describe('search string helper', () => {
    it('helper function should encode search string correctly', () => {
      const expected = '?title=Parish+and+Institutional+Records+Collection&author=Clark%2C+Francis+P.+%28Francis+Patrick%29%2C+1936-1979.&sublibrary=ARCHV&call_number=PIC%5BIn-Library+Use+Only%5D&collection=GEN&collection_display=Univ.+Archives+%5B6th+floor%5D+Non-circulating%2C+may+be+off-site.+Visit+or+contact+archives%40nd.edu%2C+574-631-6448'
      const testParams = {
        title: 'Parish and Institutional Records Collection',
        author: 'Clark, Francis P. (Francis Patrick), 1936-1979.',
        sublibrary: 'ARCHV',
        call_number: 'PIC[In-Library Use Only]',
        collection: 'GEN',
        collection_display: 'Univ. Archives [6th floor] Non-circulating, may be off-site. Visit or contact archives@nd.edu, 574-631-6448',
      }
      expect(buildSearchString(testParams)).toEqual(expected)
    })
  })

  describe('with data', () => {
    beforeEach(() => {
      params = {
        title: '   .Garbage title! ,  ..  ',
        author: 'You made this',
        sublibrary: 'UNKNOWN',
        call_number: 'ABCD',
        collection: '123',
        collection_display: 'I collect things',
      }
      enzymeWrapper = setup(params)
    })

    afterEach(() => {
      enzymeWrapper = undefined
      params = undefined
    })

    it('should strip spaces, commas, and periods from the ends of title field', () => {
      expect(enzymeWrapper.findWhere(el => el.text() === 'Garbage title!').exists()).toBe(true)
    })

    it('should render author', () => {
      expect(enzymeWrapper.findWhere(el => el.text().includes('You made this')).exists()).toBe(true)
    })

    it('should render call number', () => {
      expect(enzymeWrapper.findWhere(el => el.text() === 'ABCD').exists()).toBe(true)
    })

    it('should render collection display name', () => {
      expect(enzymeWrapper.findWhere(el => el.text() === 'I collect things').exists()).toBe(true)
    })
  })

  describe('without data', () => {
    beforeEach(() => {
      params = {
        sublibrary: 'UNKNOWN',
        collection: '123',
      }
      enzymeWrapper = setup(params)
    })

    it('should not render anything', () => {
      expect(enzymeWrapper.isEmptyRender()).toBe(true)
    })
  })
})

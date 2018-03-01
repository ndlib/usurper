import React from 'react'
import { shallow } from 'enzyme'
import Alphabet from '../../../../components/DatabaseList/Alphabet/index.js'

let setup = () => {
  return shallow(<Alphabet />)
}

describe('components/DatabaseList/Alphabet/index.js', () => {
  describe('Alphabet', () => {
    it('renders an aside', () => {
      let enzymeWrapper = setup()
      expect(enzymeWrapper.find('aside').exists()).toBe(true)
    })
  })
})

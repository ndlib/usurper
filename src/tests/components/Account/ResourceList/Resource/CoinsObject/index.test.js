import React from 'react'
import { shallow } from 'enzyme'

import CoinsObject from 'components/Account/ResourceList/Resource/CoinsObject'

let enzymeWrapper
let props

const setup = (props) => {
  return shallow(<CoinsObject {...props} />)
}

describe('components/Account/ResourceList/Resource/CoinsObject', () => {
  afterEach(() => {
    enzymeWrapper = undefined
  })

  describe('documentType = BOOK', () => {
    it('should render a span with the class Z3988 and the book format', () => {
      enzymeWrapper = setup({ documentType: 'BOOK' })
      const found = enzymeWrapper.findWhere((el) => el.type() === 'span' && el.props().className === 'Z3988')
      expect(found.exists()).toBe(true)
      expect(found.props().title).toContain('rft_val_fmt=' + encodeURIComponent('info:ofi/fmt:kev:mtx:book'))
    })
  })

  describe('documentType = JOUR', () => {
    it('should render a span with the class Z3988 and the journal format', () => {
      enzymeWrapper = setup({ documentType: 'JOUR' })
      const found = enzymeWrapper.findWhere((el) => el.type() === 'span' && el.props().className === 'Z3988')
      expect(found.exists()).toBe(true)
      expect(found.props().title).toContain('rft_val_fmt=' + encodeURIComponent('info:ofi/fmt:kev:mtx:journal'))
    })
  })
})

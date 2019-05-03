import React from 'react'
import { shallow } from 'enzyme'

import ExportButton from 'components/Account/ResourceList/ListActions/ExportButton'

let enzymeWrapper

const setup = (props) => {
  return shallow(<ExportButton {...props} />)
}

describe('components/Account/ResourceList/ListActions/ExportButton/index.js', () => {
  const props = {
    items: [
      {
        title: 'item 1',
      },
      {
        title: 'item 2',
      },
    ],
  }

  beforeEach(() => {
    enzymeWrapper = setup(props)
  })

  afterEach(() => {
    enzymeWrapper = undefined
  })

  it('should expand dropdown when clicked', () => {
    const dropdown = enzymeWrapper.find('#exportDropdown')
    expect(dropdown.exists()).toBe(true)
    expect(dropdown.props()['aria-expanded']).toBe(false)

    enzymeWrapper.simulate('click')
    expect(enzymeWrapper.find('#exportDropdown').props()['aria-expanded']).toBe(true)

    // Should close when losing focus
    enzymeWrapper.instance().onBlur({ relatedTarget: null })
    expect(enzymeWrapper.find('#exportDropdown').props()['aria-expanded']).toBe(false)
  })

  it('should allow exporting to RIS format', () => {
    // Unimplemented function in jsdom. Mock it so that it doesn't throw and we can test that it was called.
    Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn(), configurable: true })

    const found = enzymeWrapper.findWhere((el) => el.type() === 'li' && el.text() === 'Export to RIS')
    expect(found.exists()).toBe(true)
    found.simulate('click')
    // Test that clicking the button created a blob which we then attempted to create a URL for
    // This is probably as close as we'll get to testing if a downloadable file stream was created.
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
  })

  it('should allow exporting to CSV format', () => {
    // Unimplemented function in jsdom. Mock it so that it doesn't throw and we can test that it was called.
    Object.defineProperty(window.URL, 'createObjectURL', { value: jest.fn(), configurable: true })

    const found = enzymeWrapper.findWhere((el) => el.type() === 'li' && el.text() === 'Export to CSV')
    expect(found.exists()).toBe(true)
    found.simulate('click')
    // Test that clicking the button created a blob which we then attempted to create a URL for
    // This is probably as close as we'll get to testing if a downloadable file stream was created.
    expect(window.URL.createObjectURL).toHaveBeenCalledWith(expect.any(Blob))
  })
})

import { mapStateToProps } from '../../../components/Image'

let cfImage = {
  cfImage: {
    fields: {
      title: 'foo',
      file: {
        url: 'bar'
      }
    }
  }
}

describe('components/Image/index.js', () => {
  describe('with src', () => {
    it('should return valid src', () => {
      expect(mapStateToProps(null, { src: 'foo' })).toHaveProperty('src', 'foo')
    })
  })

  describe('without src and with defaultImage', () => {
    it('should return default src', () => {
      expect(mapStateToProps(null, { defaultImage: 'foo' })).toHaveProperty('src', 'foo')
    })
  })

  describe('without src and with cfImage', () => {
    it('should return cfImage src', () => {
      expect(mapStateToProps(null, cfImage)).toHaveProperty('src', 'bar')
    })
  })

  describe('with alt', () => {
    it('should return valid alt', () => {
      expect(mapStateToProps(null, { alt: 'foo' })).toHaveProperty('alt', 'foo')
    })
  })

  describe('with className', () => {
    it('should return valid className', () => {
      expect(mapStateToProps(null, { className: 'foo' })).toHaveProperty('className', 'foo')
    })
  })
})

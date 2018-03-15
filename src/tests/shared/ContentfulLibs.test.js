import { getLinkObject } from '../../shared/ContentfulLibs'

describe('getLinkObject', () => {
  const testUrl = 'testUrl'

  describe('urls field', () => {
    describe('single url', () => {
      const fields = {
        title: 'fieldTitle',
        urls: [ { title: 'title', url: testUrl } ],
      }

      it('Should have a main url', () => {
        expect(getLinkObject(fields, 0)).toHaveProperty('heading.url', testUrl)
      })

      it('Should return with all links', () => {
        expect(getLinkObject(fields, 0)).toHaveProperty('links')
      })

      it('Should return empty conditional links', () => {
        expect(getLinkObject(fields, 0)).toHaveProperty('conditionalLinks', [])
      })
    })

    describe('multiple urls', () => {
      const fields = {
        title: 'fieldTitle',
        urls: [ { title: 'first', url: testUrl }, { title: 'second', url: testUrl } ],
      }

      it('Should not have a main url', () => {
        expect(getLinkObject(fields, 0)).toHaveProperty('heading.url', '')
      })

      it('Should return with all links', () => {
        expect(getLinkObject(fields, 0)).toHaveProperty('links')
      })

      it('Should return with conditional links', () => {
        const ret = getLinkObject(fields, 0)
        expect(ret).toHaveProperty('conditionalLinks')
        expect(ret.conditionalLinks.length).toBe(fields.urls.length)
      })
    })
  })

  describe('url field', () => {
    let fields = {
      title: 'fieldTitle',
      url: testUrl,
    }

    it('Should have a main url', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('heading.url', testUrl)
    })

    it('Should return with all links', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('links', [ { title: fields.title, url: fields.url, keyId: '0link0' } ])
    })

    it('Should return empty conditional links', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('conditionalLinks', [])
    })
  })

  describe('purl field', () => {
    let fields = {
      title: 'fieldTitle',
      purl: testUrl,
    }

    it('Should have a main url', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('heading.url', testUrl)
    })

    it('Should return with all links', () => {
      expect(getLinkObject(fields, 0))
        .toHaveProperty('links', [ { title: fields.title, url: fields.purl, keyId: '0link0' } ])
    })

    it('Should return empty conditional links', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('conditionalLinks', [])
    })
  })

  describe('slug field', () => {
    let fields = {
      title: 'fieldTitle',
      slug: testUrl,
    }

    it('Should have a main url', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('heading.url', '/' + testUrl)
    })

    it('Should return with all links', () => {
      expect(getLinkObject(fields, 0))
        .toHaveProperty('links', [ { title: fields.title, url: '/' + fields.slug, keyId: '0link0' } ])
    })

    it('Should return empty conditional links', () => {
      expect(getLinkObject(fields, 0)).toHaveProperty('conditionalLinks', [])
    })
  })
})

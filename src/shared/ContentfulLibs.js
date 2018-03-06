
// Contentful field values can be duplicated per locale. This flattens the object
// recursively for the selected locale. Ex:
//   const fields = { title: { 'en-US': 'English title' } }
//   removeLocale(fields, 'en-US')
//   console.log(fields)
// Prints:
//   { title: 'English title' }
export const flattenLocale = (fields, locale) => {
  Object.keys(fields).forEach(fieldKey => {
    if (!fields[fieldKey]) {
      return
    }
    let localizedField = fields[fieldKey][locale]
    if (localizedField !== null && localizedField !== undefined) {
      fields[fieldKey] = localizedField
    }
    if (fields[fieldKey].fields) {
      flattenLocale(fields[fieldKey].fields, locale)
    }
  })
}

// create an unifrom object to make a single mapping function easy in presenters
export const getLinkObject = (fields, sysId) => {
  // determine if heading should be a link
  let shouldHaveMain = !fields.urls || fields.urls.length === 1
  let mainUrl = (shouldHaveMain && fields.urls) ? fields.urls[0].url : ''

  // get correct field for main link
  if (!mainUrl && shouldHaveMain) {
    if (fields.url) {
      mainUrl = fields.url
    } else if (fields.purl) {
      mainUrl = fields.purl
    } else if (fields.slug) {
      mainUrl = '/' + fields.slug
    }
  }

  // get description field
  let desc = fields.shortDescription ? fields.shortDescription : fields.description

  // make list of links, either map all resource "urls" or a single link from the above mainurl
  let links
  if (fields.urls) {
    links = fields.urls.map((data, index) => {
      data.keyId = sysId + 'link' + index
      data.title = data.title ? data.title : fields.title
      return data
    })
  } else {
    links = [ { title: fields.title, url: mainUrl, keyId: sysId + 'link' + 0 } ]
  }

  // heading is the item title, url, and description
  // links are all possible links
  // conditionalLinks is all links if there is no main link (for instance, resources with more than 1 url)
  return {
    heading: { title: fields.title, url: mainUrl, description: desc },
    links: links,
    conditionalLinks: mainUrl ? [] : links,
  }
}

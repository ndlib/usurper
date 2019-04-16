
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
    const localizedField = fields[fieldKey][locale]
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
  // We need to determine if the main heading (entry title) should be a link
  //  The resource type has links in the "urls" json field. If there is only one, make it the heading link
  //  If we're not handling a resource type the heading should be linked with its appropriate url field (below)
  const shouldHaveMain = !fields.urls || fields.urls.length === 1
  let mainUrl = (shouldHaveMain && fields.urls) ? fields.urls[0].url : ''

  // If we're not handling a resoruce type, get the link to use for the heading
  if (!mainUrl && shouldHaveMain) {
    mainUrl = fields.url || fields.purl || ('/' + fields.slug)
  }

  // get appropriate description field for this content type
  const desc = fields.shortDescription ? fields.shortDescription : fields.description

  // Make a list of all links for this object, for the resource type it's the entire "urls" field
  //  otherwise, we've already got the only link for the object in the mainUrl var
  //  we also want to enrich the data with a title if there is none, and a keyId for use in displays <li key={keyId}>
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

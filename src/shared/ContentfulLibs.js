
// Contentful field values can be duplicated per locale. This flattens the object
// recursively for the selected locale. Ex:
//   const fields = { title: { 'en-US': 'English title' } }
//   removeLocale(fields, 'en-US')
//   console.log(fields)
// Prints:
//   { title: 'English title' }
export const flattenLocale = (fields, locale) => {
  Object.keys(fields).forEach(fieldKey => {
    let localizedField = fields[fieldKey][locale]
    if (localizedField) {
      fields[fieldKey] = localizedField
    }
    if (fields[fieldKey].fields) {
      flattenLocale(fields[fieldKey].fields, locale)
    }
  })
}

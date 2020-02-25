// This object needs to be added to the subjects list in the Databases page. However, since it is not a true subject,
// we don't want to appear on other pages that reference subjects; for this reason, it does not exist within Contentful.
// Still, we need to represent the data in a way similar to the Contentful model so the UI can handle it correctly.
export const multidisciplinarySubject = {
  sys: { id: 'multidisciplinary' },
  fields: { id: 'multidisciplinary', title: 'Multidisciplinary' },
  linkText: '\u2605 Multidisciplinary',
}

export const shortMonth = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

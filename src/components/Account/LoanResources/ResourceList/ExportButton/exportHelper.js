import moment from 'moment'

const FIELDS = {
  'documentType': { label: 'Type', tag: 'TY' }, // NOTE: This MUST be the first field for RIS format to be valid
  'id': { tag: 'ID' }, // NOTE: Label intentionally excluded so it will not appear on CSV
  'loanDate': { label: 'Checked Out' },
  'dueDate': { label: 'Due Date' },
  'returnDate': { label: 'Return Date' },
  'title': { label: 'Title', tag: 'TI' },
  'author': { label: 'Author', tag: 'AU' },
  'volume': { label: 'Volume', tag: 'VL' },
  'callNumber': { label: 'Call Number', tag: 'CN' },
  'publisher': { label: 'Publisher', tag: 'PB' },
  'publicationDate': { label: 'Publication Date', tag: 'PY' },
  'issn': { label: 'ISSN', tag: 'SN' },
  'isbn': { label: 'ISBN', tag: 'SN' },
  '_END_OF_RECORD_': { tag: 'ER' }, // NOTE: This MUST be the last field for RIS format to be valid
}

// All uppercase is enforced to keep mapping simpler
const DOC_TYPE = {
  'ARTICLE': 'JOUR', // ILLiad
  'AUDIO': 'SOUND',
  'AUDRC': 'SOUND',
  'BOOK': 'BOOK',
  'DVD': 'ADVS',
  'DVDPL': 'ADVS',
  'FILM': 'VIDEO', // Could also be ADVS or MPCT, depending
  'ISSUE': 'JOUR', // Could be a lot of things, but journal seemed most common
  'SCORE': 'MUSIC',
  'VIDEO': 'VIDEO',
}

const getHeader = (format) => {
  if (format === 'CSV') {
    const headerLabels = []
    for (const key in FIELDS) {
      if (FIELDS[key].label) {
        headerLabels.push(FIELDS[key].label)
      }
    }
    // In case a field name has a comma, enclose in quotes
    return `"${headerLabels.join('","')}"\r\n`
  } else {
    return ''
  }
}

const formatCSVString = (item) => {
  let formattedData = ''
  const fieldKeys = Object.keys(FIELDS)
  for (let i = 0; i < fieldKeys.length; i++) {
    const key = fieldKeys[i]
    // Always enclose values inside quotes because it's easier that way
    formattedData += '"'
    if (item.hasOwnProperty(key) && item[key] !== null) {
      formattedData += String(item[key]).replace(/"/g, '""') // Escape quotes (") with two quote characters ("")
    }
    formattedData += (i < fieldKeys.length - 1) ? '",' : '"\r\n'
  }
  return formattedData
}

const formatRISString = (item) => {
  let formattedData = ''
  const fieldKeys = Object.keys(FIELDS)
  for (let i = 0; i < fieldKeys.length; i++) {
    const key = fieldKeys[i]
    const tag = FIELDS[key].tag
    if (tag) {
      let value = item[key] ? String(item[key]).trim() : ''
      // Apply special rules about restricted characters and limits based on field type
      if (['A1', 'A2', 'A3', 'A4', 'AU', 'KW', 'J1', 'J2', 'JA', 'JF', 'JO'].includes(FIELDS[key].tag)) {
        value.replace(/\*/g, '') // Remove all asterisks
      }
      // Map document types from aleph into types defined by the RIS specification
      if (key === 'documentType') {
        // By default, if the doc type is not mapped, use "GEN" (generic)
        value = value.toUpperCase()
        value = DOC_TYPE.hasOwnProperty(value) ? DOC_TYPE[value] : 'GEN'
      }
      // Only include fields that have a value, except header and footer which are required
      if (value || ['TY', 'ER'].includes(tag)) {
        // Need to use '\u000D\u000A' for carriage return and new line.
        formattedData += `${tag} - ${value}\u000D\u000A`
      }
    }
  }
  return formattedData
}

const exportHelper = (format, items) => {
  let formattedOutput = ''
  formattedOutput += getHeader(format)

  switch (format) {
    case 'CSV':
      items.forEach((item) => {
        formattedOutput += formatCSVString(item)
      })
      break
    case 'RIS':
      items.forEach((item) => {
        formattedOutput += formatRISString(item)
      })
      break
    default:
      throw new Error('undefined export format')
  }

  // Create a file blob, write data to it, and trigger a download
  const element = document.createElement('a')
  const file = new Blob([formattedOutput], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `Checkout History ${moment().format('YYYY-MM-DD')}.${format.toLowerCase()}`
  element.click()
}
export default exportHelper

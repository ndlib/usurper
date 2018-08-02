import moment from 'moment'

const formatCSVString = (data) => {
  return 'test,data,csv\r\n1,2,3'
}
const formatRISString = (data) => {
  return 'aa  --  test\u000D\u000Abb  --  data\u000D\u000A'
}

const exportHelper = (format, data) => {
  let formattedOutput = ''
  if (format === 'CSV') {
    formattedOutput = formatCSVString(data)
  } else if (format === 'RIS') {
    formattedOutput = formatRISString(data)
  } else {
    throw new error('undefined export format')
  }

  let element = document.createElement('a')
  let file = new Blob([formattedOutput], { type: 'text/plain' })
  element.href = URL.createObjectURL(file)
  element.download = `Circulation History ${moment().format('YYYY-MM-DD')}.${format.toLowerCase()}`
  element.click()
}
export default exportHelper

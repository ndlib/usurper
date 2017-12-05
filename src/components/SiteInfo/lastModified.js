// Get last modified date from the header of index.html
const request = (req) => {
  var xhr = new XMLHttpRequest()
  xhr.open('HEAD', `${window.location.origin}/index.html`, true)
  xhr.onload = () => {
    if (xhr.status === 200) {
      req(xhr.getResponseHeader('Last-Modified'))
    }
  }
  xhr.send(null)
}
const lastModified = new Promise(request)
export default lastModified

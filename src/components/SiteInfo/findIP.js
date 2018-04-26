// WebRTC promise function to get client ip address
const request = (req) => {
  const peerConnection = new (
    window.RTCPeerConnection ||
    window.mozRTCPeerConnection ||
    window.webkitRTCPeerConnection)(
    { iceServers:[] }
  )
  let callBack = () => {}
  peerConnection.createDataChannel('')
  peerConnection.createOffer(peerConnection.setLocalDescription.bind(peerConnection), callBack)
  peerConnection.onicecandidate = connection => {
    try {
      const regEx = new RegExp(/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/g)
      if (!connection || !connection.candidate || !connection.candidate.candidate) return
      connection.candidate.candidate.match(regEx).forEach(req)
    } catch (error) {
      console.log(error)
    }
  }
}
const findIP = new Promise(request)

export default findIP

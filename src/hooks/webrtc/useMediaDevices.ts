interface MediaSetupProps {
  peerConnection: RTCPeerConnection
  videoRef: React.MutableRefObject<(HTMLVideoElement | null)[]>
  camNum: string
}

export const setupMediaDevices = async ({
  peerConnection,
  videoRef,
}: MediaSetupProps) => {
  const devices = await navigator.mediaDevices.enumerateDevices()
  const videoDevices = devices.filter((d) => d.kind === 'videoinput')
  const macCam = videoDevices.find((d) => d.label.includes('MacBook'))
  const obsCam = videoDevices.find((d) => d.label === 'OBS Virtual Camera')

  if (macCam) {
    const macStream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: macCam.deviceId } },
    })
    if (videoRef.current[0]) {
      videoRef.current[0].srcObject = macStream
    }
    macStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, macStream)
    })
  }

  if (obsCam) {
    const obsStream = await navigator.mediaDevices.getUserMedia({
      video: { deviceId: { exact: obsCam.deviceId } },
    })
    if (videoRef.current[1]) {
      videoRef.current[1].srcObject = obsStream
    }
  }
}

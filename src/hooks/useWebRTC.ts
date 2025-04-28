import { useEffect, useRef, useState } from 'react'

export const useWebRTC = (streamName: string) => {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const pc = useRef<RTCPeerConnection | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const startWebRTC = async () => {
      try {
        console.log(`[WebRTC] 시작: ${streamName}`)

        const serverUrl = process.env.NEXT_PUBLIC_STREAM_SERVER_URL
        const url = `${serverUrl}/stream/prod/channel/${streamName}/webrtc`

        const iceServerUrl = process.env.NEXT_PUBLIC_ICE_SERVER_URL
        if (!iceServerUrl) {
          throw new Error('ICE 서버 URL이 설정되지 않았습니다.')
        }

        pc.current = new RTCPeerConnection({
          iceServers: [{ urls: iceServerUrl }],
        })

        pc.current.oniceconnectionstatechange = () => {
          console.log(
            `[WebRTC] ICE Connection State (${streamName}): ${pc.current?.iceConnectionState}`
          )
        }
        pc.current.onconnectionstatechange = () => {
          console.log(
            `[WebRTC] Peer Connection State (${streamName}): ${pc.current?.connectionState}`
          )
        }
        pc.current.onsignalingstatechange = () => {
          console.log(
            `[WebRTC] Signaling State Changed (${streamName}): ${pc.current?.signalingState}`
          )
        }

        pc.current.ontrack = (event) => {
          console.log(`[WebRTC] track 수신 (${streamName})`, event.streams)

          const stream = event.streams[0]
          if (videoRef.current && stream) {
            videoRef.current.srcObject = stream
            videoRef.current.onloadedmetadata = () => {
              videoRef.current?.play().catch((err) => {
                console.error(
                  `[WebRTC] 비디오 자동재생 실패 (${streamName}):`,
                  err
                )
              })
            }
          }
        }

        pc.current.addTransceiver('video', { direction: 'sendrecv' })

        pc.current.onnegotiationneeded = async () => {
          console.log(`[WebRTC] onnegotiationneeded 발생 (${streamName})`)

          if (!pc.current) {
            console.error(`[WebRTC] PeerConnection is null (${streamName})`)
            return
          }
          const offer = await pc.current.createOffer()
          await pc.current.setLocalDescription(offer)

          await new Promise<void>((resolve) => {
            if (pc.current?.iceGatheringState === 'complete') {
              resolve()
            } else {
              const checkState = () => {
                if (pc.current?.iceGatheringState === 'complete') {
                  pc.current?.removeEventListener(
                    'icegatheringstatechange',
                    checkState
                  )
                  resolve()
                }
              }
              pc.current?.addEventListener(
                'icegatheringstatechange',
                checkState
              )
            }
          })

          if (!pc.current?.localDescription) {
            console.error(`[WebRTC] localDescription 설정 실패 (${streamName})`)
            return
          }

          console.log(`[WebRTC] 서버에 offer 전송 (${streamName})`)

          const response = await fetch(url, {
            method: 'POST',
            body: new URLSearchParams({
              data: btoa(pc.current.localDescription.sdp),
            }),
          })

          const responseData = await response.text()

          try {
            const remoteDesc = new RTCSessionDescription({
              type: 'answer',
              sdp: atob(responseData),
            })
            await pc.current.setRemoteDescription(remoteDesc)
            console.log(`[WebRTC] answer 설정 완료 (${streamName})`)
          } catch (error) {
            console.error(`[WebRTC] answer 설정 중 오류 (${streamName})`, error)
          }
        }

        const dataChannel = pc.current.createDataChannel('rtsptowebSendChannel')

        dataChannel.onopen = () => {
          console.log(`[WebRTC] DataChannel opened (${streamName})`)
          dataChannel.send('ping')
        }
        dataChannel.onclose = () => {
          console.log(`[WebRTC] DataChannel closed (${streamName})`)
          startWebRTC()
        }
        dataChannel.onmessage = (event) => {
          console.log(
            `[WebRTC] DataChannel message (${streamName}):`,
            event.data
          )
        }
        dataChannel.onerror = (error) => {
          console.error(`[WebRTC] DataChannel Error (${streamName}):`, error)
        }
      } catch (error) {
        console.error(`[WebRTC] 연결 실패 (${streamName})`, error)
      }
    }

    startWebRTC()

    return () => {
      console.log(`[WebRTC] 정리중 (${streamName})`)
      pc.current?.close()
      pc.current = null
      setIsConnected(false)
    }
  }, [streamName])

  return { videoRef, isConnected }
}

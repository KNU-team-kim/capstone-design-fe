import { useEffect, useRef, useState } from 'react'

import { Client } from '@stomp/stompjs'

import { setupICEHandlers } from './webrtc/useICEHandler'
import { setupMediaDevices } from './webrtc/useMediaDevices'
import { useSignalingHandler } from './webrtc/useSignalingHandler'

export const useWebRTC = (camNum: string = '1') => {
  const [isConnected, setIsConnected] = useState(false)
  const [connectionState, setConnectionState] = useState<string>('new')
  const videoRef = useRef<(HTMLVideoElement | null)[]>([])
  const peerConnection = useRef<RTCPeerConnection | null>(null)
  const stompClient = useRef<Client | null>(null)
  const gatheredCandidates = useRef<RTCIceCandidate[]>([])
  const pendingIceCandidates = useRef<RTCIceCandidate[]>([])
  const hasRemoteDescription = useRef<boolean>(false)

  useEffect(() => {
    const init = async () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      })

      stompClient.current = await useSignalingHandler({
        peerConnection,
        camNum,
        pendingIceCandidates,
        hasRemoteDescription,
      })

      setupICEHandlers({
        peerConnection: peerConnection.current,
        stompClient: stompClient.current,
        camNum,
        gatheredCandidates: gatheredCandidates.current,
      })

      await setupMediaDevices({
        peerConnection: peerConnection.current,
        videoRef,
        camNum,
      })

      peerConnection.current.oniceconnectionstatechange = () => {
        const state = peerConnection.current?.iceConnectionState || 'unknown'
        setConnectionState(state)
        setIsConnected(state === 'connected' || state === 'completed')
      }
    }

    init()

    return () => {
      peerConnection.current
        ?.getSenders()
        .forEach((sender) => sender.track?.stop())
      videoRef.current.forEach((videoEl) => {
        if (videoEl) videoEl.srcObject = null
      })
      peerConnection.current?.close()
      stompClient.current?.deactivate()
      peerConnection.current = null
      stompClient.current = null
      gatheredCandidates.current = []
      pendingIceCandidates.current = []
      hasRemoteDescription.current = false
      setIsConnected(false)
    }
  }, [camNum])

  return { videoRef, isConnected, connectionState }
}

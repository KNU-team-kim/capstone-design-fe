import { Client } from '@stomp/stompjs'

interface ICEHandlerProps {
  peerConnection: RTCPeerConnection
  stompClient: Client
  camNum: string
  gatheredCandidates: RTCIceCandidate[]
}

export const setupICEHandlers = ({
  peerConnection,
  stompClient,
  camNum,
  gatheredCandidates,
}: ICEHandlerProps) => {
  peerConnection.onicecandidate = (event) => {
    if (event.candidate) {
      gatheredCandidates.push(event.candidate)
    }
  }

  peerConnection.onicegatheringstatechange = () => {
    if (peerConnection.iceGatheringState === 'complete') {
      console.log('ICE 수집 완료. 후보 전송 시작')
      for (let i = 0; i < gatheredCandidates.length; i++) {
        const candidate = gatheredCandidates[i]
        console.log('[ICE] 후보 전송 중:', candidate.candidate)
        if (stompClient?.connected) {
          stompClient.publish({
            destination: '/app/iceCandidate/${camNum}',
            body: JSON.stringify({
              type: 'ice-candidate',
              candidate: candidate.toJSON(),
            }),
          })
        }
      }
      console.log('[ICE] 모든 ICE 후보 전송 완료')
      gatheredCandidates.length = 0
    }
  }
}

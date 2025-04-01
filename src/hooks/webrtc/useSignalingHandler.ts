import { Client } from '@stomp/stompjs'

import { SignalingMessage } from '@/types/signaling'
import { createStompClient, sendStompMessage } from '@/utils/signaling'

interface SignalingHandlerProps {
  peerConnection: React.MutableRefObject<RTCPeerConnection | null>
  camNum: string
  pendingIceCandidates: React.MutableRefObject<RTCIceCandidate[]>
  hasRemoteDescription: React.MutableRefObject<boolean>
}

export const useSignalingHandler = async ({
  peerConnection,
  camNum,
  pendingIceCandidates,
  hasRemoteDescription,
}: SignalingHandlerProps): Promise<Client> => {
  const handleSignalingMessage = async (message: SignalingMessage) => {
    if (!peerConnection.current) return

    try {
      switch (message.type) {
        case 'offer': {
          console.log('[Signaling] OFFER 수신 → remoteDescription 설정')

          await peerConnection.current.setRemoteDescription(
            new RTCSessionDescription(message.offer)
          )
          hasRemoteDescription.current = true

          const answer = await peerConnection.current.createAnswer()
          await peerConnection.current.setLocalDescription(answer)
          console.log('[Signaling] ANSWER 생성 및 localDescription 설정 완료')

          await waitForIceGatheringComplete(peerConnection.current)

          if (peerConnection.current.localDescription) {
            console.log('[Signaling] ANSWER 전송 시작')
            sendStompMessage(stompClient, '/app/answer/${camNum}', {
              type: 'answer',
              answer: peerConnection.current.localDescription,
            })
            console.log('[Signaling] ANSWER 전송 완료')
          }

          console.log(
            '[Signaling] 대기 중 ICE 후보 ${pendingIceCandidates.current.length}개 추가'
          )
          const candidates = pendingIceCandidates.current
          for (let i = 0; i < candidates.length; i++) {
            const candidate = candidates[i]
            await peerConnection.current.addIceCandidate(candidate)
          }
          pendingIceCandidates.current = []
          break
        }

        case 'ice-candidate': {
          if (message.candidate) {
            const iceCandidate = new RTCIceCandidate(message.candidate)
            if (hasRemoteDescription.current) {
              console.log('[Signaling] ICE 후보 바로 추가')
              await peerConnection.current.addIceCandidate(iceCandidate)
            } else {
              console.log(
                '[Signaling] ICE 후보 대기 큐에 추가 (remoteDescription 미설정)'
              )
              pendingIceCandidates.current.push(iceCandidate)
            }
          }
          break
        }
      }
    } catch (err) {
      console.error('시그널링 처리 오류:', err)
    }
  }

  const stompClient = createStompClient(handleSignalingMessage, camNum)
  return stompClient
}

async function waitForIceGatheringComplete(
  pc: RTCPeerConnection
): Promise<void> {
  if (pc.iceGatheringState === 'complete') return
  return new Promise((resolve) => {
    const checkState = () => {
      if (pc.iceGatheringState === 'complete') {
        pc.removeEventListener('icegatheringstatechange', checkState)
        resolve()
      }
    }
    pc.addEventListener('icegatheringstatechange', checkState)
  })
}

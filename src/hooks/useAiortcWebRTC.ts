'use client'

import { useEffect, useRef, useState } from 'react'

import { Client } from '@stomp/stompjs'
import { v4 as uuidv4 } from 'uuid'

const SIGNALING_URL = process.env.NEXT_PUBLIC_SIGNALING_URL
if (!SIGNALING_URL) {
  throw new Error('SIGNALING_URL 환경 변수가 설정되지 않았습니다.')
}

const cameraMap = {
  0: 'FRONT',
  1: 'BACK',
  2: 'LEFT',
  3: 'RIGHT',
} as const

export const useAiortcWebRTC = (camNum: number) => {
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(
    null
  )
  const clientId = useRef<string>(uuidv4())
  const stompClient = useRef<Client | null>(null)
  const pc = useRef<RTCPeerConnection | null>(null)
  const iceCandidates = useRef<RTCIceCandidateInit[]>([])
  const offerCreated = useRef<boolean>(false)
  const iceComplete = useRef<boolean>(false)
  const hasRemoteDescription = useRef<boolean>(false)
  const isConnecting = useRef<boolean>(false)

  useEffect(() => {
    if (!videoElement || isConnecting.current) return
    isConnecting.current = true

    const cleanup = () => {
      console.log(`[WebRTC] 클린업 camNum: ${camNum}`)
      if (pc.current) {
        pc.current.getReceivers().forEach((r) => r.track?.stop())
        pc.current.close()
        pc.current = null
      }
      if (stompClient.current && stompClient.current.connected) {
        stompClient.current.deactivate()
        stompClient.current = null
      }
      if (videoElement) videoElement.srcObject = null
      isConnecting.current = false
    }

    cleanup()

    stompClient.current = new Client({
      brokerURL: SIGNALING_URL,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      onConnect: async () => {
        console.log(`[WebRTC] STOMP 연결 성공 - camNum: ${camNum}`)
        const cameraId = cameraMap[camNum]

        stompClient.current?.subscribe(
          `/topic/answer/${clientId.current}/${cameraId}`,
          async (msg) => {
            const answer = JSON.parse(msg.body)
            const answerBody = answer.body || answer

            if (
              hasRemoteDescription.current ||
              !pc.current ||
              pc.current.signalingState !== 'have-local-offer'
            ) {
              console.warn(
                `[WebRTC] setRemoteDescription 생략 - camNum: ${camNum}`
              )
              return
            }

            try {
              const remoteDesc = new RTCSessionDescription({
                sdp: answerBody.sdp,
                type: answerBody.type,
              })
              await pc.current.setRemoteDescription(remoteDesc)
              hasRemoteDescription.current = true
              console.log(`[WebRTC] Answer 설정 완료 - camNum: ${camNum}`)

              if (Array.isArray(answerBody.iceCandidates)) {
                for (const c of answerBody.iceCandidates) {
                  try {
                    await pc.current.addIceCandidate(new RTCIceCandidate(c))
                  } catch (err) {
                    console.warn(
                      `[WebRTC] ICE 후보 추가 오류 - camNum: ${camNum}`,
                      err
                    )
                  }
                }
              }
            } catch (err) {
              console.error(
                `[WebRTC] Answer 처리 오류 - camNum: ${camNum}`,
                err
              )
            }
          }
        )

        const iceServerUrl = process.env.NEXT_PUBLIC_ICE_SERVER_URL
        const TURN_USERNAME = process.env.NEXT_PUBLIC_TURN_USERNAME
        const TURN_PASSWORD = process.env.NEXT_PUBLIC_TURN_PASSWORD

        const iceServers: RTCIceServer[] = []
        if (iceServerUrl?.startsWith('turn')) {
          if (!TURN_USERNAME || !TURN_PASSWORD) {
            console.error(
              `[WebRTC] TURN 서버 인증 정보 없음 - camNum: ${camNum}`
            )
            return
          }
          iceServers.push({
            urls: iceServerUrl,
            username: TURN_USERNAME,
            credential: TURN_PASSWORD,
          })
        } else if (iceServerUrl) {
          iceServers.push({ urls: iceServerUrl })
        } else {
          console.error(
            `[WebRTC] ICE 서버 URL이 설정되지 않았습니다 - camNum: ${camNum}`
          )
          return
        }

        pc.current = new RTCPeerConnection({ iceServers })

        pc.current.ontrack = (e) => {
          console.log(`[WebRTC] ontrack camNum: ${camNum}`, e.streams)
          if (videoElement && videoElement.srcObject !== e.streams[0]) {
            videoElement.srcObject = e.streams[0]
            videoElement.onloadedmetadata = () => {
              videoElement.play().catch((err) => {
                console.warn(
                  `[WebRTC] video.play() 실패 - camNum: ${camNum}`,
                  err
                )
              })
            }
          }
        }

        pc.current.onicecandidate = (e) => {
          if (e.candidate) {
            iceCandidates.current.push(e.candidate.toJSON())
            console.log(`[WebRTC] ICE 후보 수집 - camNum: ${camNum}`)
          } else {
            iceComplete.current = true
            console.log(`[WebRTC] ICE 후보 수집 완료 - camNum: ${camNum}`)
            if (offerCreated.current) {
              sendOfferAndCandidates()
            }
          }
        }

        pc.current.onicegatheringstatechange = () => {
          console.log(
            `[WebRTC] ICE 상태 변경 camNum: ${camNum} - ${pc.current?.iceGatheringState}`
          )
        }

        pc.current.onconnectionstatechange = () => {
          const state = pc.current?.connectionState
          console.log(`[WebRTC] 연결 상태 camNum: ${camNum} - ${state}`)
          if (
            state === 'disconnected' ||
            state === 'failed' ||
            state === 'closed'
          ) {
            if (videoElement) videoElement.srcObject = null
            console.warn(`[WebRTC] 연결 종료 - camNum: ${camNum}`)
          }
        }

        pc.current.addTransceiver('video', { direction: 'recvonly' })
        const offer = await pc.current.createOffer()
        await pc.current.setLocalDescription(offer)
        offerCreated.current = true
        console.log(`[WebRTC] Offer 생성 완료 - camNum: ${camNum}`)
        if (iceComplete.current) {
          sendOfferAndCandidates()
        }
      },
      onWebSocketClose: () => {
        console.warn(`[STOMP] 연결 종료됨 - camNum: ${camNum}`)
        stompClient.current?.deactivate()
        stompClient.current = null
      },
      onStompError: (frame) => {
        console.error(
          `[STOMP] 에러 camNum: ${camNum}`,
          frame.headers['message'],
          frame.body
        )
      },
    })

    const sendOfferAndCandidates = () => {
      const cameraId = cameraMap[camNum]
      const offer = pc.current?.localDescription
      if (!offer || !stompClient.current?.connected) return

      const body = {
        sdp: offer.sdp,
        type: offer.type,
        iceCandidates: iceCandidates.current,
      }
      const offerData = {
        client_id: clientId.current,
        direction: cameraId,
        body,
      }

      stompClient.current.publish({
        destination: '/app/offer',
        body: JSON.stringify(offerData),
      })
      console.log(`[WebRTC] Offer + ICE 후보 전송 완료 - camNum: ${camNum}`)
    }

    stompClient.current.activate()

    return cleanup
  }, [videoElement, camNum])

  return { setVideoElement }
}

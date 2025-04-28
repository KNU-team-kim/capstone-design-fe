import { Client, IFrame, IMessage } from '@stomp/stompjs'

import { SignalingMessage } from '@/types/signaling'

const signalingServerUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL

if (!signalingServerUrl) {
  throw new Error('NEXT_PUBLIC_SIGNALING_SERVER_URL is not defined')
}

const subscribeToTopic = (
  client: Client,
  topic: string,
  handler: (message: SignalingMessage) => void,
  logLabel: string
) => {
  client.subscribe(topic, (message: IMessage) => {
    try {
      console.log(`[STOMP] ${logLabel} 수신`, message)
      handler(JSON.parse(message.body))
    } catch (error) {
      console.error(`[STOMP] ${logLabel} 처리 중 오류:`, error)
    }
  })
}

export const createStompClient = (
  onMessage: (message: SignalingMessage) => void,
  camNum: string
): Client => {
  const client = new Client({
    brokerURL: signalingServerUrl,
    reconnectDelay: 3000,
    onConnect: () => {
      console.log('🔌 STOMP 연결 성공')
      subscribeToTopic(client, `/topic/answer/${camNum}`, onMessage, 'ANSWER')
      subscribeToTopic(
        client,
        `/topic/iceCandidate/${camNum}`,
        onMessage,
        'ICE'
      )
    },
    onStompError: (frame) => {
      console.error('STOMP 오류:', frame.headers['message'])
    },
    onDisconnect: () => {
      console.log('STOMP 연결 종료됨')
    },
    onWebSocketError: (event) => {
      console.error('WebSocket 오류:', event)
    },
  })

  client.activate()
  return client
}

export const sendStompMessage = (
  client: Client,
  destination: string,
  message: SignalingMessage
): boolean => {
  if (!client.active) {
    console.error('STOMP 클라이언트가 활성화되지 않음')
    return false
  }

  try {
    client.publish({
      destination,
      body: JSON.stringify(message),
    })
    return true
  } catch (error) {
    console.error('STOMP 메시지 전송 중 오류:', error)
    return false
  }
}

function handleDisconnect(
  client: Client,
  originalOnDisconnect: Client['onDisconnect'] | undefined,
  resolve: () => void,
  timeoutId: NodeJS.Timeout
) {
  return (frame: IFrame) => {
    console.log('🔌 STOMP 연결 종료됨')
    if (originalOnDisconnect) {
      originalOnDisconnect(frame)
    }
    clearTimeout(timeoutId)
    resolve()
  }
}

export const closeStompClient = (client: Client): Promise<void> => {
  return new Promise((resolve) => {
    if (!client || !client.active) {
      console.log('STOMP 클라이언트가 이미 비활성화 상태입니다.')
      resolve()
      return
    }

    const timeoutId = setTimeout(() => {
      console.warn('STOMP 연결 종료 타임아웃, 강제 종료됨')
      client.deactivate()
      resolve()
    }, 3000)

    client.onDisconnect = handleDisconnect(
      client,
      client.onDisconnect,
      resolve,
      timeoutId
    )

    client.deactivate({ force: false }).catch((error) => {
      console.error('STOMP 연결 종료 중 오류:', error)
      clearTimeout(timeoutId)
      client.deactivate({ force: true })
      resolve()
    })
  })
}

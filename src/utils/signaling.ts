import { SignalingMessage } from '@/types/signaling'

const signalingServerUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL

if (!signalingServerUrl) {
  throw new Error('NEXT_PUBLIC_SIGNALING_SERVER_URL is not defined')
}

export const connectSignalingServer = (
  onMessage: (message: SignalingMessage) => void
): WebSocket => {
  const socket = new WebSocket(signalingServerUrl)

  socket.onopen = () => console.log('WebSocket 연결 열림')
  socket.onmessage = (event) => onMessage(JSON.parse(event.data))
  socket.onclose = () => console.log('WebSocket 연결 종료')
  socket.onerror = (error) => console.error('WebSocket 오류:', error)

  return socket
}

export const sendMessage = (
  socket: WebSocket,
  message: SignalingMessage
): void => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message))
  }
}

export const closeSignalingServer = (socket: WebSocket): void => {
  if (socket) {
    socket.close()
  }
}

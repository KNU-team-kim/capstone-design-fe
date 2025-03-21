const signalingServerUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL;
if (!signalingServerUrl) {
    throw new Error('NEXT_PUBLIC_SIGNALING_SERVER_URL is not defined');
  }
  
  export const connectSignalingServer = (onMessage: (message: any) => void): WebSocket => {
    const socket = new WebSocket(signalingServerUrl);
  
    socket.onopen = () => console.log('WebSocket 연결 열림');
    socket.onclose = () => console.log('WebSocket 연결 종료');
    socket.onerror = (error) => console.error('WebSocket 오류:', error);
  
    return socket;
  };
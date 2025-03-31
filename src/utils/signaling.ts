import { SignalingMessage } from "@/types/signaling";
import { Client, IMessage } from "@stomp/stompjs";

const signalingServerUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL

if (!signalingServerUrl) {
  throw new Error('NEXT_PUBLIC_SIGNALING_SERVER_URL is not defined')
}

export const createStompClient = (
  onMessage: (message: SignalingMessage) => void,
  camNum: string
): Client => {
  const client = new Client({
    brokerURL: signalingServerUrl,
    reconnectDelay: 3000,
    onConnect: () => {
      console.log('🔌 STOMP 연결 성공');
      try{
        client.subscribe(`/topic/answer/${camNum}`, (message: IMessage) => {
          try{
            console.log('[STOMP] ANSWER 수신', message);
            onMessage(JSON.parse(message.body));
          } catch(error) {
            console.error('[STOMP] ANSWER 처리 중 오류:', error);
          }
        });

        client.subscribe(`/topic/iceCandidate/${camNum}`, (message: IMessage) => {
          try {
            console.log('[STOMP] ICE 수신', message);
            onMessage(JSON.parse(message.body));
          } catch (error) {
            console.error('[STOMP] ICE 처리 중 오류:', error);
          }
        });
      } catch(error) {
        console.error('STOMP 구독 중 오류:', error);
      }
      
    },
    onStompError: (frame) => {
      console.error('STOMP 오류:', frame.headers['message']);
    },
    onDisconnect: () => {
      console.log('STOMP 연결 종료됨');
    },
    onWebSocketError: (event) => {
      console.error('WebSocket 오류:', event);
    },
  });

  client.activate();
  return client;
};

export const sendStompMessage = (
  client: Client,
  destination: string,
  message: SignalingMessage
): boolean => {
  try {
    if (!client.active) {
      console.error('STOMP 클라이언트가 활성화되지 않음');
      return false;
    }
    
    client.publish({
      destination,
      body: JSON.stringify(message),
    });
    
    return true;
  } catch (error) {
    console.error('STOMP 메시지 전송 중 오류:', error);
    return false;
  }
};

export const closeStompClient = (client: Client): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!client || !client.active) {
      console.log('STOMP 클라이언트가 이미 비활성화 상태입니다.');
      resolve();
      return;
    }

    // 연결 종료 콜백 설정
    const originalOnDisconnect = client.onDisconnect;
    
    client.onDisconnect = (frame) => {
      console.log('🔌 STOMP 연결 종료됨');
      
      // 원래 onDisconnect 콜백이 있었다면 호출
      if (originalOnDisconnect) {
        originalOnDisconnect(frame);
      }
      
      resolve();
    };

    // 에러 처리를 위한 타임아웃 설정
    const timeoutId = setTimeout(() => {
      console.warn('STOMP 연결 종료 타임아웃, 강제 종료됨');
      client.deactivate();
      resolve();
    }, 3000);

    try {
      // 정상적인 연결 종료 시도
      client.deactivate({force: false})
        .then(() => {
          clearTimeout(timeoutId);
        })
        .catch((error) => {
          console.error('STOMP 연결 종료 중 오류:', error);
          clearTimeout(timeoutId);
          client.deactivate({force: true}); // 강제 종료
          resolve();
        });
    } catch (error) {
      console.error('STOMP 연결 종료 요청 중 예외 발생:', error);
      clearTimeout(timeoutId);
      client.deactivate({force: true}); // 강제 종료
      resolve();
    }
  });
};
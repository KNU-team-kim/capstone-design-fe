import { SignalingMessage } from "@/types/signaling";
import { Client, IMessage } from "@stomp/stompjs";

const signalingServerUrl = process.env.NEXT_PUBLIC_SIGNALING_SERVER_URL;

if (!signalingServerUrl) {
  throw new Error('NEXT_PUBLIC_SIGNALING_SERVER_URL is not defined');
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

      // 수신 채널 구독
      client.subscribe(`/topic/answer/${camNum}`, (message: IMessage) => {
        console.log('[STOMP] ANSWER 수신', message);
        onMessage(JSON.parse(message.body));
      });

      client.subscribe(`/topic/iceCandidate/${camNum}`, (message: IMessage) => {
        console.log('[STOMP] ICE 수신', message);
        onMessage(JSON.parse(message.body));
      });
    },
    onStompError: (frame) => {
      console.error('STOMP 오류:', frame.headers['message']);
    },
  });

  client.activate();
  return client;
};

export const sendStompMessage = (
  client: Client,
  destination: string,
  message: SignalingMessage
) => {
  client.publish({
    destination,
    body: JSON.stringify(message),
  });
};
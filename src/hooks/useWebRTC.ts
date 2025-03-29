import { createStompClient, sendStompMessage, closeStompClient } from '@/utils/signaling';
import { useEffect, useRef, useState } from 'react';
import { SignalingMessage } from '@/types/signaling';
import { Client } from '@stomp/stompjs';

const iceServers = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useWebRTC = (camNum: string = '1') => {
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const stompClient = useRef<Client | null>(null);

  useEffect(() => {
    const init = async () => {
      const handleSignalingMessage = async (message: SignalingMessage) => {
        console.log(message.type)
        switch (message.type) {
          case 'offer':
            console.log('handle offer siganling message')
            await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(message.offer));
            const answer = await peerConnection.current?.createAnswer();
            await peerConnection.current?.setLocalDescription(answer!);
            sendStompMessage(stompClient.current!, `/app/answer/${camNum}`, {
              type: 'answer',
              answer: answer!,
            });
            break;
          case 'answer':
            console.log('handle answer signaling message')
            await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(message));
            break;
          case 'ice-candidate':
            console.log('handle ice-candidate signaling message')
            await peerConnection.current?.addIceCandidate(new RTCIceCandidate(message.candidate));
            break;
          default:
            console.log('cannot handle signaling message')
            break;
        }
      };

      // stomp signaling 서버, pc 설정
      stompClient.current = createStompClient(handleSignalingMessage, camNum);
      peerConnection.current = new RTCPeerConnection(iceServers);

      // ice candidate 구독
      peerConnection.current.onicecandidate = (event) => {
        console.log('pc on ice-candidate', event)
        if (event.candidate) {
          sendStompMessage(stompClient.current!, `/app/iceCandidate/${camNum}`, {
            type: 'ice-candidate',
            candidate: event.candidate.toJSON(),
          });
        }
      };

      // 영상 스트림 불러오기
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) videoRef.current.srcObject = stream;

        stream.getTracks().forEach((track) => {
          if (peerConnection.current?.signalingState !== 'closed') {
            peerConnection.current?.addTrack(track, stream);
          }
        });
      } catch (err) {
        console.error('웹캠 접근 오류:', err);
      }

      // offer 전송. 웹캡 테스트용
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(offer);
      sendStompMessage(stompClient.current!, `/app/offer/${camNum}`, {
        type: 'offer',
        offer: offer,
      });

      setIsConnected(true);
    };

    init();
    return () => {
      closeStompClient(stompClient.current!);
      if (peerConnection.current) {
        peerConnection.current.close();
      }
    };
  }, [camNum]);

  return { videoRef, isConnected };
};

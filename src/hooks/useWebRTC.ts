// useWebRTC.ts 수정

import { createStompClient, sendStompMessage, closeStompClient } from '@/utils/signaling';
import { useEffect, useRef, useState } from 'react';
import { SignalingMessage } from '@/types/signaling';
import { Client } from '@stomp/stompjs';

const iceServers = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
}

export const useWebRTC = (camNum: string = '1') => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('new');
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const stompClient = useRef<Client | null>(null);
  const localStream = useRef<MediaStream | null>(null);
  // ICE 후보를 임시 저장할 배열 추가
  const pendingIceCandidates = useRef<RTCIceCandidate[]>([]);
  // 원격 설명이 설정되었는지 추적
  const hasRemoteDescription = useRef<boolean>(false);

  useEffect(() => {
    const init = async () => {
      try {
        const handleSignalingMessage = async (message: SignalingMessage) => {
          if (!peerConnection.current) return;
          
          try {
            console.log('수신된 시그널링 메시지:', message.type);

            
            
            switch (message.type) {
              case 'answer':
                console.log('ANSWER 처리 중');
                await peerConnection.current.setRemoteDescription(
                  new RTCSessionDescription({
                    type: message.answer.type,
                    sdp: message.answer.sdp,
                  })
                );
                console.log('원격 설명 설정 완료');
                
                // 원격 설명이 설정되었음을 표시
                hasRemoteDescription.current = true;
                
                // 대기 중인 모든 ICE 후보 처리
                console.log(`${pendingIceCandidates.current.length}개의 대기 중인 ICE 후보 처리`);
                for (const candidate of pendingIceCandidates.current) {
                  await peerConnection.current.addIceCandidate(candidate);
                }
                pendingIceCandidates.current = [];
                break;
                
              case 'ice-candidate':
                if (message.candidate) {
                  const iceCandidate = new RTCIceCandidate(message.candidate);
                  
                  // 원격 설명이 설정되었는지 확인
                  if (hasRemoteDescription.current) {
                    console.log('ICE 후보 즉시 추가');
                    await peerConnection.current.addIceCandidate(iceCandidate);
                  } else {
                    console.log('ICE 후보 대기열에 추가 (원격 설명 대기 중)');
                    pendingIceCandidates.current.push(iceCandidate);
                  }
                }
                break;
                
              default:
                console.log('처리할 수 없는 시그널링 메시지 타입:', message.type);
                break;
            }
          } catch (error) {
            console.error('시그널링 메시지 처리 중 오류:', error);
          }
        };

        // STOMP 시그널링 서버 연결
        stompClient.current = createStompClient(handleSignalingMessage, camNum);
        
        // PeerConnection 설정
        peerConnection.current = new RTCPeerConnection(iceServers);
        
        // 연결 상태 모니터링
        peerConnection.current.oniceconnectionstatechange = () => {
          const state = peerConnection.current?.iceConnectionState || 'unknown';
          console.log('ICE 연결 상태 변경:', state);
          setConnectionState(state);
          
          if (state === 'connected' || state === 'completed') {
            setIsConnected(true);
          } else if (state === 'failed' || state === 'disconnected' || state === 'closed') {
            setIsConnected(false);
          }
        };

        // ICE 후보 이벤트 처리
        peerConnection.current.onicecandidate = (event) => {
          if (!stompClient.current || !event.candidate) return;
          
          console.log('ICE 후보 발견:', event.candidate);
          
          try {
            sendStompMessage(stompClient.current, `/app/iceCandidate/${camNum}`, {
              type: 'ice-candidate',
              candidate: event.candidate.toJSON()
            });
          } catch (error) {
            console.error('ICE 후보 전송 중 오류:', error);
          }
        };

        // 미디어 스트림 획득
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true});
          
          localStream.current = stream;
          
          // 비디오 요소에 스트림 연결
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }

          // 스트림의 모든 트랙을 PeerConnection에 추가
          stream.getTracks().forEach((track) => {
            if (peerConnection.current?.signalingState !== 'closed') {
              peerConnection.current?.addTrack(track, stream);
            }
          });
          
          console.log('로컬 미디어 스트림 획득 및 추가 성공');
        } catch (error) {
          console.error('웹캠/마이크 접근 오류:', error);
          return; // 미디어 스트림 획득 실패 시 종료
        }

        // Offer 생성 및 전송
        try {
          console.log('Offer 생성 시작');
          const offer = await peerConnection.current.createOffer({offerToReceiveAudio: true});
          
          await peerConnection.current.setLocalDescription(offer);
          console.log('로컬 설명 설정 완료');
          
          // 시그널링 서버에 offer 전송
          sendStompMessage(stompClient.current!, `/app/offer/${camNum}`, {
            type: 'offer',
            offer: offer 
          });
          
          console.log('Offer 전송 완료');
        } catch (error) {
          console.error('Offer 생성/전송 중 오류:', error);
        }
      } catch (error) {
        console.error('WebRTC 초기화 중 오류:', error);
      }
    };

    init();

    // 정리 함수
    return () => {
      // 로컬 미디어 스트림 정리
      if (localStream.current) {
        localStream.current.getTracks().forEach(track => {
          track.stop();
        });
        localStream.current = null;
      }
      
      // 비디오 요소 정리
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      // PeerConnection 정리
      if (peerConnection.current) {
        peerConnection.current.close();
        peerConnection.current = null;
      }
      
      // STOMP 클라이언트 정리
      if (stompClient.current) {
        closeStompClient(stompClient.current);
        stompClient.current = null;
      }
      
      // 상태 초기화
      hasRemoteDescription.current = false;
      pendingIceCandidates.current = [];
      setIsConnected(false);
    };
  }, [camNum]);

  return { videoRef, isConnected, connectionState };
};
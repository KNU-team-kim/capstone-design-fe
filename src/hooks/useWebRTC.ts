import { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { createStompClient, sendStompMessage } from '@/utils/signaling';
import { SignalingMessage } from '@/types/signaling';

export const useWebRTC = (camNum: string = '1') => {
  const [isConnected, setIsConnected] = useState(false);
  const [connectionState, setConnectionState] = useState<string>('new');
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const stompClient = useRef<Client | null>(null);
  const gatheredCandidates = useRef<RTCIceCandidate[]>([]);
  const pendingIceCandidates = useRef<RTCIceCandidate[]>([]);
  const hasRemoteDescription = useRef<boolean>(false);

  useEffect(() => {
    const init = async () => {
      peerConnection.current = new RTCPeerConnection({
        iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
      });

      stompClient.current = await setupSignalingHandler();
      setupICEHandlers();
      await setupMediaDevices();

      peerConnection.current.oniceconnectionstatechange = () => {
        const state = peerConnection.current?.iceConnectionState || 'unknown';
        setConnectionState(state);
        setIsConnected(state === 'connected' || state === 'completed');
      };
    };

    const setupSignalingHandler = async (): Promise<Client> => {
      const handleSignalingMessage = async (message: SignalingMessage) => {
        if (!peerConnection.current) return;

        try {
          switch (message.type) {
            case 'offer': {
              console.log('[Signaling] OFFER 수신 → remoteDescription 설정');
              await peerConnection.current.setRemoteDescription(
                new RTCSessionDescription(message.offer)
              );
              hasRemoteDescription.current = true;

              const answer = await peerConnection.current.createAnswer();
              await peerConnection.current.setLocalDescription(answer);
              console.log('[Signaling] ANSWER 생성 및 localDescription 설정 완료');

              await waitForIceGatheringComplete(peerConnection.current);

              if (peerConnection.current.localDescription) {
                console.log('[Signaling] ANSWER 전송 시작');
                sendStompMessage(stompClient.current!, `/app/answer/${camNum}`, {
                  type: 'answer',
                  answer: peerConnection.current.localDescription,
                });
                console.log('[Signaling] ANSWER 전송 완료');
              }

              console.log(`[Signaling] 대기 중 ICE 후보 ${pendingIceCandidates.current.length}개 추가`);
              const candidates = pendingIceCandidates.current;
              for (let i = 0; i < candidates.length; i++) {
                const candidate = candidates[i];
                await peerConnection.current.addIceCandidate(candidate);
              }
              pendingIceCandidates.current = [];
              break;
            }

            case 'ice-candidate': {
              if (message.candidate) {
                const iceCandidate = new RTCIceCandidate(message.candidate);
                if (hasRemoteDescription.current) {
                  console.log('[Signaling] ICE 후보 바로 추가');
                  await peerConnection.current.addIceCandidate(iceCandidate);
                } else {
                  console.log('[Signaling] ICE 후보 대기 큐에 추가 (remoteDescription 미설정)');
                  pendingIceCandidates.current.push(iceCandidate);
                }
              }
              break;
            }
          }
        } catch (err) {
          console.error('시그널링 처리 오류:', err);
        }
      };

      const client = createStompClient(handleSignalingMessage, camNum);
      return client;
    };

    const setupICEHandlers = () => {
      peerConnection.current!.onicecandidate = (event) => {
        if (event.candidate) {
          gatheredCandidates.current.push(event.candidate);
        }
      };

      peerConnection.current!.onicegatheringstatechange = () => {
        if (peerConnection.current!.iceGatheringState === 'complete') {
          console.log('ICE 수집 완료. 후보 전송 시작');
          for (let i = 0; i < gatheredCandidates.current.length; i++) {
            const candidate = gatheredCandidates.current[i];
            console.log('[ICE] 후보 전송 중:', candidate.candidate);
            if (stompClient.current?.connected) {
              stompClient.current.publish({
                destination: `/app/iceCandidate/${camNum}`,
                body: JSON.stringify({
                  type: 'ice-candidate',
                  candidate: candidate.toJSON(),
                }),
              });
            }
          }
          console.log('[ICE] 모든 ICE 후보 전송 완료');
          gatheredCandidates.current.length = 0;
        }
      };
    };

    const setupMediaDevices = async () => {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter((d) => d.kind === 'videoinput');
      const macCam = videoDevices.find((d) => d.label.includes('MacBook'));
      const obsCam = videoDevices.find((d) => d.label === 'OBS Virtual Camera');

      if (macCam) {
        const macStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: macCam.deviceId } },
        });
        if (videoRef.current[0]) {
          videoRef.current[0].srcObject = macStream;
        }
        macStream.getTracks().forEach((track) => {
          peerConnection.current!.addTrack(track, macStream);
        });
      }

      if (obsCam) {
        const obsStream = await navigator.mediaDevices.getUserMedia({
          video: { deviceId: { exact: obsCam.deviceId } },
        });
        if (videoRef.current[1]) {
          videoRef.current[1].srcObject = obsStream;
        }
      }
    };

    init();

    return () => {
      peerConnection.current?.getSenders().forEach(sender => sender.track?.stop());
      videoRef.current.forEach(videoEl => {
        if (videoEl) videoEl.srcObject = null;
      });
      peerConnection.current?.close();
      stompClient.current?.deactivate();
      peerConnection.current = null;
      stompClient.current = null;
      gatheredCandidates.current = [];
      pendingIceCandidates.current = [];
      hasRemoteDescription.current = false;
      setIsConnected(false);
    };
  }, [camNum]);

  return { videoRef, isConnected, connectionState };
};

async function waitForIceGatheringComplete(pc: RTCPeerConnection): Promise<void> {
  if (pc.iceGatheringState === 'complete') return;
  return new Promise((resolve) => {
    const checkState = () => {
      if (pc.iceGatheringState === 'complete') {
        pc.removeEventListener('icegatheringstatechange', checkState);
        resolve();
      }
    };
    pc.addEventListener('icegatheringstatechange', checkState);
  });
}

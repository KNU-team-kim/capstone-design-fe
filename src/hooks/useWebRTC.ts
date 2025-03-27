import { connectSignalingServer, sendMessage, closeSignalingServer } from '@/utils/signaling';
import { useEffect, useRef, useState } from 'react';
import { SignalingMessage } from '@/types/signaling';

const iceServers = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useWebRTC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<(HTMLVideoElement | null)[]>([]);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const handleSignalingMessage = async (message: SignalingMessage) => {
      switch (message.type) {
        case 'offer':
          await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(message.offer));
          const answer = await peerConnection.current?.createAnswer();
          await peerConnection.current?.setLocalDescription(answer);
          if (socket.current && answer) {
            sendMessage(socket.current, { type: 'answer', answer });
          }
          break;
        case 'answer':
          await peerConnection.current?.setRemoteDescription(new RTCSessionDescription(message.answer));
          break;
        case 'ice-candidate':
          const candidate = new RTCIceCandidate(message.candidate);
          await peerConnection.current?.addIceCandidate(candidate);
          break;
        default:
          break;
      }
    };

    socket.current = connectSignalingServer(handleSignalingMessage);
    setIsConnected(true);

    peerConnection.current = new RTCPeerConnection(iceServers);

    const getWebcamStream = async () => {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        
        const streams = await Promise.all(videoDevices.map(device =>
          navigator.mediaDevices.getUserMedia({
            video: { deviceId: { exact: device.deviceId } }
          })
        ));

        streams.forEach((stream, index) => {
          if (videoRef.current[index]) videoRef.current[index].srcObject = stream;
          stream.getTracks().forEach(track => peerConnection.current?.addTrack(track, stream));
        });
      } catch (err) {
        console.error('웹캠 접근 오류:', err);
      }
    };

    getWebcamStream();

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (socket.current) {
        closeSignalingServer(socket.current);
      }
    };
  }, []);

  return { videoRef, isConnected };
};

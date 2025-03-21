import { connectSignalingServer } from '@/utils/signaling';
import { useEffect, useRef, useState } from 'react';

const iceServers = {
  iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
};

export const useWebRTC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const peerConnection = useRef<RTCPeerConnection | null>(null);
  const socket = useRef<WebSocket | null>(null);

  useEffect(() => {
    const getWebcamStream = async () => {
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
    };

    socket.current = connectSignalingServer(() => {});
    setIsConnected(true);

    peerConnection.current = new RTCPeerConnection(iceServers);

    getWebcamStream();

    return () => {
      if (peerConnection.current) {
        peerConnection.current.close();
      }
      if (socket.current) {
        socket.current.close();
      }
    };
  }, []);

  return { videoRef, isConnected };
};

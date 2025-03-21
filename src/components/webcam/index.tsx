import { useEffect, useRef, useState } from 'react';

const signalingServerUrl = 'ws://15.164.163.252:8080/signaling';
let socket: WebSocket;
let peerConnection: RTCPeerConnection;

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket = new WebSocket(signalingServerUrl);

    socket.onopen = () => {
      console.log('WebSocket 연결이 열렸습니다.');
      setIsConnected(true);
    };

    socket.onmessage = async (event) => {
      const message = JSON.parse(event.data);

      switch (message.type) {
        case 'offer':
          await handleOffer(message);
          break;
        case 'answer':
          await handleAnswer(message);
          break;
        case 'ice-candidate':
          await handleNewICECandidate(message);
          break;
        default:
          break;
      }
    };

    socket.onclose = () => {
      console.log('WebSocket 연결이 종료되었습니다.');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('WebSocket 오류:', error);
    };

    // WebRTC PeerConnection 초기화
    peerConnection = new RTCPeerConnection({
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302', // Google STUN 서버
        },
      ],
    });

    // 웹캠 스트림 설정
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }

        // 비디오 스트림을 PeerConnection에 추가
        stream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, stream);
        });
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    getWebcamStream();

    return () => {
      if (peerConnection) {
        peerConnection.close();
      }
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
      socket.close();
    };
  }, []);

  const handleOffer = async (message: any) => {
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(message.offer));

      const answer = await peerConnection.createAnswer();
      await peerConnection.setLocalDescription(answer);

      socket.send(JSON.stringify({ type: 'answer', answer }));
    } catch (error) {
      console.error('Error handling offer:', error);
    }
  };

  const handleAnswer = async (message: any) => {
    try {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(message.answer));
    } catch (error) {
      console.error('Error handling answer:', error);
    }
  };

  const handleNewICECandidate = async (message: any) => {
    try {
      const candidate = new RTCIceCandidate(message.candidate);
      await peerConnection.addIceCandidate(candidate);
    } catch (error) {
      console.error('Error adding ICE candidate:', error);
    }
  };

  return (
    <div>
      <h1>WebRTC Connection</h1>
      <video ref={videoRef} autoPlay playsInline width="100%" />
      {isConnected ? <p>Connected to signaling server</p> : <p>Connecting...</p>}
    </div>
  );
};

export default Webcam;

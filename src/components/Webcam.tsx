'use client';

import { useWebRTC } from "@/hooks/useWebRTC";
const Webcam = () => {
  const { videoRef, isConnected } = useWebRTC();

  return (
    <div>
      <h1>WebRTC 연동</h1>
      <video ref={videoRef} autoPlay playsInline width="100%" />
      <p>{isConnected ? '시그널링 서버 연결 완료👍' : '연결중...'}</p>
    </div>
  );
};

export default Webcam;
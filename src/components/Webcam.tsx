'use client';

import { useWebRTC } from "@/hooks/useWebRTC";
const Webcam = () => {
  const { videoRef } = useWebRTC();

  return (
    <div>
      <h1>WebRTC 연동</h1>
      <video ref={videoRef} autoPlay playsInline width="100%" />
    </div>
  );
};

export default Webcam;
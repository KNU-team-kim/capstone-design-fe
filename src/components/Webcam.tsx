'use client';

import { useWebRTC } from "@/hooks/useWebRTC";
const Webcam = () => {
  const { videoRef, isConnected } = useWebRTC();

  return (
    <div>
      <div>
        <h1>WebRTC 연동</h1>
        <video ref={(el) => { videoRef.current[0] = el; }} autoPlay playsInline width="300" />
      </div>
      <div>
        <h1>OBS 가상 카메라</h1>
        <video ref={(el) => { videoRef.current[1] = el; }} autoPlay playsInline width="300" />
      </div>
    </div>
  );
};

export default Webcam;
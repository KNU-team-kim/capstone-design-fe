import { useEffect, useRef } from 'react';

const Webcam = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const getWebcamStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    getWebcamStream();

    return () => {
      if (videoRef.current?.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, []);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline width="100%" />
    </div>
  );
};

export default Webcam;

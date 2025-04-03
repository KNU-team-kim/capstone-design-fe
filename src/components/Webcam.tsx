'use client'

import { useWebRTC } from '@/hooks/useWebRTC'

const Webcam = () => {
  const { videoRef } = useWebRTC()

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '10px',
        width: '90vw',
        maxWidth: '960px',
      }}
    >
      {[0, 1, 2, 3].map((index) => (
        <div
          key={index}
          style={{
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: '8px',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
          }}
        >
          <video
            ref={(el) => {
              if (el) videoRef.current[index] = el
            }}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        </div>
      ))}
    </div>
  )
}

export default Webcam

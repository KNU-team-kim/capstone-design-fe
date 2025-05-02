'use client'

import DirectionTag from '@/components/DirectionTag'
import { useWebRTC } from '@/hooks/useWebRTC'

const Webcam = () => {
  const front = useWebRTC('front')
  const right = useWebRTC('right')
  const left = useWebRTC('left')
  const back = useWebRTC('back')

  const streams = [
    { ref: front.videoRef, direction: 'front' as const },
    { ref: right.videoRef, direction: 'right' as const },
    { ref: left.videoRef, direction: 'left' as const },
    { ref: back.videoRef, direction: 'back' as const },
  ]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: '1fr 1fr',
        gap: '10px',
        width: '90vw',
        maxWidth: '1460px',
      }}
    >
      {streams.map(({ ref, direction }, index) => (
        <div
          key={index}
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: '8px',
            overflow: 'hidden',
            aspectRatio: '16 / 9',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <video
            ref={ref}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
          <div
            style={{
              position: 'absolute',
              bottom: '8px',
              right: '8px',
            }}
          >
            <DirectionTag direction={direction} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default Webcam

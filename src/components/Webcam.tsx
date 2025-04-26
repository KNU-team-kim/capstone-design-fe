'use client'

import { useEffect, useState } from 'react'

import { useWebRTC } from '@/hooks/useWebRTC'

const Webcam = () => {
  const { videoRef } = useWebRTC()
  const [hasSignal, setHasSignal] = useState([false, false, false, false])

  useEffect(() => {
    const interval = setInterval(() => {
      const status = videoRef.current.map((ref) => !!ref?.srcObject)
      setHasSignal(status)
    }, 1000)

    return () => clearInterval(interval)
  }, [videoRef])

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
            position: 'relative',
            width: '100%',
            height: '100%',
            backgroundColor: '#000000',
            borderRadius: '8px',
            overflow: 'hidden',
            aspectRatio: '4 / 3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!hasSignal[index] && (
            <div
              style={{
                color: '#BFBFBF',
                fontSize: '20px',
                position: 'absolute',
                textAlign: 'center',
              }}
            >
              신호 없음
            </div>
          )}
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

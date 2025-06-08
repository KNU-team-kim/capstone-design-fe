'use client'

import { useEffect, useRef, useState } from 'react'

import CameraBox from '@/components/CameraBox'
import DelayLabel from '@/components/DelayLabel'
import DirectionTag, { Direction } from '@/components/DirectionTag'

const DIRECTION_LABELS: Record<number, Direction> = {
  0: 'front',
  1: 'right',
  2: 'left',
  3: 'back',
}

export default function WebcamAiortc() {
  const videoRef0 = useRef<HTMLVideoElement | null>(null)
  const videoRef1 = useRef<HTMLVideoElement | null>(null)
  const videoRef2 = useRef<HTMLVideoElement | null>(null)
  const videoRef3 = useRef<HTMLVideoElement | null>(null)

  const videoRefs = [videoRef0, videoRef1, videoRef2, videoRef3]
  const [expandedCam, setExpandedCam] = useState<number | null>(null)
  const [delays, setDelays] = useState<(number | null)[]>([
    null,
    null,
    null,
    null,
  ])

  const handleBackgroundClick = () => {
    if (expandedCam !== null) setExpandedCam(null)
  }

  const updateDelay = (camIndex: number, delay: number) => {
    setDelays((prev) => {
      const next = [...prev]
      next[camIndex] = delay
      return next
    })
  }

  const detectColorChange = (
    video: HTMLVideoElement,
    direction: Direction,
    camIndex: number
  ) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let lastColor = ''

    const analyze = () => {
      if (
        !ctx ||
        video.readyState < 2 ||
        video.videoWidth === 0 ||
        video.videoHeight === 0
      ) {
        requestAnimationFrame(analyze)
        return
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const [r, g, b] = ctx.getImageData(5, 5, 1, 1).data

      let currentColor = ''
      if (r > 200 && g < 100 && b < 100) currentColor = 'RED'
      else if (r < 100 && g > 200 && b < 100) currentColor = 'GREEN'
      else if (r < 100 && g < 100 && b > 200) currentColor = 'BLUE'

      if (currentColor && currentColor !== lastColor) {
        lastColor = currentColor
        const now = new Date()
        const nearest = Math.floor(now.getSeconds() / 10) * 10
        const expected = new Date(now)
        expected.setSeconds(
          nearest > now.getSeconds() ? nearest - 10 : nearest,
          0
        )
        const delayMs = now.getTime() - expected.getTime()

        console.log(
          `[Delay] ${direction}: ${currentColor}\n  감지시각: ${now.toISOString()}\n  기준시각: ${expected.toISOString()}\n  지연시간(ms): ${delayMs}`
        )

        updateDelay(camIndex, delayMs)
      }

      requestAnimationFrame(analyze)
    }

    analyze()
  }

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        detectColorChange(ref.current, DIRECTION_LABELS[index], index)
      }
    })
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {expandedCam !== null && (
        <div
          onClick={handleBackgroundClick}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 10,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
        />
      )}

      {expandedCam !== null && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90vw',
            maxWidth: '1280px',
            aspectRatio: '16 / 9',
            backgroundColor: '#000',
            borderRadius: '12px',
            overflow: 'hidden',
            zIndex: 20,
            boxShadow: '0 0 20px rgba(0,0,0,0.7)',
          }}
        >
          <CameraBox camNum={expandedCam} videoRef={videoRefs[expandedCam]} />
          <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
            <DirectionTag direction={DIRECTION_LABELS[expandedCam]} />
          </div>
          <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
            <DelayLabel delay={delays[expandedCam]} />
          </div>
        </div>
      )}

      {expandedCam === null && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: '10px',
            width: '90vw',
            maxWidth: '1460px',
            maxHeight: 'calc(100vh - 120px)',
          }}
        >
          {[0, 1, 2, 3].map((cam) => (
            <div
              key={cam}
              onClick={(e) => {
                e.stopPropagation()
                setExpandedCam(cam)
              }}
              style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                backgroundColor: '#000',
                borderRadius: '8px',
                overflow: 'hidden',
                aspectRatio: '16 / 9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <CameraBox camNum={cam} videoRef={videoRefs[cam]} />
              <div
                style={{ position: 'absolute', bottom: '8px', right: '8px' }}
              >
                <DirectionTag direction={DIRECTION_LABELS[cam]} />
              </div>
              <div style={{ position: 'absolute', top: '8px', left: '8px' }}>
                <DelayLabel delay={delays[cam]} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

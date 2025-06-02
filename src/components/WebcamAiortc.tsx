'use client'

import { useEffect, useRef } from 'react'

import CameraBox from '@/components/CameraBox'
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

  useEffect(() => {
    videoRefs.forEach((ref, index) => {
      if (ref.current) {
        detectColorChange(ref.current, DIRECTION_LABELS[index])
      }
    })
  }, [])

  const detectColorChange = (video: HTMLVideoElement, direction: Direction) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    let lastColor = ''

    const analyze = () => {
      if (!ctx) {
        console.warn(`[${direction}] ctx 생성 실패`)
        requestAnimationFrame(analyze)
        return
      }

      if (video.readyState < 2) {
        console.log(
          `[${direction}] video.readyState=${video.readyState} (재생 준비 안됨)`
        )
        requestAnimationFrame(analyze)
        return
      }

      if (video.videoWidth === 0 || video.videoHeight === 0) {
        console.log(`[${direction}] video width/height가 0`)
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
      }

      requestAnimationFrame(analyze)
    }

    console.log(`[${direction}] detectColorChange 시작`)
    analyze()
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
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
            }}
          >
            <CameraBox camNum={cam} videoRef={videoRefs[cam]} />
            <div style={{ position: 'absolute', bottom: '8px', right: '8px' }}>
              <DirectionTag direction={DIRECTION_LABELS[cam]} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

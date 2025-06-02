'use client'

import { useEffect, useRef } from 'react'

import DirectionTag from '@/components/DirectionTag'
import { useWebRTC } from '@/hooks/useWebRTC'

const Webcam = () => {
  const front = useWebRTC('front')
  const right = useWebRTC('right')
  const left = useWebRTC('left')
  const back = useWebRTC('back')

  const leftLogsRef = useRef<string[]>([])
  const backLogsRef = useRef<string[]>([])
  const frontLogsRef = useRef<string[]>([])
  //const [isReady, setIsReady] = useState(false)

  const detectColorChange = (video: HTMLVideoElement, direction: string) => {
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

      const imageData = ctx.getImageData(10, 10, 1, 1).data
      const [r, g, b] = imageData

      let currentColor = ''
      if (r > 200 && g < 100 && b < 100) currentColor = 'RED'
      else if (r < 100 && g > 200 && b < 100) currentColor = 'GREEN'
      else if (r < 100 && g < 100 && b > 200) currentColor = 'BLUE'

      if (currentColor && currentColor !== lastColor) {
        lastColor = currentColor

        const now = new Date()
        const seconds = now.getSeconds()
        const nearestChangeSecond = Math.floor(seconds / 10) * 10

        const expectedTime = new Date(now)
        expectedTime.setSeconds(nearestChangeSecond)
        expectedTime.setMilliseconds(0)

        if (expectedTime.getTime() > now.getTime()) {
          expectedTime.setSeconds(expectedTime.getSeconds() - 10)
        }

        const delayMs = now.getTime() - expectedTime.getTime()
        const nowISO = now.toISOString()
        const expectedISO = expectedTime.toISOString()

        const log = `${direction}: ${currentColor}`
        const fullLog =
          `[Delay] ${log}\n` +
          `  감지시각    : ${nowISO}\n` +
          `  기준시각    : ${expectedISO}\n` +
          `  지연시간(ms): ${delayMs}`

        if (direction === 'left') {
          leftLogsRef.current.push(fullLog)
        } else if (direction === 'back') {
          backLogsRef.current.push(fullLog)
        } else if (direction === 'front') {
          frontLogsRef.current.push(fullLog)
        }

        console.log(fullLog)
      }

      requestAnimationFrame(analyze)
    }

    analyze()
  }

  useEffect(() => {
    const checkReadyInterval = setInterval(() => {
      if (
        left.videoRef.current &&
        back.videoRef.current &&
        front.videoRef.current &&
        right.videoRef.current
      ) {
        detectColorChange(left.videoRef.current, 'left')
        detectColorChange(back.videoRef.current, 'back')
        detectColorChange(front.videoRef.current, 'front')
        detectColorChange(right.videoRef.current, 'right')
        clearInterval(checkReadyInterval)
        //
      }
    }, 500)
    return () => clearInterval(checkReadyInterval)
  }, [left.videoRef, back.videoRef, front.videoRef, right.videoRef])

  const streams = [
    { ref: front.videoRef, direction: 'front' as const },
    { ref: right.videoRef, direction: 'right' as const },
    { ref: left.videoRef, direction: 'left' as const },
    { ref: back.videoRef, direction: 'back' as const },
  ]

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
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
        {streams.map(({ ref, direction }, index) => (
          <div
            key={index}
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
    </div>
  )
}

export default Webcam

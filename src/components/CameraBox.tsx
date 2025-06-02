'use client'

import { useEffect } from 'react'
import type { RefObject } from 'react'

import { useAiortcWebRTC } from '@/hooks/useAiortcWebRTC'

interface CameraBoxProps {
  camNum: number
  videoRef: RefObject<HTMLVideoElement | null>
}

const CameraBox = ({ camNum, videoRef }: CameraBoxProps) => {
  const { setVideoElement } = useAiortcWebRTC(camNum)

  useEffect(() => {
    if (videoRef.current) {
      setVideoElement(videoRef.current)
    }
  }, [videoRef, setVideoElement])

  return (
    <video
      ref={videoRef}
      autoPlay
      playsInline
      muted
      style={{ width: '100%', height: '100%', objectFit: 'contain' }}
    />
  )
}

export default CameraBox

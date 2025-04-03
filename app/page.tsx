import Webcam from '@/components/Webcam'

export default function MainPage() {
  return (
    <main>
      <div
        style={{
          width: '90vw',
          maxWidth: '960px',
          aspectRatio: '4 / 3',
        }}
      >
        <Webcam />
      </div>
    </main>
  )
}

import ChakraWrapper from './chakra-provider'

export const metadata = {
  title: 'capstone_design_fe',
  description: 'Real-time multi-camera object detection',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="kr" style={{ overflow: 'hidden' }}>
      <body
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100vw',
          margin: 0,
        }}
      >
        <ChakraWrapper>{children}</ChakraWrapper>
      </body>
    </html>
  )
}

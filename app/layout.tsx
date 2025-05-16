import TabBar from '@/components/TabBar'

import ClientProviders from './ClientProviders'

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
      <body style={{ margin: 0, height: '100%', overflow: 'hidden' }}>
        <ClientProviders>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              height: '100vh',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                padding: '1rem 0',
                display: 'flex',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <TabBar />
            </div>

            <div
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                padding: '0',
                overflow: 'hidden',
              }}
            >
              {children}
            </div>
          </div>
        </ClientProviders>
      </body>
    </html>
  )
}

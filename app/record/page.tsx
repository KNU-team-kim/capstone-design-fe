'use client'

import { useEffect, useState } from 'react'

import { LogEntry, fetchLogs } from '@/hooks/useLog'

export default function RecordPage() {
  const [logs, setLogs] = useState<LogEntry[]>([])

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const data = await fetchLogs(0, 10)
        setLogs(data.logs)
      } catch (error) {
        console.error('로그 불러오기 실패:', error)
      }
    }

    loadLogs()
  }, [])

  return (
    <main>
      <h1>Record Page</h1>
      <p>이곳은 딜레이 확인 페이지입니다.</p>

      <ul>
        {logs.map((log) => (
          <li key={log.id}>
            [{log.direction}], {log.createdAt}, {log.classes.join(', ')}
          </li>
        ))}
      </ul>
    </main>
  )
}

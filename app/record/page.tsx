'use client'

import { useLogQuery } from '@/hooks/useLog'

export default function RecordPage() {
  const { data } = useLogQuery(0, 10)

  return (
    <div>
      <h2>로그 목록</h2>
      <ul>
        {data?.logs.map((log) => (
          <li key={log.id}>
            [{log.direction}], {log.createdAt}, {log.classes.join(', ')}, ({log.confidence})
          </li>
        ))}
      </ul>
    </div>
  )
}
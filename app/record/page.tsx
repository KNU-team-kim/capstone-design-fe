'use client'

import { useState } from 'react'

import RecordTable from '@/components/RecordTable'
import { useLogQuery } from '@/hooks/useLog'

export default function RecordPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, isLoading } = useLogQuery(currentPage - 1, pageSize)

  const handlePageChange = (page: number, size: number) => {
    setCurrentPage(page)
    setPageSize(size)
  }

  return (
    <div style={{ width: '95%', maxWidth: '1440px', padding: '0 4px' }}>
      {!isLoading && data && (
        <RecordTable
          logs={data.logs}
          total={data.totalPage * pageSize}
          pageSize={pageSize}
          current={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  )
}

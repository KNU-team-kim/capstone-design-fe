'use client'

import { Table } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { LogEntry } from '@/hooks/useLog'

interface Props {
  logs: LogEntry[]
  total: number
  pageSize: number
  current: number
  onPageChange: (page: number, pageSize: number) => void
}

const RecordTable = ({
  logs,
  pageSize,
  current,
  total,
  onPageChange,
}: Props) => {
  const columns: ColumnsType<LogEntry> = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      width: 85,
      render: (url: string) => <img src={url} alt="캡쳐 이미지" />,
    },
    {
      title: 'Direction',
      dataIndex: 'direction',
      key: 'direction',
      width: 100,
      render: (text) => <span>{text.toLowerCase()}</span>,
    },
    {
      title: 'Label',
      dataIndex: 'classes',
      key: 'label',
      width: 640,
      render: (classes: string[]) => (
        <div>
          {classes.map((cls, index) => {
            const label = cls.toLowerCase().replace(/_/g, ' ')
            return (
              <span key={index} style={{ marginRight: 8, fontSize: '12px' }}>
                {label}
              </span>
            )
          })}
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => value.slice(0, 10),
    },
    {
      title: 'Time',
      dataIndex: 'createdAt',
      key: 'time',
      render: (value: string) => value.slice(11, 19),
    },
    {
      title: 'Confidence',
      dataIndex: 'confidence',
      key: 'confidence',
      width: 80,
      render: (value: number) => value.toFixed(2),
    },
  ]

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        padding: 0,
      }}
    >
      <div style={{ width: '100%', maxWidth: '1200px' }}>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={logs}
          size="small"
          pagination={false}
        />
      </div>
    </div>
  )
}

export default RecordTable

'use client'

import { useEffect, useRef, useState } from 'react'

import { Modal, Table, Tag } from 'antd'
import type { ColumnsType } from 'antd/es/table'

import { LogEntry } from '@/hooks/useLog'

interface Props {
  logs: LogEntry[]
  total: number
  pageSize: number
  current: number
  onPageChange: (page: number, pageSize: number) => void
}

const classColorMap: Record<string, string> = {
  tree: 'green',
  paper_box: 'blue',
  traffic_sign: 'volcano',
  container: 'purple',
  plastic: 'cyan',
  disposable_cup: 'geekblue',
  wooden_building: 'gold',
}

const RecordTable = ({
  logs,
  pageSize,
  current,
  total,
  onPageChange,
}: Props) => {
  const tableWrapperRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [selectedImageUrl, setSelectedImageUrl] = useState<string | null>(null)

  useEffect(() => {
    const handleResize = () => {
      if (tableWrapperRef.current) {
        const parentWidth = tableWrapperRef.current.offsetWidth
        const baseWidth = 1200
        const newScale = Math.min(1, parentWidth / baseWidth)
        setScale(newScale)
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const columns: ColumnsType<LogEntry> = [
    {
      title: 'Image',
      dataIndex: 'imageUrl',
      key: 'image',
      width: 100,
      render: (url: string) => (
        <div
          style={{
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '4px',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '40px',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedImageUrl(url)}
        >
          <img
            src={url}
            alt="이미지"
            style={{
              maxHeight: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
            }}
          />
        </div>
      ),
    },
    {
      title: 'Direction',
      dataIndex: 'direction',
      key: 'direction',
      width: 100,
      render: (text) => <Tag>{text.toLowerCase()}</Tag>,
    },
    {
      title: 'Label',
      dataIndex: 'classes',
      key: 'label',
      width: 640,
      render: (classes: string[]) => (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
            maxWidth: '100%',
          }}
        >
          {classes.map((cls) => {
            const lower = cls.toLowerCase()
            const label = lower.replace(/_/g, ' ')
            const color = classColorMap[lower] || 'default'

            return (
              <Tag
                key={cls}
                color={color}
                style={{
                  marginBottom: 4,
                  borderRadius: '16px',
                  fontSize: '11px',
                  padding: '0 6px',
                  lineHeight: '18px',
                  whiteSpace: 'normal',
                }}
              >
                {label}
              </Tag>
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
      ref={tableWrapperRef}
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: '0 8px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          transform: `scale(${scale})`,
          transformOrigin: 'top left',
          width: '1200px',
          margin: '0 auto',
        }}
      >
        <Table
          rowKey="id"
          columns={columns}
          dataSource={logs}
          size="small"
          pagination={{
            pageSize,
            total,
            current,
            onChange: onPageChange,
            showSizeChanger: false,
            position: ['bottomCenter'],
          }}
        />
      </div>

      <Modal
        open={!!selectedImageUrl}
        footer={null}
        onCancel={() => setSelectedImageUrl(null)}
        centered
        width="80%"
        bodyStyle={{
          textAlign: 'center',
          padding: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {selectedImageUrl && (
          <div
            style={{
              width: '100%',
              aspectRatio: '16 / 9',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <img
              src={selectedImageUrl}
              alt="확대 이미지"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '8px',
              }}
            />
          </div>
        )}
      </Modal>
    </div>
  )
}

export default RecordTable

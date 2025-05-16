import axios from 'axios'

export type LogEntry = {
  id: number
  imageUrl: string
  direction: string
  classes: string[]
  createdAt: string
  confidence: number
}

export type GetLogsResponse = {
  totalPage: number
  logs: LogEntry[]
}

export async function fetchLogs(
  page: number,
  size: number,
  classType?: string,
  directionType?: string
): Promise<GetLogsResponse> {
  const response = await axios.get<GetLogsResponse>(
    'http://15.164.163.252:8080/api/logs',
    {
      params: {
        page,
        size,
        classType,
        directionType,
      },
    }
  )
  return response.data
}

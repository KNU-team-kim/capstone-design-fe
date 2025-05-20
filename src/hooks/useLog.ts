import { useQuery } from '@tanstack/react-query'
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

export const useLogQuery = (
  page: number,
  size: number,
  classType?: string,
  directionType?: string
) => {
  return useQuery({
    queryKey: ['logs', page, size, classType, directionType],
    queryFn: async () => {
      const response = await axios.get<GetLogsResponse>(
        'https://mstream-be.kro.kr/api/logs',
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
    },
    staleTime: 5000,
  })
}

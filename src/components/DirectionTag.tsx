'use client'

import { Badge } from '@chakra-ui/react'

type Direction = 'front' | 'back' | 'left' | 'right'

interface Props {
  direction: Direction
}

const directionColorMap: Record<Direction, string> = {
  // 색상 팔레트 추가 후 수정하기
  front: 'gray',
  back: 'gray',
  left: 'gray',
  right: 'gray',
}

const DirectionTag = ({ direction }: Props) => {
  return (
    <Badge
      // 색상 다시 수정하기
      colorScheme={directionColorMap[direction]}
      borderRadius="lg"
      px={4}
      py={1}
      fontWeight="medium"
      fontSize="sm"
      textTransform="none"
    >
      {direction}
    </Badge>
  )
}

export default DirectionTag

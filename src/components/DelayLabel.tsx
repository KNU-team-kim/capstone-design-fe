'use client'

import { IoTimerOutline } from 'react-icons/io5'

import { Box, HStack, Text } from '@chakra-ui/react'

interface Props {
  delay: number | null
}

const DelayLabel = ({ delay }: Props) => {
  return (
    <Box
      bg="gray.100"
      borderRadius="xl"
      px={3}
      py={1}
      fontSize="sm"
      fontWeight="medium"
      opacity={0.8}
    >
      <HStack spacing={1} align="center">
        <IoTimerOutline />
        <Text>
          {typeof delay === 'number' ? `${delay.toFixed(2)}ms` : '측정중...'}
        </Text>
      </HStack>
    </Box>
  )
}

export default DelayLabel

'use client'

import { ReactNode } from 'react'

import { ChakraProvider, extendTheme } from '@chakra-ui/react'

const theme = extendTheme({})

export default function ChakraWrapper({ children }: { children: ReactNode }) {
  return <ChakraProvider theme={theme}>{children}</ChakraProvider>
}

'use client'

import { BiCamera, BiDetail } from 'react-icons/bi'

import { Button, HStack, Icon } from '@chakra-ui/react'
import { usePathname, useRouter } from 'next/navigation'

const tabs = [
  { label: 'Camera', icon: BiCamera, route: '/' },
  { label: 'Record', icon: BiDetail, route: '/record' },
]

const TabBar = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <HStack
      bg="gray.100"
      borderRadius="md"
      p={1}
      spacing={1}
      justify="center"
      width="fit-content"
      mx="auto"
      mt="20px"
    >
      {tabs.map((tab) => {
        const isActive = pathname === tab.route

        return (
          <Button
            key={tab.route}
            onClick={() => router.push(tab.route)}
            leftIcon={<Icon as={tab.icon} />}
            variant="ghost"
            fontWeight={isActive ? 'bold' : 'normal'}
            bg={isActive ? 'white' : 'transparent'}
            boxShadow={isActive ? 'sm' : 'none'}
            _hover={{ bg: 'none' }}
            borderRadius="md"
          >
            {tab.label}
          </Button>
        )
      })}
    </HStack>
  )
}

export default TabBar

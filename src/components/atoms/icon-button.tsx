import React from 'react'
import styled from 'styled-components/native'
import { Feather } from '@expo/vector-icons'

interface IconButtonProps {
  name: React.ComponentProps<typeof Feather>['name']
  size?: number
  color?: string
  onPress: () => void
  accessibilityLabel?: string
}

const Container = styled.Pressable`
  background-color: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing(12)}px;
  border-radius: ${({ theme }) => theme.radius.lg}px;
  align-items: center;
  justify-content: center;
`

export function IconButton({ name, size = 20, color, onPress, accessibilityLabel }: IconButtonProps) {
  return (
    <Container onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel || name}>
      <Feather name={name} size={size} color={color || '#FFFFFF'} />
    </Container>
  )
}


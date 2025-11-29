import React from 'react'
import styled, { useTheme } from 'styled-components/native'
import { ActivityIndicator } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
  isLoading?: boolean
  accessibilityLabel?: string
}

const Pressable = styled.Pressable<{ variant: ButtonProps['variant']; disabled?: boolean }>`
  background-color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.surface : theme.colors.primary)};
  padding: ${({ theme }) => theme.spacing(16)}px;
  border-radius: ${({ theme }) => theme.radius.md}px;
  align-items: center;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`

const Title = styled.Text<{ variant: ButtonProps['variant'] }>`
  color: ${({ theme, variant }) => (variant === 'secondary' ? theme.colors.textPrimary : '#FFFFFF')};
  font-weight: 700;
  font-size: 16px;
`

export function Button({ title, onPress, variant = 'primary', disabled, isLoading, accessibilityLabel }: ButtonProps) {
  const theme = useTheme()
  const indicatorColor = variant === 'secondary' ? theme.colors.textPrimary : '#FFFFFF'
  return (
    <Pressable variant={variant} disabled={disabled || isLoading} onPress={onPress} accessibilityRole="button" accessibilityLabel={accessibilityLabel || title}>
      {isLoading ? <ActivityIndicator color={indicatorColor} /> : <Title variant={variant}>{title}</Title>}
    </Pressable>
  )
}


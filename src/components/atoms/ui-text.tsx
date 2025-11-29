import React from 'react'
import styled from 'styled-components/native'
import type { AppTheme } from '../../theme'

interface UiTextProps {
  children: React.ReactNode
  variant?: 'title' | 'subtitle' | 'body' | 'caption'
  color?: keyof AppTheme['colors'] | 'textPrimary' | 'textSecondary' | string
  numberOfLines?: number
  size?: number
}

const StyledText = styled.Text<{ variant: UiTextProps['variant']; colorKey: UiTextProps['color']; size?: number }>`
  color: ${({ theme, colorKey }) => typeof colorKey === 'string' && colorKey.startsWith('#') ? colorKey : theme.colors[colorKey || 'textPrimary']};
  font-size: ${({ size, theme, variant }) => size ?? theme.typography[variant || 'body'].fontSize}px;
  line-height: ${({ theme, variant }) => theme.typography[variant || 'body'].lineHeight}px;
  font-weight: ${({ theme, variant }) => theme.typography[variant || 'body'].fontWeight};
`

export function UiText({ children, variant = 'body', color = 'textPrimary', numberOfLines, size }: UiTextProps) {
  return <StyledText variant={variant} colorKey={color} numberOfLines={numberOfLines} size={size}>{children}</StyledText>
}

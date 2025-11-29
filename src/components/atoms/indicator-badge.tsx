import React from 'react'
import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'
import { UiText } from './ui-text'

interface IndicatorBadgeProps {
  label: 'LIKE' | 'NOPE'
}

const Badge = styled.View`
  padding: 0px;
  border-radius: ${({ theme }) => theme.radius.sm}px;
  overflow: hidden;
`

const Inner = styled.View`
  padding: 8px 12px;
`

export function IndicatorBadge({ label }: IndicatorBadgeProps) {
  const isLike = label === 'LIKE'
  const colors: readonly [string, string] = isLike ? ['#34D399', '#10B981'] : ['#FF6B6B', '#EF4444']
  return (
    <Badge accessibilityLabel={label} accessibilityRole="text">
      <LinearGradient colors={colors}>
        <Inner>
          <UiText variant="subtitle" color="background">{label}</UiText>
        </Inner>
      </LinearGradient>
    </Badge>
  )
}

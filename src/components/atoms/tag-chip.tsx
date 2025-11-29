import React from 'react'
import styled from 'styled-components/native'
import { UiText } from './ui-text'

interface TagChipProps {
  label: string
}

const Chip = styled.View`
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.radius.sm}px;
  padding: ${({ theme }) => theme.spacing(8)}px ${({ theme }) => theme.spacing(12)}px;
  margin-right: ${({ theme }) => theme.spacing(8)}px;
  margin-bottom: ${({ theme }) => theme.spacing(8)}px;
`

export function TagChip({ label }: TagChipProps) {
  return (
    <Chip>
      <UiText variant="caption" color="textSecondary">{label}</UiText>
    </Chip>
  )
}

